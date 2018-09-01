"use strict";
exports.__esModule = true;
var exportManager = require('../../storage').exportManager;
var FileNotFoundError = require('../../../_core/error/').FileNotFoundError;
var _a = require('../../_core/contract/ipc/exportBridge'), ACT_SAVE_ARCHIVE = _a.ACT_SAVE_ARCHIVE, ACT_OPEN_ARCHIVE = _a.ACT_OPEN_ARCHIVE, ACT_CHECK_PASSED_FILE = _a.ACT_CHECK_PASSED_FILE, ACT_SHOW_PATH_IN_FOLDER = _a.ACT_SHOW_PATH_IN_FOLDER, ACT_ARCHIVE_SEND_EMAIL = _a.ACT_ARCHIVE_SEND_EMAIL, ACT_IMPORT_FORM = _a.ACT_IMPORT_FORM;
module.exports = function (ipcW) {
    /**
     * Listen for SAVE_TO_ARCHIVE
     */
    ipcW.register(ACT_SAVE_ARCHIVE, function (callback, fileList) {
        // Check that fileList exists
        if (fileList === undefined) {
            callback(new MissingArgumentError('fileList'));
            return;
        }
        // Check that fileList is array
        if (!Array.isArray(fileList)) {
            callback(new IncorrectTypeError('Array', typeof fileList, 'fileList'));
            return;
        }
        // Save the fileList
        exportManager.save(fileList).then(function (filePath) {
            console.log(filePath);
            callback(null, filePath);
        })["catch"](callback);
    });
    /**
     * Listen for OPEN_ARCHIVE
     */
    ipcW.register(ACT_OPEN_ARCHIVE, function (callback, requestedFilePath) {
        if (requestedFilePath === void 0) { requestedFilePath = ''; }
        // Load the archive at filePath
        exportManager.load(requestedFilePath).then(function (_a) {
            var result = _a.result, filePath = _a.filePath;
            callback(null, { result: result, filePath: filePath });
        })["catch"](function (e) {
            callback(e);
        });
    });
    /**
     * Listen for CHECK_PASSED_FILE
     */
    ipcW.register(ACT_CHECK_PASSED_FILE, function (callback) {
        // Ensure that process.argv[last] is actually a filePath
        // if load from file breaks again, then this arg probably changed position
        var arg = process.argv[process.argv.length - 1];
        if (arg !== undefined &&
            arg !== null &&
            arg !== '.' &&
            arg !== '') {
            // Load the archive at the path
            exportManager.load(arg).then(function (result) {
                callback(null, result);
            })["catch"](function (e) {
                callback(e);
            });
        }
        else {
            callback(new FileNotFoundError('Failed loading file: ' + arg), null);
        }
    });
    /**
     * Listen for calls to show in folder
     */
    ipcW.register(ACT_SHOW_PATH_IN_FOLDER, function (callback, filePath) {
        try {
            var result = exportManager.showInFolder(filePath);
            callback(null, result);
        }
        catch (e) {
            callback(e);
        }
    });
    /**
     * Listen for calls to send an email
     */
    ipcW.register(ACT_ARCHIVE_SEND_EMAIL, function (callback, _a) {
        var subject = _a.subject, body = _a.body;
        exportManager.mailTo(subject, body);
        callback(null);
    });
    /**
     * Listen for IMPORT_FORM
     */
    ipcW.register(ACT_IMPORT_FORM, function (callback) {
        exportManager["import"]().then(function (result) {
            callback(null, result);
        })["catch"](function (e) {
            callback(e);
        });
    });
};
