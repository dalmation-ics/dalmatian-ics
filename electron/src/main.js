"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var StorageManager = require("./StorageManager");
var PreferenceManager_1 = require("./PreferenceManager");
var path = require("path");
var url = require("url");
var strings = require("./_core/res/strings");
var PREFERENCE = require("./_core/_contract/_preferences");
var UpdateManager_1 = require("./UpdateManager");
var window;
// When app is ready to run
electron_1.app.on('ready', function () {
    console.log('Application is running');
    // Initialize storage
    StorageManager.initialize(electron_1.app.getPath('userData')).then(function () {
        UpdateManager_1.downloadFormUpdates().then(function (result) {
            console.log('done');
            console.log(result);
        })["catch"](function (e) {
            console.log(e);
        });
        console.log('Storage initialized');
        // Create a new window
        window = new electron_1.BrowserWindow({
            title: strings.APP_TITLE,
            width: PreferenceManager_1["default"].get(PREFERENCE.WINDOW_WIDTH) || 800,
            height: PreferenceManager_1["default"].get(PREFERENCE.WINDOW_HEIGHT) || 600,
            show: false
        });
        // Determine what to load. React development server or production static files
        if (process.defaultApp) {
            console.log('Loading development server');
            window.loadURL('http://localhost:3000');
        }
        else {
            console.log('Loading production files');
            window.loadURL(url.format({
                pathname: path.join(__dirname, './react/index.html'),
                protocol: 'file:',
                slashes: true
            }));
        }
        window.show();
        // Handle close
        window.on('close', function () {
            if (window) {
                // Persist width and height so they can be restored next time
                var bounds = window.getBounds();
                PreferenceManager_1["default"].set(PREFERENCE.WINDOW_HEIGHT, bounds.height);
                PreferenceManager_1["default"].set(PREFERENCE.WINDOW_WIDTH, bounds.width);
            }
        });
    });
});
