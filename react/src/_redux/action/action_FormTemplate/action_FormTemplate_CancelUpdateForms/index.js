// @flow
import type {Action, Dispatch} from '../../../types';
import ipcRWrapper from 'src/_core/electron/IpcRWrapper';
import {ACT_CANCEL_UPDATE_FORMS} from 'src/_core/contract/formsBridge';

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
