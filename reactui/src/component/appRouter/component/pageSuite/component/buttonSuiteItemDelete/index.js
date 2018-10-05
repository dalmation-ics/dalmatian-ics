//@flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'reactstrap';
import {toast} from 'react-toastify';

import ToastPromptButton from 'src/component/global/toastPromptButton';
import {
  CommandBarItemAction,
} from 'src/component/appRouter/component/commandBar/component/commandBarItem';
import * as s from 'src/_core/res/strings';
import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';

import action_Archive_Item_Delete
  from 'src/_redux/action/action_Archive_Item/action_Archive_Item_Delete';
import type {ActionBound, Dispatch, State} from 'src/_core/redux/types';

type propsDeleteButton = {
  archiveStore: State,
  action_Archive_Item_Delete: ActionBound,
};

class ButtonSuiteItemDelete extends Component<propsDeleteButton> {
  onClick_deleteItem = () => {

    let {archive, suiteSelectedUUID} = this.props.archiveStore;
    let {id, fileName, name} = archive.find(
        f => f.uuid === suiteSelectedUUID);
    let {
      action_Archive_Item_Delete,
    } = this.props;
    action_Archive_Item_Delete().then(() => {
      toast.success(<div>
            <h5>Deleted form {fileName} from the
              suite</h5>
            {id} {name}
          </div>,
          {autoClose: 1888});
    }).catch(toast.error);
  };

  render() {
    let {archive, suiteSelectedUUID} = this.props.archiveStore;
    let {id, fileName, name} = archive.find(
        f => f.uuid === suiteSelectedUUID);

    return <ToastPromptButton action={this.onClick_deleteItem}>
      Are you sure you want to delete {name}
    </ToastPromptButton>;
  }

}

const mapStateToProps = (state) => {
  return {
    archiveStore: state.archiveStore,
    formsStore: state.formsStore,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_Archive_Item_Delete,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
    ButtonSuiteItemDelete);
