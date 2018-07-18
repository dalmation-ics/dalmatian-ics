// @flow
import React, {Component} from 'react';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import {connect} from 'react-redux';
import {Button, Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';
import action_UI_ToggleSettingsMenu
  from 'src/_redux/action/action_UI/action_UI_ToggleSettingsMenu/index';
import SettingsPanelComponentList
  from '../settingsPanelComponent';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';

class MenuSettings extends Component<{
  action_UI_ToggleSettingsMenu: ActionBound,
  settingsMenuOpen: boolean
}> {
  static settingsItemList = () => {
    if (SettingsPanelComponentList === null ||
        SettingsPanelComponentList === undefined) {
      return [];
    }
    console.log(SettingsPanelComponentList);
    return SettingsPanelComponentList;
  };

  static cellBsClass = '';

  static wrapSettingsPanelCell = (Content, index) => {
    return <div className={MenuSettings.cellBsClass}
                style={{flexGrow: 1, flexShrink: 1}}
                key={'settingsPanelComponentCell_' + index}
    >
      <Content/>
    </div>;
  };

  makeSettingsComponentList = () => {

    const list = MenuSettings.settingsItemList();
    const components = list.map((w, i) => {
      return MenuSettings.wrapSettingsPanelCell(w, i);
    });

    return <div className="row"
                style={{
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  alignItems: 'stretch',
                }}>
      {components}
    </div>;

  };

  render() {

    const {
      settingsMenuOpen,
    } = this.props;
    const {
      action_UI_ToggleSettingsMenu,
    } = this.props;

    return (
        <Modal size={'lg'} isOpen={settingsMenuOpen} toggle={() => {
          action_UI_ToggleSettingsMenu();
        }}>
          <ModalHeader>
            Settings
          </ModalHeader>
          <ModalBody>
            {this.makeSettingsComponentList()}
          </ModalBody>
          <ModalFooter>
            <Button size={'lg'} onClick={() => {
              action_UI_ToggleSettingsMenu(false);
            }}>Close</Button>
          </ModalFooter>
        </Modal>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    settingsMenuOpen: state.uiStore.settingsMenuOpen,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_UI_ToggleSettingsMenu,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuSettings);

