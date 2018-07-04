// @flow
import type {Action, Dispatch, GetState} from '../../../types';

import ipcRWrapper from 'src/_core/electron/IpcRWrapper';
import {ACT_SHOW_PATH_IN_FOLDER} from 'src/_core/contract/exportBridge';

export const TYPE = 'TYPE_ARCHIVE_SHOW_FILE_IN_FOLDER';
export default (filePath: string | URL | '' | null) => (
    dispatch: Dispatch, getState: GetState) => new Promise(
    (resolve, reject) => {
      try {
        if (!filePath || filePath === '')
          filePath = getState().archiveStore.filePath;
        if (!filePath || filePath === '') {
          reject('No file selected');
        } else {
          ipcRWrapper.prompt(ACT_SHOW_PATH_IN_FOLDER,
              (err, pathOpened) => {
                dispatch(({type: TYPE, filePath, pathOpened, err}: Action));
                resolve(err, pathOpened);
              }, filePath);
        }
      } catch (exc) {
        reject(exc);
      }
    })
