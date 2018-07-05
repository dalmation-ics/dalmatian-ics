// @flow
import type {Action, Dispatch} from 'src/_core/redux/types';
import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
import {ACT_CANCEL_CHECK_FOR_UPDATES} from 'src/_core/contract/formsBridge';

export const TYPE = 'TYPE_FORM_TEMPLATE_CANCELCHECKFORUPDATES';
export default () => (dispatch: Dispatch) => new Promise((resolve, reject) => {
  try {
    ipcRWrapper.prompt(ACT_CANCEL_CHECK_FOR_UPDATES, (err, result) => {
      dispatch(({type: TYPE, err, result}: Action));
      resolve(err, result);
    });
  } catch (exc) {
    reject(exc);
  }
});

