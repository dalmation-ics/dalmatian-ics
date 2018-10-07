// @flow
import path from 'path';
import {ACT_CHECK_PASSED_FILE} from 'src/_core/contract/exportBridge';
import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
import type {Action, Dispatch} from 'src/_core/redux/types';

import actionStatus from 'src/_core/redux/types/actionStatus';
import action_Archive_Suite_Load from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Load';

export const TYPE = 'TYPE_ARCHIVE_CHECK_PASSED_FILE';
export default () => (dispatch: Dispatch) => new Promise((resolve, reject) => {

	// Dispatch START
	dispatch(({type: TYPE, status: actionStatus.STARTED}: Action));
	try {
		// Prompt Electron to check for passed archive
		ipcRWrapper.prompt(ACT_CHECK_PASSED_FILE, (err, response) => {

			if (!err) {
				let filePath = path.normalize(response.filePath);
				try {
					if (response !== null) {

						// Dispatch COMPLETE
						dispatch(({
							type: TYPE,
							status: actionStatus.COMPLETE,
							payload: filePath,
						}: Action));
						dispatch(action_Archive_Suite_Load(filePath)).
							then((err, response) => {
								resolve(err, response);
							});
						// dispatch(action_Navigation_RedirectUser('/suite'));

					} else {

						dispatch(({
							type: TYPE,
							status: actionStatus.COMPLETE,
							payload: false,
						}: Action));

						resolve(false);
					}
				} catch (exc) {
					// Dispatch ERROR
					dispatch(({
						type: TYPE,
						status: actionStatus.ERROR,
						payload: exc,
					}: Action));
					console.log(exc);
					reject(exc);
				}
			} else {
				throw err;
			}
		});
	} catch (exc) {
		// Dispatch ERROR
		dispatch(
			({
				type: TYPE,
				status: actionStatus.ERROR,
				payload: exc,
			}: Action));
		reject(exc);
	}
})
// .then(result => {
//     if (result !== false)
//         dispatch(action_Navigation_RedirectUser('/suite'));
// })
