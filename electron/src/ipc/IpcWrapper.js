"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var _general_1 = require("../_core/contract/_general");
var strings = require("../_core/res/strings");
var package_json_1 = require("../../package.json");
var IpcWrapper = /** @class */ (function () {
    function IpcWrapper(window) {
        this.appTitle = strings.APP_TITLE + ((package_json_1.version !== undefined) ? ' (v' + package_json_1.version + ') ' : '');
        this.window = window;
        this.ipcMain = electron_1.ipcMain;
    }
    IpcWrapper.prototype.register = function (name, action) {
        this.ipcMain.on(name, function (event, args) {
            console.log("Received " + name);
            action(function (err, result) {
                if (err)
                    console.log(err);
                var out = {
                    err: err ? err.message : null,
                    result: result
                };
                console.log("Sending " + name + _general_1.RESPONSE_POSTFIX);
                event.sender.send(name + _general_1.RESPONSE_POSTFIX, out);
            }, args);
        });
    };
    IpcWrapper.prototype.registerSync = function (name, action) {
        this.ipcMain.on(name, function (event, args) {
            console.log("Recieved " + name);
            action(function (err, result) {
                if (err)
                    console.log(err);
                var out = {
                    err: err ? err.message : null,
                    result: result,
                };
                console.log("Sending Sync " + name + _general_1.RESPONSE_POSTFIX);
                event.returnValue = out;
            }, args);
        });
    };
    IpcWrapper.prototype.prompt = function (name, action, args) {
        console.log("Sending " + name);
        this.window.webContents.send(name, args);
        this.ipcMain.once("" + name + _general_1.RESPONSE_POSTFIX, function (event, _a) {
            var err = _a.err, result = _a.result;
            console.log("Received " + name + _general_1.RESPONSE_POSTFIX);
            action(err, result);
        });
    };
    return IpcWrapper;
}());
exports.default = IpcWrapper;
