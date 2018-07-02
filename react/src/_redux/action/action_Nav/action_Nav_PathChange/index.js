import type {Action, Dispatch} from '../../../types';

export const TYPE = 'TYPE_NAV_PATHCHANGE';
export default (newPath: string) => (dispatch: Dispatch) => new Promise(
    (resolve, reject) => {
      try {
        dispatch(({type: TYPE, payload: newPath}: Action));
        resolve();
      } catch (exc) {
        reject(exc);
      }
    });
