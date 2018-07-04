// @flow
import _ from 'lodash';

import * as action_UI_ToggleSettingsMenu
  from '../../action/action_UI/action_UI_ToggleSettingsMenu';
import * as action_UI_ToggleUpdatePanel
  from '../../action/action_UI/action_UI_ToggleUpdatePanel';
import * as action_UI_AcceptLegal
  from '../../action/action_UI/action_UI_AcceptLegal';
import * as action_UI_SelectTheme
  from '../../action/action_UI/action_UI_SelectTheme';

import type {Action, State} from 'src/_core/redux/types/index';

type STATE = State & {
  settingsMenuOpen: boolean | null,
  updatePanelOpen: boolean | null,
  acceptedLegal: Date | boolean | null,
  themeName: action_UI_SelectTheme.ThemeName | null
}

const DEFAULT_STATE: STATE = {

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
  acceptedLegal: false,

  /**
   * ThemePanel
   *
   * Affected by:
   * action_UI_SelectTheme
   */
  themeName: 'normal',
};

export default (previousState: STATE = DEFAULT_STATE, action: Action) => {

  let newState = _.cloneDeep(previousState);

  const {type, payload} = action;
  switch (type) {

      /**
       * action_UI_ToggleSettingsMenu
       */
    case action_UI_ToggleSettingsMenu.TYPE: {
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
      newState.acceptedLegal = true;
      break;
    }

      /**
       * action_UI_SelectTheme
       */
    case action_UI_SelectTheme.TYPE: {
      newState.themeName = payload;
    }
      break;
    default:
      break;
  }

  return newState;

}
