// @flow

import {ACT_ARCHIVE_SEND_EMAIL} from 'src/_core/contract/exportBridge';
import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
import type {Action, Dispatch} from 'src/_core/redux/types';
import actionStatus from 'src/_core/redux/types/actionStatus';
import * as action_Archive_Suite_Save from '../action_Archive_Suite_Save';

export const TYPE = 'TYPE_ARCHIVE_SUITE_EMAIL';
export default () => (dispatch: Dispatch) => new Promise(
	(resolve, reject) => {

		// Dispatch START
		dispatch(({type: TYPE, status: actionStatus.STARTED}: Action));

		// First let's prompt the user to save the file
		dispatch(action_Archive_Suite_Save.default()).then(() => {
			try {
//          const NL = '\n';
//          const {
//            archiveStore: {
//              archive,
//            },
//          } = getState();
//          let body = 'Forms attached below' + NL;
				// Prompt Electron to email an archive
				ipcRWrapper.prompt(ACT_ARCHIVE_SEND_EMAIL, (err, result) => {

					if (!err) {
						// Dispatch COMPLETE
						dispatch((
							{
								type: TYPE,
								status: actionStatus.COMPLETE,
								payload: result,
							}: Action));
					} else {
						// Dispatch ERROR
						dispatch((
							{
								type: TYPE,
								status: actionStatus.ERROR,
								payload: err,
							}: Action));
					}
					// Resolve
					resolve(err, result);
				}, {
					subject: 'ICS forms',
					body: 'Please attach the .bcics file from the file browser.',
				});
			} catch (exc) {
				dispatch((
					{type: TYPE, status: actionStatus.ERROR, payload: exc}: Action));
			}
		});
	});

