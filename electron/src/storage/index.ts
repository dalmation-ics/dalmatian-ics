import DataManager from './DataManager/index';
// import FormManager from './FormManager/index';
// import StateManager from './StateMananger/index';
import ExportManager from './ExportMananger/index';

// export const formManager = new FormManager(new DataManager('forms'));
// export const stateManager = new StateManager(new DataManager('state'));
export const exportManager = new ExportManager(new DataManager('exports'));

export const init = () => {
    return DataManager.initRoot();
};
