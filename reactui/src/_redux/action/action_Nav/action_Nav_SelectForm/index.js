import type {Action, Dispatch} from 'src/_core/redux/types';

export const TYPE = 'TYPE_NAV_SELECTFORM';
export default (formId: string) => (dispatch: Dispatch) => new Promise(
    (resolve, reject) => {
      try {
        dispatch(({type: TYPE, payload: formId}: Action));
        resolve();
      } catch (exc) {
        reject(exc);
      }
    });
