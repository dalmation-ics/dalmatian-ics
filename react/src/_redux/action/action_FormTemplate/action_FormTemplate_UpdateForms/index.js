// @flow
import type {Action, Dispatch} from 'src/_core/redux/types';
import actionStatus from 'src/_core/redux/types/actionStatus';
import ipcRWrapper from 'src/_core/electron/IpcRWrapper';
import {ACT_UPDATE_FORMS} from 'src/_core/contract/formsBridge';
import action_GetFormsIndex from '../action_FormTemplate_GetFormsIndex';

export const TYPE = 'TYPE_FORM_TEMPLATE_UPDATEFORMS';
export default () => (dispatch: Dispatch) => new Promise((resolve, reject) => {
  try {
    // Dispatch START
    dispatch(({
      type: TYPE,
      status: actionStatus.STARTED,
    }: Action));

    // Prompt Electron to update forms
    ipcRWrapper.prompt(ACT_UPDATE_FORMS, (err, result) => {

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
      resolve(err, result);

    });
  } catch (exc) {
    reject(exc);
  }
}).then((err) => {

  // If there is no error, get the new form index
  if (!err)
    dispatch(action_GetFormsIndex());

});

