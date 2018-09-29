import DataManager from "@src/src/storage/DataManager";

let packageJs = require('../../../../package.json');

export default class StateManager {
    dataManager: DataManager;

    static get dataName() {
        return 'state';
    }

    /**
     * @param dataManager
     */
    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
    }

    save(state: any) {
        return this.dataManager.constructor.initRoot().then(() => {
            return this.dataManager.write(StateManager.dataName,
                JSON.stringify(state, null, 4));
        });
    }

    load() {
        return this.dataManager.read(StateManager.dataName).then((result: any) => {
            return JSON.parse(result);
        });
    }

    appVersion() {
        return packageJs.version;
    }
}
