import {app, BrowserWindow} from 'electron';
import * as StorageManager from './StorageManager';
import PreferenceManager from './PreferenceManager';
import * as path from 'path';
import * as url from 'url';
import * as strings from './_core/res/strings';
import * as PREFERENCE from './_core/_contract/_preferences';
import {downloadFormUpdates} from './UpdateManager';
import IpcBridge from './ipc/IpcWrapper';

let window: BrowserWindow = null;
let windowLoad: BrowserWindow = null;
let windowCrash: BrowserWindow = null;

// When app is ready to run
app.on('ready', () => {
    createPreloader();
    initializeStorageAndProcess()
        .then(initializeAppBridge)
        .then(createWindowApp)
        .catch(createWindowCrash);
});

function createWindowApp() {
    downloadFormUpdates().then((result) => {
        console.log('done');
        console.log(result);
    }).catch(e => {
        console.log(e);
    });

    console.log('Storage initialized');

    // Create a new window
    window = new BrowserWindow({
        title: strings.APP_TITLE,
        width: PreferenceManager.get(PREFERENCE.WINDOW_WIDTH) || 800,
        height: PreferenceManager.get(PREFERENCE.WINDOW_HEIGHT) || 600,
        show: false
    });
    window.once('ready-to-show', () => {
        window.show();
        windowLoad.hide();
    });

    // Determine what to load. React development server or production static files
    if (process.defaultApp) {
        console.log('Loading development server');
        window.loadURL('http://localhost:3000');
    } else {
        console.log('Loading production files');
        window.loadURL(url.format({
            pathname: path.join(__dirname, './react/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    // Handle close
    window.on('close', () => {
        console.log('shutting down');
        if (window) {
            window.setTitle('Dalmatian ICS' + //version +
                ' shutting down');
            // Persist width and height so they can be restored next time
            const bounds = window.getBounds();
            PreferenceManager.set(PREFERENCE.WINDOW_HEIGHT, bounds.height);
            PreferenceManager.set(PREFERENCE.WINDOW_WIDTH, bounds.width);
        }
    });
}

function initializeStorageAndProcess() {
    console.log('Application is running');
    // Initialize storage
    return StorageManager.initialize(app.getPath('userData'));
}

function initializeAppBridge() {
    return new Promise((resolve, reject) => {
        try {
            resolve(new IpcBridge(window));
        } catch (e) {
            reject(e);
        }
    });
}

function createPreloader() {
    try {
        // create BrowserWindow with dynamic HTML content
        const loaderHtml = [
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
        windowLoad = new BrowserWindow({
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
        });
        windowLoad.loadURL('data:text/html;charset=utf-8,' +
            encodeURI(loaderHtml));
    } catch (exc) {
        windowLoad.hide();
        console.log('error in loader', exc);
    }
}

function createWindowCrash(e: Error) {
    console.log(e);
    try {
        // create BrowserWindow with dynamic HTML content
        const html = [
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
        windowCrash = new BrowserWindow({
            title: 'Dalmatian ICS Crash',
            width: 600,
            height: 400,
            vibrancy: 'dark',
        });
        windowCrash.loadURL('data:text/html;charset=utf-8,' +
            encodeURI(html));
        window && window.destroy();
        windowLoad && windowLoad.destroy();
    } catch (exc) {
        windowCrash.hide();
        console.log('error in loader', exc);
    }
}

