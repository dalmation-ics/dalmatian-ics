// @flow
import type {Action, Dispatch} from '../../../types';

export const TYPE = 'TYPE_ARCHIVE_ITEM_UPDATE';
export default (content) => (dispatch: Dispatch) => new Promise(
    (resolve, reject) => {
      try {
        dispatch(({type: TYPE, payload: content}: Action));
        resolve();
      } catch (exc) {
        reject(exc);
      }
    });
