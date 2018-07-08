import {app, BrowserWindow} from 'electron';
import * as StorageManager from './StorageManager';
import PreferenceManager from './PreferenceManager';
import * as path from 'path';
import * as url from 'url';
import * as strings from './_core/res/strings';
import * as PREFERENCE from './_core/_contract/_preferences';
import {downloadFormUpdates} from './UpdateManager';

let window: BrowserWindow;

// When app is ready to run
app.on('ready', () => {

    console.log('Application is running');

    // Initialize storage
    StorageManager.initialize(app.getPath('userData')).then(() => {

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

        window.show();

        // Handle close
        window.on('close', () => {

            if (window) {
                // Persist width and height so they can be restored next time
                const bounds = window.getBounds();
                PreferenceManager.set(PREFERENCE.WINDOW_HEIGHT, bounds.height);
                PreferenceManager.set(PREFERENCE.WINDOW_WIDTH, bounds.width);
            }

        });

    });

});

