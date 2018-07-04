import type {Dispatch, Action} from '../../../types';

let nameList = Object.freeze(['normal', 'dark', 'contrast']);

export type ThemeName = $Keys<typeof nameList>;

export const TYPE = 'ACTION_UI_SELECT_THEME';

export default (themeName?: ThemeName = 'normal') => (dispatch: Dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(({
        type: TYPE,
        payload: themeName,
      }: Action));
      resolve();
    } catch (exc) {
      reject(exc);
    }
  });
};
