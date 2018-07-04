// @flow
import type {Action, Dispatch} from '../../../types';

export const TYPE = 'TYPE_ARCHIVE_ITEM_SELECT';
export default (uuid) => (dispatch: Dispatch) => new Promise(
    (resolve, reject) => {
      try {
        dispatch(({type: TYPE, payload: uuid}: Action));
        resolve();
      } catch (exc) {
        reject(exc);
      }
    });
