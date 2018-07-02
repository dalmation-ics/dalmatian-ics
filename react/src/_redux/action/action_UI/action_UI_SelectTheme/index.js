// @flow
import type {Dispatch, Action, PromiseAction} from '../../../types';

export const themeList = Object.freeze(
    {'normal': 'normal', 'dark': 'dark', 'contrast': 'contrast'});

export type ThemeName = 'normal' | 'dark';

export const TYPE = 'ACTION_UI_SELECT_THEME';

export default (themeName: ThemeName) => (dispatch: Dispatch) => {
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
