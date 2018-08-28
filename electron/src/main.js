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
var IpcWrapper_1 = require("./ipc/IpcWrapper");
var window = null;
var windowLoad = null;
var windowCrash = null;
// When app is ready to run
electron_1.app.on('ready', function () {
    createPreloader();
    initializeStorageAndProcess()
        .then(initializeAppBridge)
        .then(createWindowApp)["catch"](createWindowCrash);
});
function createWindowApp() {
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
    window.once('ready-to-show', function () {
        window.show();
        windowLoad.hide();
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
    // Handle close
    window.on('close', function () {
        console.log('shutting down');
        if (window) {
            window.setTitle('Dalmatian ICS' + //version +
                ' shutting down');
            // Persist width and height so they can be restored next time
            var bounds = window.getBounds();
            PreferenceManager_1["default"].set(PREFERENCE.WINDOW_HEIGHT, bounds.height);
            PreferenceManager_1["default"].set(PREFERENCE.WINDOW_WIDTH, bounds.width);
        }
    });
}
function initializeStorageAndProcess() {
    console.log('Application is running');
    // Initialize storage
    return StorageManager.initialize(electron_1.app.getPath('userData'));
}
function initializeAppBridge() {
    return new Promise(function (resolve, reject) {
        try {
            resolve(new IpcWrapper_1["default"](window));
        }
        catch (e) {
            reject(e);
        }
    });
}
function createPreloader() {
    try {
        // create BrowserWindow with dynamic HTML content
        var loaderHtml = [
            '<head><style>',
            '*{ text-align:center; }',
            'h1{ color: seagreen;} ',
            'body{ margin:3%;} ',
            '.contents{background:whitesmoke; border-radius:2em; padding:1em;}',
            '</style></head>',
            '<body><div class="contents">',
            '<h1>Dalmatian ICS</h1>',
            '<h2>Loading . . .</h2>',
            '</div></body>',
        ].join('');
        windowLoad = new electron_1.BrowserWindow({
            title: 'Loading',
            width: 600,
            height: 400,
            transparent: true,
            closable: false,
            frame: false,
            maximizable: false,
            minimizable: false,
            fullscreenable: false,
            skipTaskbar: true,
            titleBarStyle: 'hiddenInset',
            vibrancy: 'dark',
            radii: [5, 5, 5, 5]
        });
        windowLoad.loadURL('data:text/html;charset=utf-8,' +
            encodeURI(loaderHtml));
    }
    catch (exc) {
        windowLoad.hide();
        console.log('error in loader', exc);
    }
}
function createWindowCrash(e) {
    console.log(e);
    try {
        // create BrowserWindow with dynamic HTML content
        var html = [
            '<head><style>',
            '*{ text-align:center; }',
            'h1{ color: seagreen;} ',
            '.contents{background:whitesmoke; border-radius:2em; padding:1em;}',
            '</style></head>',
            '<body><div class="contents">',
            '<h1>Dalmatian ICS failed to start</h1>',
            '<h2>Error: ' + e.name + ' </h2>',
            '<pre>' + e.message + ' </pre>',
            '</div></body>',
        ].join('');
        windowCrash = new electron_1.BrowserWindow({
            title: 'Dalmatian ICS Crash',
            width: 600,
            height: 400,
            vibrancy: 'dark'
        });
        windowCrash.loadURL('data:text/html;charset=utf-8,' +
            encodeURI(html));
        window && window.destroy();
        windowLoad && windowLoad.destroy();
    }
    catch (exc) {
        windowCrash.hide();
        console.log('error in loader', exc);
    }
}
