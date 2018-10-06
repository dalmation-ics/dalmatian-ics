// @flow
import React, {Component} from 'react';
import {Col, Jumbotron, Row} from 'reactstrap';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import type {
  ActionBound,
  Dispatch,
} from 'src/_core/redux/types';
import PanelButton from './container/panel_button';
import {toast} from 'react-toastify';
import * as s from 'src/_core/res/strings';
import action_Nav_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import action_Archive_Suite_Blank
  from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Blank';
import action_Archive_Suite_Load
  from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Load';
import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';
import UpdatePanel from '../update_panel';

type props = {
  isArchiveLoaded: boolean,
  action_Nav_RedirectUser: ActionBound,
  action_Archive_Suite_Blank: ActionBound,
  action_Archive_Suite_Load: ActionBound,
}

class PageMenuMain extends Component<props> {

  render() {
    let {
      isArchiveLoaded,
      action_Nav_RedirectUser,
      action_Archive_Suite_Blank,
      action_Archive_Suite_Load,
    } = this.props;
    return (
        <Jumbotron>
          <Row>
            <Col xs="4">
              <PanelButton text={s.ARCHIVE.ARCHIVE_CREATE_BLANK}
                           display={<FontAwesome name="file-archive"
                                                 size={'5x'}/>}
                           testid="ButtonMainMenuCreateForm"
                           onClick={() => {
                             action_Archive_Suite_Blank().then(() => {
                               toast.success('Empty archive created',
                                   {
                                     autoClose: 1888,
                                   });
                               action_Nav_RedirectUser(
                                   '/suite');
                             });
                           }}
              />
            </Col>
            <Col xs="4">
              <PanelButton text={s.ARCHIVE.ARCHIVE_CONTINUE_EDITING_CURRENT}
                           display={<FontAwesome name="edit"
                                                 size={'5x'}/>}
                           disabled={!isArchiveLoaded}
                           onClick={() => {
                             action_Nav_RedirectUser('/suite');
                           }}
              />
            </Col>
            <Col xs="4">
              <PanelButton text={s.ARCHIVE.ARCHIVE_OPEN_EXISTING}
                           display={<FontAwesome name="folder-open"
                                                 size={'5x'}/>}
                           testid="ButtonMainMenuOpenExistingForm"
                           onClick={() => {
                             action_Archive_Suite_Load();
                           }}
              />
            </Col>
            <UpdatePanel/>
          </Row>
        </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => {
  let isArchiveLoaded = state.archiveStore.archive !== undefined &&
      Array.isArray(state.archiveStore.archive) &&
      state.archiveStore.archive.length > 0;
  return {isArchiveLoaded};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_Archive_Suite_Blank,
    action_Nav_RedirectUser,
    action_Archive_Suite_Load,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageMenuMain);

