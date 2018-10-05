// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';
import {Jumbotron, Nav} from 'reactstrap';
import uuid from 'uuid';

import action_Nav_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';
import action_Archive_Suite_Blank
  from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Blank';
import action_Archive_Suite_Load
  from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Load';
import action_Archive_Item_Select
  from 'src/_redux/action/action_Archive_Item/action_Archive_Item_Select';
import CommandBar, {SideBar} from '../commandBar';
import {CommandBarItemNav} from '../commandBar/component/commandBarItem';
import SuiteListGrid from './container/suite_list_grid';
import * as s from 'src/_core/res/strings';

type props = {
  filePath: null | string,
  archive: Array<any> | null,
  suiteSelectedUUID: uuid.v4 | uuid.v6 | string | null,
  action_Archive_Item_Select: ActionBound,
  action_Nav_RedirectUser: ActionBound
}

class PageSuite extends Component<props> {

  static createSideBar = (props: props, dispatch) => {

    let {archive, suiteSelectedUUID, action_Nav_RedirectUser} = props;

    if (!archive) {
      action_Nav_RedirectUser('/');
    }

    if (suiteSelectedUUID === null)
      return null;

    let fileName = null;
    if (archive)
      fileName = 'derp'; //archive.find(f => f.uuid === suiteSelectedUUID).fileName;

    return <SideBar title={fileName ||
    'Select a file'}>
      <p>This is a sidebar</p>

      {/* Delete */}
      {/*suiteSelectedUUID && <DeleteForm/>*/}

      {/* Rename */}
      {/*suiteSelectedUUID && <SuiteRename/>*/}

      {/*/!* Duplicate *!/*/}
      {/*suiteSelectedUUID && <NavigationMenuItem
                glyph={'duplicate'}
                onClick={() => {
                  dispatch(action_Archive_Suite_Duplicate());
                }}
                display={s.DUPLICATE}
            />*/}

      {/* Edit */}
      {suiteSelectedUUID && <CommandBarItemNav
          glyph={'edit'}
          path={'/editor'}
      >{s.EDIT}</CommandBarItemNav>}
    </SideBar>;

  };

  render() {
    const {
      filePath,
      archive,
      action_Archive_Item_Select,
    } = this.props;

    return (
        <div className={'container-fluid'}>
          <CommandBar>
            <CommandBarItemNav path={'/'}>Menu</CommandBarItemNav>
          </CommandBar>
          <div className='d-flex'>
            <Jumbotron fluid className='p-2'>
              <p>{'Files in ' + (filePath || 'unnamed archive')}</p>
              <SuiteListGrid formList={archive}
                             onFormClick={action_Archive_Item_Select}/>
            </Jumbotron>
            {PageSuite.createSideBar(this.props)}
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  let isArchiveLoaded = state.archiveStore.archive !== undefined &&
      Array.isArray(state.archiveStore.archive) &&
      state.archiveStore.archive.length > 0;
  const archive = state.archiveStore.archive;
  const suiteSelectedUUID = state.archiveStore.suiteSelectedUUID;
  return {isArchiveLoaded, archive, suiteSelectedUUID};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_Archive_Suite_Blank,
    action_Nav_RedirectUser,
    action_Archive_Suite_Load,
    action_Archive_Item_Select,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSuite);
