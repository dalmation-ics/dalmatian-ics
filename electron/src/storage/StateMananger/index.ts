let packageJs = require('../../../../package.json');

class StateManager {

    static get dataName() {
        return 'state';
    }

    /**
     * @param dataManager
     */
    constructor(dataManager) {
        this.dataManager = dataManager;
    }

    save(state) {
        return this.dataManager.constructor.initRoot().then(() => {
            return this.dataManager.write(StateManager.dataName,
                JSON.stringify(state, null, 4));
        });
    }

    load() {
        return this.dataManager.read(StateManager.dataName).then(result => {
            return JSON.parse(result);
        });
    }

    appVersion() {
        return packageJs.version;
    }
}

module.exports = StateManager;
