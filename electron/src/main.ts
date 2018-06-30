import {app, BrowserWindow} from 'electron';
import PreferenceManager from './_core/PreferenceManager';
import StorageManager from './_core/StorageManager';

// When app is ready to run
app.on('ready', () => {

    console.log('Application is running');

    // Initialize storage
    StorageManager.initialize(app.getPath('userData')).then(() => {

        console.log('Storage ready');
        StorageManager.write('bacon', 'hello.txt', 'Bacon').then(() => {
            console.log('Written');

            StorageManager.read('bacono', 'helloeee.txt').then(content => {
                console.log(`GOT ${content}`);
            }).catch(e => {
                console.log(e)
            });

        });

    });

});

export default app;