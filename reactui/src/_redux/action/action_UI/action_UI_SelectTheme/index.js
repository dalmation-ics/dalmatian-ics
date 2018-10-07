// @flow
import type {Action, Dispatch} from 'src/_core/redux/types';
import type {Theme} from 'src/component/settingsPanel/component/settingsPanelComponent/theme_selector/types';

export const TYPE = 'ACTION_UI_SELECT_THEME';

export default (theme: Theme) => (dispatch: Dispatch) => {
	return new Promise((resolve, reject) => {
		try {
			dispatch(({
				type: TYPE,
				payload: theme,
			}: Action));
			resolve();
		} catch (exc) {
			reject(exc);
		}
	});
};
