"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var StorageManager_1 = require("./_core/StorageManager");
// When app is ready to run
electron_1.app.on('ready', function () {
    console.log('Application is running');
    // Initialize storage
    StorageManager_1.default.initialize(electron_1.app.getPath('userData')).then(function () {
        console.log('Storage ready');
        StorageManager_1.default.write('bacon', 'hello.txt', 'Bacon').then(function () {
            console.log('Written');
            StorageManager_1.default.read('bacono', 'helloeee.txt').then(function (content) {
                console.log("GOT " + content);
            }).catch(function (e) {
                console.log(e);
            });
        });
    });
});
exports.default = electron_1.app;
