// @flow
import type {Action, Dispatch} from 'src/_core/redux/types';

import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
import React from 'react';
import actionStatus from 'src/_core/redux/types/actionStatus';
import action_Navigation_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import {ACT_OPEN_ARCHIVE} from 'src/_core/contract/exportBridge';
import uuidv4 from 'uuid/v4';
import {toast} from 'react-toastify';
import * as s from 'src/_core/res/strings';

export const TYPE = 'TYPE_ARCHIVE_SUITE_LOAD';
export default (selectedFilePath?: string | null = null) => (dispatch: Dispatch) => new Promise(
    (resolve, reject) => {
      try {
        // Dispatch START
        dispatch(({
          type: TYPE,
          status: actionStatus.STARTED,
          filePath: selectedFilePath,
        }: Action));

        // Prompt Electron to open an archive
        ipcRWrapper.prompt(ACT_OPEN_ARCHIVE, (err, response) => {
          if (!err) {
            let {result, filePath} = response;

            result.map(f => {
              //Todo: modify this area to handle any non-html files
              // this needs done to allow us to do image files
              f.uuid = uuidv4();
              if (f.fileName.endsWith('.html'))
                f.fileName = f.fileName.slice(0, -5);
            });

            // Dispatch COMPLETE
            dispatch(
                ({
                  type: TYPE,
                  status: actionStatus.COMPLETE,
                  payload: result,
                  filePath: filePath,
                }: Action));
            // Resolve
            toast.success(<div>
              <h4>{s.ARCHIVE_OPEN_SUCCESS}</h4>
              <p>{filePath}</p>
            </div>, {autoClose: 2100});
            resolve(err, response);
          } else {
            // Dispatch ERROR
            throw err;
          }
        }, selectedFilePath);
      } catch (err) {
        dispatch(
            ({type: TYPE, status: actionStatus.ERROR, payload: err}: Action));
        toast.error(<div>
          <h3>Failed opening archive</h3>
          <p>{err.message || err}</p>
        </div>, {autoClose: 1888});
        reject(err);
      }
    }).then((err) => {

  // If there was no error opening an archive, redirect to /edit
  if (!err)
    dispatch(action_Navigation_RedirectUser('/suite'));

});
