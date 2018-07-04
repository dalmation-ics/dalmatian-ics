// @flow
import type {Action, Dispatch} from 'src/_core/redux/types';

export const TYPE = 'TYPE_ARCHIVE_ITEM_SELECT';
export default (selectedUuid: string) => (dispatch: Dispatch) => new Promise(
    (resolve, reject) => {
      try {
        dispatch(({type: TYPE, payload: selectedUuid}: Action));
        resolve();
      } catch (exc) {
        reject(exc);
      }
    });
