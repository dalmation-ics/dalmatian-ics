// @flow
import type {Action, Dispatch} from '../../../types';

export const TYPE = 'TYPE_ARCHIVE_ITEM_RENAME';
export default (fileName) => (dispatch: Dispatch) => new Promise(
    (resolve, reject) => {
      try {
        dispatch(({type: TYPE, payload: fileName}: Action));
        resolve();
      } catch (exc) {
        reject(exc);
      }
    });
