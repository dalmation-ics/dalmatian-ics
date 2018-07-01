import {app, BrowserWindow, ipcMain} from 'electron';
import StorageManager from './_core/StorageManager';


// When app is ready to run
app.on('ready', () => {

    console.log('Application is running');

    // Initialize storage
    StorageManager.initialize(app.getPath('userData')).then(() => {



    });

});

export default app;