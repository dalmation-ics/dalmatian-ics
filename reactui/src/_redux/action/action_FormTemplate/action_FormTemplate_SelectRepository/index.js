// @flow

import {ACT_FORM_TEMPLATE_SELECT_REPOSITORY} from 'src/_core/contract/formsBridge';
import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
import type {Action, Dispatch} from 'src/_core/redux/types';
import actionStatus from 'src/_core/redux/types/actionStatus';

export const TYPE = 'TYPE_FORM_TEMPLATE_SELECT_REPOSITORY';
export default () => (dispatch: Dispatch) => new Promise((resolve, reject) => {
	try {
		// Dispatch START
		dispatch(({
			type: TYPE,
			status: actionStatus.STARTED,
		}: Action));

		// Prompt Electron to get forms index
		ipcRWrapper.prompt(ACT_FORM_TEMPLATE_SELECT_REPOSITORY, (err, result) => {

			if (!err) {
				// Dispatch COMPLETE
				dispatch(({
					type: TYPE,
					status: actionStatus.COMPLETE,
					payload: result,
				}: Action));
			} else {
				// Dispatch ERROR
				dispatch(({
					type: TYPE,
					status: actionStatus.ERROR,
					payload: err,
				}: Action));
			}

			// Resolve
			resolve({err, result});

		});
	} catch (exc) {
		reject(exc);
	}
});
