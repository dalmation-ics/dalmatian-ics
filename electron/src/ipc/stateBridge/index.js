const FileNotFoundError = require('../../../_core/error').FileNotFoundError;
const {ACT_LOAD_STATE, ACT_SAVE_STATE, ACT_APP_VERSION} = require(
    '../../../_core/contract/stateBridge');
const manager = require('../../storage').stateManager;

module.exports = (ipcW) => {

    /**
     * Prompt react for state when window is closing
     * Then save state
     * //TODO There has to be a more logical place for this
     */
    ipcW.window.once('close', (e) => {
        e.preventDefault();
        ipcW.prompt(ACT_SAVE_STATE, (err, result) => {

            const size = ipcW.window.getSize();
            result.window = {
                width: size[0],
                height: size[1],
            };

            manager.save(result).then(() => {
                console.log('State Saved');
                ipcW.window.close();
                process.exit(0);
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
