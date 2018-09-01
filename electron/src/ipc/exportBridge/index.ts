import IpcWrapper from "../IpcWrapper";

const exportManager = require('../../storage').exportManager;
const {FileNotFoundError} =
    require('../../../_core/error/');

const {
    ACT_SAVE_ARCHIVE,
    ACT_OPEN_ARCHIVE,
    ACT_CHECK_PASSED_FILE,
    ACT_SHOW_PATH_IN_FOLDER,
    ACT_ARCHIVE_SEND_EMAIL,
    ACT_IMPORT_FORM,
} = require('../../_core/contract/ipc/exportBridge');

module.exports = (ipcW: IpcWrapper) => {

    /**
     * Listen for SAVE_TO_ARCHIVE
     */
    ipcW.register(ACT_SAVE_ARCHIVE, (callback, fileList) => {

        // Check that fileList exists
        if (fileList === undefined) {
            callback(new MissingArgumentError('fileList'));
            return;
        }

        // Check that fileList is array
        if (!Array.isArray(fileList)) {
            callback(
                new IncorrectTypeError('Array', typeof fileList, 'fileList'));
            return;
        }

        // Save the fileList
        exportManager.save(fileList).then((filePath) => {
            console.log(filePath);
            callback(null, filePath);
        }).catch(callback);

    });

    /**
     * Listen for OPEN_ARCHIVE
     */
    ipcW.register(ACT_OPEN_ARCHIVE, (callback, requestedFilePath = '') => {
        // Load the archive at filePath
        exportManager.load(requestedFilePath).then(({result, filePath}) => {
            callback(null, {result, filePath});
        }).catch(e => {
            callback(e);
        });

    });

    /**
     * Listen for CHECK_PASSED_FILE
     */
    ipcW.register(ACT_CHECK_PASSED_FILE, callback => {
        // Ensure that process.argv[last] is actually a filePath
        // if load from file breaks again, then this arg probably changed position
        const arg = process.argv[process.argv.length - 1];
        if (arg !== undefined &&
            arg !== null &&
            arg !== '.' &&
            arg !== '') {
            // Load the archive at the path
            exportManager.load(arg).then(result => {
                callback(null, result);
            }).catch(e => {
                callback(e);
            });
        } else {
            callback(new FileNotFoundError('Failed loading file: ' + arg),
                null);
        }

    });

    /**
     * Listen for calls to show in folder
     */
    ipcW.register(ACT_SHOW_PATH_IN_FOLDER, (callback, filePath) => {
        try {
            let result = exportManager.showInFolder(filePath);
            callback(null, result);
        } catch (e) {
            callback(e);
        }
    });

    /**
     * Listen for calls to send an email
     */
    ipcW.register(ACT_ARCHIVE_SEND_EMAIL, (callback, {subject, body}) => {
        exportManager.mailTo(subject, body);
        callback(null);
    });

    /**
     * Listen for IMPORT_FORM
     */
    ipcW.register(ACT_IMPORT_FORM, (callback) => {
        exportManager.import().then(result => {
            callback(null, result);
        }).catch(e => {
            callback(e);
        });
    });

};
