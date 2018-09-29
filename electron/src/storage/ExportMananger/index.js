"use strict";
///<reference path="../../../node_modules/electron/electron.d.ts"/>
//const JSZip = require('node-zip');
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var form_1 = require("../../class/form");
var fs_extra_1 = require("fs-extra");
var nodeZip = require("node-zip");
var form_converter = require("../../class/form_converter/index");
var error_1 = require("../../_core/error");
var ExportManager = /** @class */ (function () {
    /**
     * @param dataManager
     */
    function ExportManager(dataManager) {
        if (dataManager === undefined)
            throw new error_1.MissingArgumentError('dataManager');
        this.dataManager = dataManager;
        this.lastPath = '~';
    }
    ExportManager.prototype.showInFolder = function (filePath) {
        var localPath = '' + filePath;
        if (!filePath)
            localPath = this.lastPath;
        if (!localPath || localPath === '')
            throw new error_1.FileNotFoundError(localPath);
        electron_1.shell.showItemInFolder(localPath);
        return localPath;
    };
    ExportManager.prototype.mailTo = function (subject, body) {
        electron_1.shell.openItem('mailto:<email>?subject=' + subject + '&body=' +
            body);
    };
    /**
     *
     * @param {Map<filename, content>} content where id:filename
     * @param {string} filePath (optional
     * @returns {Promise<any>}
     */
    ExportManager.prototype.save = function (content, filePath) {
        var _this = this;
        if (filePath === void 0) { filePath = ''; }
        var filters = [
            { name: 'Dalmation ICS form suite', extensions: ['dalmatianics.zip', 'dalmatianics'] },
            { name: 'BCICS form', extensions: ['bcics'] },
            { name: 'zip', extensions: ['zip'] },
            { name: 'Custom filetype', extensions: ['*'] },
        ];
        var options = {
            title: 'Save Dalmatian ICS form suite',
            filters: filters,
            defaultPath: this.lastPath,
        };
        return new Promise(function (resolve, reject) {
            try {
                if (!(filePath && filePath !== '')) {
                    //show electron dialog
                    filePath = electron_1.dialog.showSaveDialog(options);
                    if (!(filePath && filePath !== '')) {
                        //user cancelled
                        throw new error_1.UserCancelledError('saving the archive');
                    }
                    _this.lastPath = filePath;
                }
                var zip_1 = new nodeZip();
                content.forEach(function (item, index) {
                    zip_1.file(item.fileName, item.content);
                });
                var data = zip_1.generate({ base64: false, compression: 'DEFLATE' });
                var localPath_1 = filePath + '';
                fs_extra_1.default.writeFile(filePath, data, 'binary', function (err) {
                    console.log(localPath_1 + ' DONE!!!!!!');
                    resolve(localPath_1);
                });
            }
            catch (exc) {
                reject({ exception: exc, filePath: filePath });
            }
        });
    };
    ExportManager.prototype.handleCodePoints = function (array) {
        var CHUNK_SIZE = 0x8000; // arbitrary number here, not too small, not too big
        var length = array.length;
        var result = '';
        var slice;
        for (var index = 0; index < length; index += CHUNK_SIZE) {
            slice = array.slice(index, Math.min(index + CHUNK_SIZE, length)); // `Math.min` is not really necessary here I think
            result += String.fromCharCode.apply(null, slice);
        }
        return result;
    };
    ExportManager.prototype.load = function (filePath) {
        var _this = this;
        if (filePath === void 0) { filePath = ''; }
        var filters = [
            {
                name: 'Dalmation ICS form suite', extensions: [
                    'dalmatianics.zip', 'dalmatianics', 'bcics.zip', 'bcics'
                ]
            },
            { name: 'zip', extensions: ['zip'] },
            { name: 'Other filetype', extensions: ['*'] },
        ];
        var options = {
            title: 'Open Dalmatian ICS suite',
            filters: filters,
            defaultPath: this.lastPath,
        };
        return new Promise(function (resolve, reject) {
            try {
                if (!(filePath && filePath !== '')) {
                    //show electron dialog
                    var fileList_1 = electron_1.dialog.showOpenDialog(options);
                    if (!(fileList_1 && fileList_1.length > 0)) {
                        //user cancelled
                        throw new error_1.UserCancelledError('loading an archive');
                    }
                    filePath = fileList_1[0];
                    _this.lastPath = filePath;
                }
                console.log('file requested:' + filePath);
                var fileData = require('fs').readFileSync(filePath, 'binary');
                // let data = new require('node-zip')(fileData,
                //     {base64: false, compression: 'DEFLATE'});
                var data = nodeZip(fileData, { base64: false, compression: 'DEFLATE' });
                var fileList = data.files;
                var result = [];
                for (var key in fileList) {
                    console.log(key);
                    var resultFile = fileList[key];
                    //this is returning uints instead of strings
                    var obj = resultFile._data.getContent('string');
                    //convert uint array to string
                    var objStr = _this.handleCodePoints(obj);
                    var form = form_1.createFormFromContent(key, objStr);
                    result.push(form);
                }
                resolve({ result: result, filePath: filePath });
            }
            catch (exc) {
                reject(exc);
            }
        });
    };
    ExportManager.prototype.import = function (filePath) {
        var _this = this;
        if (filePath === void 0) { filePath = ''; }
        var filters = [
            { name: 'RMS Express FormComplete XML', extensions: ['xml'] },
        ];
        var options = {
            title: 'Import XML form',
            filters: filters,
            defaultPath: this.lastPath,
        };
        return new Promise(function (resolve, reject) {
            try {
                if (!(filePath && filePath !== '')) {
                    //show electron dialog
                    var fileList = electron_1.dialog.showOpenDialog(options);
                    if (!(fileList && fileList.length > 0)) {
                        //user cancelled
                        throw new error_1.UserCancelledError('importing XML');
                    }
                    filePath = fileList[0];
                    _this.lastPath = filePath;
                }
                fs_extra_1.default.readFile(filePath).then(function (result) {
                    return form_converter.convert(result.toString());
                }).then(resolve).catch(reject);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return ExportManager;
}());
exports.default = ExportManager;
