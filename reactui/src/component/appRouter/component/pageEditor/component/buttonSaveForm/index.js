// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import type {Dispatch} from 'src/_core/redux/types';

import action_Archive_Item_Update
  from 'src/_redux/action/action_Archive_Item/action_Archive_Item_Update';
import type {ActionBound} from 'src/_core/redux/types';
import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';
import {CommandBarItemAction} from 'src/component/global/commandBar/component/commandBarItem';
import SaveIndicator from './container/save_indicator';
import type {ActionStatus} from 'src/_core/redux/types/actionStatus';

type propTypes = {
  action_Archive_Item_Update: ActionBound,
  action_Electron_SetTitle: ActionBound,
  saveArchiveStatus: ActionStatus,
  saveArchiveError: ActionStatus,
  form: any
}

class ButtonSaveForm extends Component<propTypes> {

  onClick_save = () => {
    this.props.action_Archive_Item_Update();
  };

  render() {
    const {
      saveArchiveStatus,
      saveArchiveError,
    } = this.props;
    return (
        <CommandBarItemAction onClick={this.onClick_save}><SaveIndicator
            saveArchiveStatus={saveArchiveStatus}
            saveArchiveError={saveArchiveError}/></CommandBarItemAction>
    );
  }
}

const mapStateToProps = (state) => {

  const archive = state.archiveStore.archive;
  const selectedUUID = state.archiveStore.suiteSelectedUUID;
  const form = archive.find(f => f.uuid === selectedUUID);
  const saveArchiveStatus = state.archiveStore.saveArchiveStatus;
  const saveArchiveError = state.archiveStore.saveArchiveError;
  return {
    form,
    saveArchiveStatus,
    saveArchiveError,
  };

};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_Archive_Item_Update,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonSaveForm);
