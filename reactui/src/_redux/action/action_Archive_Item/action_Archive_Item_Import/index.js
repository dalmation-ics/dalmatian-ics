import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
import {ACT_IMPORT_FORM} from 'src/_core/contract/exportBridge';
import uuid from 'uuid';
import actionStatus from 'src/_core/redux/types/actionStatus';
import type {Action, Dispatch} from 'src/_core/redux/types';

export const TYPE = 'TYPE_ARCHIVE_ITEM_IMPORT_XML';

export default () => (dispatch: Dispatch) => new Promise((resolve, reject) => {
  try {
    // Dispatch START
    dispatch(({type: TYPE, status: actionStatus.STARTED}: Action));

    // Prompt Electron to open an archive
    ipcRWrapper.prompt(ACT_IMPORT_FORM, (err, response) => {
      if (!err) {

        response.uuid = uuid.v4();
        dispatch(({
          type: TYPE,
          status: actionStatus.COMPLETE,
          payload: response,
        }: Action));

      } else {
        // Dispatch ERROR
        dispatch(({
          type: TYPE,
          status: actionStatus.ERROR,
          payload: err,
        }: Action));
        reject(err);
      }
      resolve(err, response);
    });
  } catch (exc) {
    reject(exc);
  }
})
