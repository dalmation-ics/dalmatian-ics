import DataManager from './DataManager/index';
import FormTemplateManager from './FormTemplateManager/index';
import StateManager from './StateMananger/index';
import ExportManager from './ExportMananger/index';

export const formTemplateManager = new FormTemplateManager(new DataManager('forms'));
export const stateManager = new StateManager(new DataManager('state'));
export const exportManager = new ExportManager(new DataManager('exports'));

export const init = () => {
    return DataManager.initRoot();
};
