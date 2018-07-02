import _ from 'lodash';
import * as action_UI_ToggleSettingsMenu
  from '../../actions/action_UI/action_UI_ToggleSettingsMenu';
import * as action_UI_ToggleUpdatePanel
  from '../../actions/action_UI/action_UI_ToggleUpdatePanel';
import * as action_UI_AcceptLegal
  from '../../actions/action_UI/action_UI_AcceptLegal';
import * as action_UI_SelectTheme
  from 'src/_redux/actions/action_UI/action_UI_SelectTheme';

const DEFAULT_STATE = {

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
  themeName: 'standard',
};

export default (previousState = DEFAULT_STATE, action) => {

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

    default:
      break;
  }

  return newState;

}
