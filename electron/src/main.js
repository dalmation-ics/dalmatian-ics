"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var StorageManager_1 = require("./_core/StorageManager");
// When app is ready to run
electron_1.app.on('ready', function () {
    console.log('Application is running');
    // Initialize storage
    StorageManager_1.default.initialize(electron_1.app.getPath('userData')).then(function () {
    });
});
exports.default = electron_1.app;
