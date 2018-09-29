import {FileNotFoundError} from '../../_core/error';

import {formManager} from '../../storage';

import {IncorrectTypeError, MissingArgumentError} from
        '../../_core/error';
import {
    ACT_CHECK_FOR_UPDATES,
    ACT_GET_FORM,
    ACT_GET_FORMS_INDEX,
    ACT_UPDATE_FORMS,
    ACT_IMPORT_FORM,
} from '../../_core/contract/ipc/formsBridge';

export default (ipcW: any) => {

    /**
     * Listen for CHECK_FOR_UPDATES
     */
    ipcW.register(ACT_CHECK_FOR_UPDATES, (callback) => {

        // Check for updates
        formManager.checkForUpdates().then(result => {
            callback(null, result.actionRequired);
        }).catch(e => {
            callback(e);
        });

    });

    /**
     * Listen for CANCEL_CHECK_FOR_UPDATES
     */
    // ipcW.register(ACT_CANCEL_CHECK_FOR_UPDATES, (callback) => {
    //     //TODO Do nothing
    //     callback();
    // });

    /**
     * Listen for GET_FORM
     */
    ipcW.register(ACT_GET_FORM, (callback, fileName) => {

        // Check fileName exists
        if (!fileName) {
            callback(new MissingArgumentError('fileName'));
            return;
        }

        // Check
        if (typeof fileName !== 'string') {
            callback(
                new IncorrectTypeError('string', typeof fileName, 'fileName'));
            return;
        }

        // Get form
        formManager.getFormByFileName(fileName).then(content => {
            callback(null, content);
        }).catch(e => {
            callback(e);
        });

    });

    /**
     * Listen for GET_FORMS_INDEX
     */
    ipcW.register(ACT_GET_FORMS_INDEX, (callback) => {

        // Get form index
        formManager.getFormsData().then(result => {
            const flattened = Object.keys(result).map(name => {
                return result[name];
            });
            callback(null, flattened);
        }).catch(e => {
            if (e instanceof FileNotFoundError)
                callback(null, null);
            else
                callback(e);
        });

    });

    /**
     * Listen for UPDATE_FORMS
     */
    ipcW.register(ACT_UPDATE_FORMS, (callback) => {

        // Update forms
        formManager.downloadForms().then(() => {
            callback(null);
        }).catch(e => {
            callback(e);
        });

    });

};

