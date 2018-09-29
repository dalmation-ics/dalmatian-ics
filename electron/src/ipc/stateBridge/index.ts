import {FileNotFoundError} from '../../_core/error';
import {ACT_LOAD_STATE, ACT_SAVE_STATE, ACT_APP_VERSION} from
        '../../_core/contract/ipc/stateBridge';
import {stateManager as manager} from '../../storage';

export default (ipcW: any) => {

    /**
     * Prompt react for state when window is closing
     * Then save state
     * //TODO There has to be a more logical place for this
     */
    ipcW.window.once('close', (e: Event) => {
        console.log('preventing event');
        e.preventDefault();
        console.log('sending IPC save req');
        ipcW.prompt(ACT_SAVE_STATE, (err, result) => {

            console.log('IPC save recieved');
            const size = ipcW.window.getSize();
            result.window = {
                width: size[0],
                height: size[1],
            };
            console.log('Window data saved');

            console.log('Firing state save');
            manager.save(result).then(() => {
                console.log('State Saved');
                ipcW.window.close();
                process.exit(0);
            }).catch((e: Event) => {
                console.log(e);
                process.exit(1);
            });

        });
    });

    /**
     * Listen for LOAD_STATE
     */
    ipcW.registerSync(ACT_LOAD_STATE, (callback) => {
        manager.load().then(result => {
            result.window = undefined;
            callback(null, result);
        }).catch(e => {
            if (e instanceof FileNotFoundError)
                callback(null, false);
            else
                callback(e);
        });
    });

    /**
     * Listen for APP_VERSION
     */
    ipcW.registerSync(ACT_APP_VERSION, (callback) => {
        callback(null, manager.appVersion());
    });

};
