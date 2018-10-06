"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = require("../../storage");
var error_1 = require("../../_core/error");
var exportBridge_1 = require("../../_core/contract/ipc/exportBridge");
exports.default = (function (ipcW) {
    /**
     * Listen for SAVE_TO_ARCHIVE
     */
    ipcW.register(exportBridge_1.ACT_SAVE_ARCHIVE, function (callback, fileList) {
        // Check that fileList exists
        if (fileList === undefined) {
            callback(new error_1.MissingArgumentError('fileList'));
            return;
        }
        // Check that fileList is array
        if (!Array.isArray(fileList)) {
            callback(new error_1.IncorrectTypeError('Array', typeof fileList, 'fileList'));
            return;
        }
        // Save the fileList
        storage_1.exportManager.save(fileList).then(function (filePath) {
            console.log(filePath);
            callback(null, filePath);
        }).catch(callback);
    });
    console.log('registering ' + exportBridge_1.ACT_OPEN_ARCHIVE);
    /**
     * Listen for OPEN_ARCHIVE
     */
    ipcW.register(exportBridge_1.ACT_OPEN_ARCHIVE, function (callback, requestedFilePath) {
        if (requestedFilePath === void 0) { requestedFilePath = ''; }
        // Load the archive at filePath
        storage_1.exportManager.load(requestedFilePath).then(function (_a) {
            var result = _a.result, filePath = _a.filePath;
            callback(null, { result: result, filePath: filePath });
        }).catch(function (e) {
            callback(e);
        });
    });
    /**
     * Listen for CHECK_PASSED_FILE
     */
    ipcW.register(exportBridge_1.ACT_CHECK_PASSED_FILE, function (callback) {
        // Ensure that process.argv[last] is actually a filePath
        // if load from file breaks again, then this arg probably changed position
        var arg = process.argv[process.argv.length - 1];
        if (arg !== undefined &&
            arg !== null &&
            arg !== '.' &&
            arg !== '') {
            // Load the archive at the path
            storage_1.exportManager.load(arg).then(function (result) {
                callback(null, result);
            }).catch(function (e) {
                callback(e);
            });
        }
        else {
            callback(new error_1.FileNotFoundError('Failed loading file: ' + arg), null);
        }
    });
    /**
     * Listen for calls to show in folder
     */
    ipcW.register(exportBridge_1.ACT_SHOW_PATH_IN_FOLDER, function (callback, filePath) {
        try {
            var result = storage_1.exportManager.showInFolder(filePath);
            callback(null, result);
        }
        catch (e) {
            callback(e);
        }
    });
    /**
     * Listen for calls to send an email
     */
    ipcW.register(exportBridge_1.ACT_ARCHIVE_SEND_EMAIL, function (callback, _a) {
        var subject = _a.subject, body = _a.body;
        storage_1.exportManager.mailTo(subject, body);
        callback(null);
    });
    /**
     * Listen for IMPORT_FORM
     */
    ipcW.register(exportBridge_1.ACT_IMPORT_FORM, function (callback) {
        storage_1.exportManager.import().then(function (result) {
            callback(null, result);
        }).catch(function (e) {
            callback(e);
        });
    });
});
