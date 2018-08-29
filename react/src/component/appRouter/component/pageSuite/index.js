// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {Dispatch} from 'src/_core/redux/types';
import {Jumbotron} from 'reactstrap';

import action_Nav_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';
import action_Archive_Suite_Blank
  from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Blank';
import action_Archive_Suite_Load
  from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Load';
import CommandBar from '../commandBar';
import CommandBarItemNav from '../commandBar/component/commandBarItemNav';
import SuiteListGrid from './container/suite_list_grid';

type props = {
  filePath: null | string,
  archive: Array<any> | null
}

class PageSuite extends Component<props> {

  render() {
    const {
      filePath,
      archive,
    } = this.props;

    return (
        <div className={'container-fluid'}>
          <CommandBar><CommandBarItemNav
              path={'/suite'}>Back</CommandBarItemNav></CommandBar>
          <Jumbotron fluid>
            <p>{'Files in ' + (filePath || 'unnamed archive')}</p>
            <SuiteListGrid formList={archive}/>
          </Jumbotron>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  let isArchiveLoaded = state.archiveStore.archive !== undefined &&
      Array.isArray(state.archiveStore.archive) &&
      state.archiveStore.archive.length > 0;
  const archive = state.archiveStore.archive;
  return {isArchiveLoaded, archive};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_Archive_Suite_Blank,
    action_Nav_RedirectUser,
    action_Archive_Suite_Load,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSuite);
