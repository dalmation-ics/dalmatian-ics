// @flow
import type {Action, Dispatch, GetState} from 'src/_core/redux/types';
import ipcRWrapper from '../../../../_core/electron/IpcRWrapper';
import {ACT_GET_FORM} from '../../../../_core/contract/formsBridge';
import actionStatus from 'src/_core/redux/types/actionStatus';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';

export const TYPE = 'TYPE_ARCHIVE_ITEM_NEW';
export default (formId: string) => (
    dispatch: Dispatch, getState: GetState) => new Promise(
    (resolve, reject) => {
      try {
        const formDetails = getState().formsStore.formIndex.find(
            i => i.id === formId);

        // Dispatch START
        dispatch(({type: TYPE, status: actionStatus.STARTED}: Action));

        // Prompt Electron to get a form
        ipcRWrapper.prompt(ACT_GET_FORM, (err, result) => {

          if (!err) {
            // Dispatch COMPLETE
            let archiveObject = _.cloneDeep(formDetails);
            archiveObject.uuid = uuidv4.v4();
            archiveObject.content = result;

            dispatch(({
              type: TYPE,
              status: actionStatus.COMPLETE,
              payload: archiveObject,
            }: Action));

          } else {
            // Dispatch ERROR
            dispatch(({
              type: TYPE,
              status: actionStatus.ERROR,
              payload: result,
            }: Action));
          }

          // Resolve
          resolve(err, result);

        }, formDetails.fileName);
      } catch (exc) {
        reject(exc);
      }
    });
