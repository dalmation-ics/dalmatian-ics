import type {
  Action,
  Dispatch,
} from '../../../types';

export const TYPE = 'TYPE_UI_TOGGLESETTINGSMENU';
export default (show?: boolean) => (dispatch: Dispatch) => new Promise(
    (resolve, reject) => {
      try {
        dispatch(({type: TYPE, payload: show}: Action));
        resolve();
      } catch (exc) {
        reject(exc);
      }
    },
);
