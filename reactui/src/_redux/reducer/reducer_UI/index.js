// @flow
import _ from 'lodash';
import * as React from 'react';

import type {Action, State} from 'src/_core/redux/types/index';
import type {Theme} from 'src/component/settingsPanel/component/settingsPanelComponent/theme_selector/types';
import * as action_UI_AcceptLegal from '../../action/action_UI/action_UI_AcceptLegal';
import * as action_UI_SelectTheme from '../../action/action_UI/action_UI_SelectTheme';
import * as action_UI_ToggleSettingsMenu from '../../action/action_UI/action_UI_ToggleSettingsMenu';
import * as action_UI_ToggleUpdatePanel from '../../action/action_UI/action_UI_ToggleUpdatePanel';

export type commandBarContextItem = { display: null | string | React.Node }

export type StateUI = State & {
	settingsMenuOpen: boolean | null,
	updatePanelOpen: boolean | null,
	acceptedLegal: Date | null,
	theme: Theme | null,
	commandBarContextItem: {
		[string]: commandBarContextItem
	}
}

const DEFAULT_STATE: StateUI = {

	/**
	 * SettingsMenu
	 *
	 * Affected by:
	 * action_UI_ToggleSettingsMenu
	 */
	settingsMenuOpen: false,

	/**
	 * UpdatePanel
	 *
	 * Affected by:
	 * action_UI_ToggleUpdatePanel
	 */
	updatePanelOpen: false,

	/**
	 * LegalPanel
	 *
	 * Affected by:
	 * action_UI_AcceptLegal
	 */
	acceptedLegal: null,

	/**
	 * ThemePanel
	 *
	 * Affected by:
	 * action_UI_SelectTheme
	 */
	theme: {name: 'normal'},
	commandBarContextItem: {},
};

export default (previousState: StateUI = DEFAULT_STATE, action: Action) => {

	let newState = _.cloneDeep(previousState);

	const {type, payload} = action;
	switch (type) {

		/**
		 * action_UI_ToggleSettingsMenu
		 */
		case action_UI_ToggleSettingsMenu.TYPE: {
			if (payload === null)
				newState.settingsMenuOpen = !newState.settingsMenuOpen;

			else
				newState.settingsMenuOpen = payload;
			break;
		}

		/**
		 * action_UI_ToggleUpdatePanel
		 */
		case action_UI_ToggleUpdatePanel.TYPE: {
			newState.updatePanelOpen = !previousState.updatePanelOpen;
			break;
		}

		/**
		 * action_UI_AcceptLegal
		 */
		case action_UI_AcceptLegal.TYPE: {
			newState.acceptedLegal = Date.now();
			break;
		}

		/**
		 * action_UI_SelectTheme
		 */
		case action_UI_SelectTheme.TYPE: {
			newState.theme = payload;
			break;
		}
		default:
			break;
	}

	return newState;

}
