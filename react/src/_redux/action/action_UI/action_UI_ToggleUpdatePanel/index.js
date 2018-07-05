import type {Action, Dispatch} from 'src/_core/redux/types';

export const TYPE = 'TYPE_UI_TOGGLEUPDATEMENU';
export default () => (dispatch: Dispatch) => new Promise((resolve, reject) => {
      try {
        dispatch(({type: TYPE}: Action));
        resolve();
      } catch (exc) {
        reject(exc);
      }
    },
);
