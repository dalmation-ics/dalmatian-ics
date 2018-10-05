// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';
import {Jumbotron, Col, Row} from 'reactstrap';
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
import action_Archive_Item_Duplicate
  from 'src/_redux/action/action_Archive_Item/action_Archive_Item_Duplicate';
import CommandBar, {SideBar} from '../commandBar';
import {ButtonSuiteItemRename, ButtonSuiteItemDelete} from './component';
import {
  CommandBarItemNav,
  CommandBarItemAction,
} from '../commandBar/component/commandBarItem';
import SuiteListGrid from './container/suite_list_grid';
import * as s from 'src/_core/res/strings';

type props = {
  filePath: null | string,
  archive?: Array<any>,
  suiteSelectedUUID: uuid.v4 | uuid.v6 | string | null,
  action_Archive_Item_Select: ActionBound,
  action_Nav_RedirectUser: ActionBound,
  action_Archive_Item_Duplicate: ActionBound
}

class PageSuite extends Component<props> {

  static createSideBar = (props: props) => {

    let {
      filePath,
      archive,
      suiteSelectedUUID,
      action_Nav_RedirectUser,
      action_Archive_Item_Duplicate,
    } = props;

    if (archive === undefined) {
      action_Nav_RedirectUser('/');
      return null;
    }

    const selectedFile = archive.find(f => f.uuid === suiteSelectedUUID);

    return <SideBar title={filePath}
                    subtitle={selectedFile !== undefined ? selectedFile.name :
                        s.NO_FORM_SELECTED}>
      <hr/>
      {/* Delete */}
      {suiteSelectedUUID && <ButtonSuiteItemRename/>}

      {/* Rename */}
      {suiteSelectedUUID && <ButtonSuiteItemDelete/>}

      {/*/!* Duplicate *!/*/}
      {suiteSelectedUUID && <CommandBarItemAction
          glyph={'duplicate'}
          onClick={action_Archive_Item_Duplicate}
      >{s.DUPLICATE}</CommandBarItemAction>}

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
          <Row noGutters>
            <Col xs={7} sm={8} md={9}>
              <Jumbotron fluid>
                <p>{'Files in ' + (filePath || 'unnamed archive')}</p>
                <SuiteListGrid formList={archive}
                               onFormClick={action_Archive_Item_Select}/>
              </Jumbotron>
            </Col>
            <Col xs={5} sm={4} md={3}>
              {PageSuite.createSideBar(this.props)}
            </Col>
          </Row>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  let isArchiveLoaded = state.archiveStore.archive !== undefined &&
      Array.isArray(state.archiveStore.archive) &&
      state.archiveStore.archive.length > 0;
  const {archive, filePath} = state.archiveStore;
  const suiteSelectedUUID = state.archiveStore.suiteSelectedUUID;
  return {isArchiveLoaded, archive, filePath, suiteSelectedUUID};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_Archive_Suite_Blank,
    action_Nav_RedirectUser,
    action_Archive_Suite_Load,
    action_Archive_Item_Select,
    action_Archive_Item_Duplicate,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSuite);
