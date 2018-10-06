// @flow
import type {Action, Dispatch, GetState} from 'src/_core/redux/types';

import actionStatus from 'src/_core/redux/types/actionStatus';
import {ACT_SAVE_ARCHIVE} from 'src/_core/contract/exportBridge';
import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
import _ from 'lodash';

export const TYPE = 'TYPE_ARCHIVE_SUITE_SAVE';
export default () => (dispatch: Dispatch, getState: GetState) => new Promise(
    (resolve, reject) => {
      try {
        const {
          archiveStore: {archive},
        } = getState();

        const out = _.cloneDeep(archive);
        out.map(f => {
          //todo: change to only add html to form files
          // this needs done to support image files
          delete f.uuid;
          f.fileName += '.html';
          return f;
        });

        // Dispatch START
        dispatch(({
          type: TYPE,
          status: actionStatus.STARTED,
        }: Action));

        // Prompt Electron to save an archive
        ipcRWrapper.prompt(ACT_SAVE_ARCHIVE, (err, result) => {
          if (!err) {
            // Dispatch COMPLETE
            dispatch(
                ({
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
            reject(err);
          }

          // Resolve
          resolve(err);

        }, out);
      } catch (exc) {
        reject(exc);
      }
    });

