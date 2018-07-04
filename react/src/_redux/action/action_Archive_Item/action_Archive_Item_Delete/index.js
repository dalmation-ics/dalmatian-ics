// @flow
import type {Action, Dispatch} from 'src/_core/redux/types';

export const TYPE = 'TYPE_ARCHIVE_ITEM_DELETE';
export default () => (dispatch: Dispatch) => new Promise((resolve, reject) => {
  try {
    dispatch((({type: TYPE}: Action): Action));
    resolve();
  } catch (exc) {
    reject(exc);
  }
});
