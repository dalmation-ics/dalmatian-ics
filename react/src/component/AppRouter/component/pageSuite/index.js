// @flow
import React, {Component} from 'react';
import action_Nav_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';
import {connect} from 'react-redux';
import type {Dispatch} from 'src/_core/redux/types';
import action_Archive_Suite_Blank
  from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Blank';
import action_Archive_Suite_Load
  from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Load';
import {Jumbotron} from 'reactstrap';

type props = {
  filePath: null | string
}

class PageSuite extends Component<props> {

  render() {
    let {
      filePath,
    } = this.props;
    return (
        <Jumbotron fluid>
          <p>{'Files in ' + (filePath || 'unnamed archive')}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageSuite);
