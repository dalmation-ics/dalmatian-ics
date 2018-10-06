"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('../../_core/error/index'), MissingArgumentError = _a.MissingArgumentError, IncorrectTypeError = _a.IncorrectTypeError;
var ACT_SET_TITLE = require('../../_core/contract/ipc/electronBridge').ACT_SET_TITLE;
exports.default = (function (ipcW) {
    ipcW.registerSync(ACT_SET_TITLE, function (callback, title) {
        if (title === undefined) {
            callback(new MissingArgumentError('title'));
            return;
        }
        if (typeof title !== 'string') {
            callback(new IncorrectTypeError('string', typeof title, 'title'));
            return;
        }
        ipcW.window.setTitle(ipcW.appTitle + ' ~ ' + title);
        callback(null);
    });
});
