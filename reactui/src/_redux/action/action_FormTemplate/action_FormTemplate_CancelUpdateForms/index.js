import {ACT_CANCEL_UPDATE_FORMS} from 'src/_core/contract/formsBridge';
import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
// @flow
import type {Action, Dispatch} from 'src/_core/redux/types';

export const TYPE = 'TYPE_FORM_TEMPLATE_CANCELUPDATEFORMS';
export default () => (dispatch: Dispatch) => new Promise((resolve, reject) => {
	try {
		ipcRWrapper.prompt(ACT_CANCEL_UPDATE_FORMS, (err, result) => {
			dispatch(({type: TYPE, err, result}: Action));
			resolve(err, result);
		});
	} catch (exc) {
		reject(exc);
	}
});
