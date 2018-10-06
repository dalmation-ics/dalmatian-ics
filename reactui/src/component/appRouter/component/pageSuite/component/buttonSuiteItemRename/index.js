import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';

import action_Archive_Item_Rename
  from 'src/_redux/action/action_Archive_Item/action_Archive_Item_Rename';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import ToastPromptButton from 'src/component/global/toastPromptButton';
import * as s from 'src/_core/res/strings';

import type {ActionBound} from 'src/_core/redux/types';

type props = {
  archive: Array<any> | null,
  suiteSelectedUUID: uuid.v4 | uuid.v6 | string | null,
  action_Archive_Item_Rename: ActionBound
}

class SuiteRename extends Component<props> {

  constructor(props, context) {
    super(props, context);

    this.state = {
      newName: '',
    };
  }

  onClick_renameFile = () => {
    const {action_Archive_Item_Rename} = this.props;
    let newName = this.state.newName.trim();

    action_Archive_Item_Rename(newName);
  };

  updateInputValue = (e) => {
    this.setState({newName: e.target.value});
  };

  addSpace = (e) => {
    const key = e.which;
    if (key === 32) {
      let val = this.state.newName;
      val += ' ';
      this.setState({newName: val});
    }
  };

  onChange_updateNewName = (e) => {
    this.addSpace(e);
    this.updateInputValue(e);
  };

  render() {
    let {archive, suiteSelectedUUID} = this.props.archiveStore;
    let fileName = archive.find(f => f.uuid === suiteSelectedUUID).fileName;

    return <ToastPromptButton action={this.onClick_renameFile}
                              textButtonTitle={s.ARCHIVE.ITEM.RENAME}>
      <div>
        <p>Are you sure you want to delete {fileName}</p>
        <input onKeyDown={this.onChange_updateNewName}
               onChange={this.onChange_updateNewName}/>
      </div>
    </ToastPromptButton>;
  }

}

const mapStateToProps = (state) => {
  return {
    archiveStore: state.archiveStore,
    formsStore: state.formsStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return thunkBindActionCreators({
    action_Archive_Item_Rename,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SuiteRename);
