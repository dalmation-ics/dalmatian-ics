const {MissingArgumentError, IncorrectTypeError} = require(
    '../../_core/error/index');

const {
    ACT_SET_TITLE,
} = require('../../_core/contract/ipc/electronBridge');
                    
module.exports = (ipcW) => {

    ipcW.registerSync(ACT_SET_TITLE, (callback, title) => {

        if (title === undefined) {
            callback(new MissingArgumentError('title'));
            return;
        }

        if (typeof title !== 'string') {
            callback(new IncorrectTypeError('string', typeof title, 'title'));
            return;
        }

        ipcW.window.setTitle(ipcW.appTitle + ' ~ ' + title);
        callback(null);

    });

};
