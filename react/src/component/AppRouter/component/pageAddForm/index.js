// @flow
import React, {Component} from 'react';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import {connect} from 'react-redux';
import FormList from './container/form_list/index';
import FormDetail from './container/form_detail/index';
import UpdatePanel from '../update_panel';
import action_Nav_SelectForm
  from 'src/_redux/action/action_Nav/action_Nav_SelectForm';
import action_Nav_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import action_Archive_Item_New
  from 'src/_redux/action/action_Archive_Item/action_Archive_Item_New';
import action_UI_ToggleUpdatePanel
  from 'src/_redux/action/action_UI/action_UI_ToggleUpdatePanel';
import {toast} from 'react-toastify';
import * as s from 'src/_core/res/strings';
import type {ActionBound} from 'src/_core/redux/types';
import type {Dispatch} from 'src/_core/redux/types';
import CommandBar from '../commandBar';
import CommandBarButton from '../commandBar/container/commandBarItemNav';

type props = {
  formTemplateStore: Object,
  navStore: Object,
  action_Archive_Item_New: ActionBound,
  action_Nav_RedirectUser: ActionBound,
  action_Nav_SelectForm: ActionBound,
  action_UI_ToggleUpdatePanel: ActionBound,
}

class PageAddForm extends Component<props> {

  onSubmit_AddForm = (selectedForm) => {
    const {
      action_Archive_Item_New,
      action_Nav_RedirectUser,
    } = this.props;

    action_Archive_Item_New(selectedForm.id).
        then(() => {
          toast.success(
              s.FORM_ADD_TO_ARCHIVE_SUCCESS,
              {autoClose: 1100});

          action_Nav_RedirectUser('/suite');
        }).catch(e => {
      toast.error(<div>
        <h3>Failed adding form from
          template</h3>
        {e}
      </div>);
    });
  };

  render() {

    const {
      formTemplateStore: {formIndex},
      navStore: {selectedFormId},
    } = this.props;

    const {
      action_Nav_SelectForm,
      action_UI_ToggleUpdatePanel,
    } = this.props;

    let selectedForm;
    if (selectedFormId && formIndex)
      selectedForm = formIndex.filter(
          f => f.id === selectedFormId)[0];

    return (
        <div className="container-fluid">
          <CommandBar><CommandBarButton path={'/suite'}>Back</CommandBarButton></CommandBar>
          <div className="col-xs-12 col-sm-8">
            <FormList forms={formIndex}
                      selected={selectedFormId}
                      onSelect={(selectedId) => {
                        action_Nav_SelectForm(selectedId);
                      }}
                      onSubmit={() => {
                        this.onSubmit_AddForm(selectedForm);
                      }}
                      onClickOpenUpdatePanel={action_UI_ToggleUpdatePanel}
            />
          </div>
          <div className="hidden-xs col-sm-4">
            <FormDetail form={selectedForm}/>
          </div>
          <UpdatePanel/>
        </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    formTemplateStore: state.formTemplateStore,
    navStore: state.navStore,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_Nav_SelectForm,
    action_Nav_RedirectUser,
    action_Archive_Item_New,
    action_UI_ToggleUpdatePanel,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageAddForm);
