// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import type {Dispatch} from 'src/_core/redux/types';

import action_Nav_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import action_Electron_SetTitle
  from 'src/_redux/action/action_Electron/action_Electron_SetTitle';
import type {ActionBound} from 'src/_core/redux/types';
import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';
import CommandBar from 'src/component/global/commandBar/index';
import {CommandBarItemNav} from 'src/component/global/commandBar/component/commandBarItem';

type propTypes = {
  action_Nav_RedirectUser: ActionBound,
  action_Electron_SetTitle: ActionBound,
  form: any
}

class PageEditor extends Component<propTypes> {

  render() {

    const {
      action_Nav_RedirectUser,
      action_Electron_SetTitle,
    } = this.props;

    let {form} = this.props;
    if (form === undefined) {
      toast.error('Please select a form before entering the editor.');
      action_Nav_RedirectUser('/suite');
    } else {
      try {
        action_Electron_SetTitle(
            'Editing ' + ' ~ "' + form.name + '"');
      } catch (e) {

      }
      return (
          <div className="container-fluid">
            <CommandBar>
              <CommandBarItemNav path={'/suite'}>Back</CommandBarItemNav>
            </CommandBar>
            <div
                id="FormContent"
                dangerouslySetInnerHTML={{__html: form.content}}>
            </div>
          </div>
      );
    }
  }
}

const mapStateToProps = (state) => {

  const archive = state.archiveStore.archive;
  const selectedUUID = state.archiveStore.suiteSelectedUUID;
  const form = archive.find(f => f.uuid === selectedUUID);

  return {
    formsStore: state.formsStore,
    archiveStore: state.archiveStore,
    form,
  };

};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_Nav_RedirectUser,
    action_Electron_SetTitle,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageEditor);
