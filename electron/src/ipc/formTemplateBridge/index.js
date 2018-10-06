"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../../_core/error");
var storage_1 = require("../../storage");
var error_2 = require("../../_core/error");
var formsBridge_1 = require("../../_core/contract/ipc/formsBridge");
exports.default = (function (ipcW) {
    /**
     * Listen for CHECK_FOR_UPDATES
     */
    ipcW.register(formsBridge_1.ACT_CHECK_FOR_UPDATES, function (callback) {
        // Check for updates
        storage_1.formTemplateManager.checkForUpdates().then(function (result) {
            callback(null, result.actionRequired);
        }).catch(function (e) {
            callback(e);
        });
    });
    /**
     * Listen for CANCEL_CHECK_FOR_UPDATES
     */
    // ipcW.register(ACT_CANCEL_CHECK_FOR_UPDATES, (callback) => {
    //     //TODO Do nothing
    //     callback();
    // });
    /**
     * Listen for GET_FORM
     */
    ipcW.register(formsBridge_1.ACT_GET_FORM, function (callback, fileName) {
        // Check fileName exists
        if (!fileName) {
            callback(new error_2.MissingArgumentError('fileName'));
            return;
        }
        // Check
        if (typeof fileName !== 'string') {
            callback(new error_2.IncorrectTypeError('string', typeof fileName, 'fileName'));
            return;
        }
        // Get form
        storage_1.formTemplateManager.getFormByFileName(fileName).then(function (content) {
            callback(null, content);
        }).catch(function (e) {
            callback(e);
        });
    });
    /**
     * Listen for GET_FORMS_INDEX
     */
    ipcW.register(formsBridge_1.ACT_GET_FORMS_INDEX, function (callback) {
        // Get form index
        storage_1.formTemplateManager.getFormsData().then(function (result) {
            var flattened = Object.keys(result).map(function (name) {
                return result[name];
            });
            callback(null, flattened);
        }).catch(function (e) {
            if (e instanceof error_1.FileNotFoundError)
                callback(null, null);
            else
                callback(e);
        });
    });
    /**
     * Listen for UPDATE_FORMS
     */
    ipcW.register(formsBridge_1.ACT_UPDATE_FORMS, function (callback) {
        // Update forms
        storage_1.formTemplateManager.downloadForms().then(function () {
            callback(null);
        }).catch(function (e) {
            callback(e);
        });
    });
});
