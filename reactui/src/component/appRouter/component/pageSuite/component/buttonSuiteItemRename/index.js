import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup, Modal} from 'reactstrap';

import PropTypes from 'prop-types';
import action_Archive_Suite_Rename
  from 'src/_redux/action/action_Archive_Item/action_Archive_Item_Rename';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import {
  CommandBarItemNav,
  CommandBarItemAction,
} from 'src/component/appRouter/component/commandBar/component/commandBarItem';
import uuid from 'uuid';
import type {ActionBound} from '../../../../../../_core/redux/types';

type props = {
  archive: Array<any> | null,
  suiteSelectedUUID: uuid.v4 | uuid.v6 | string | null,
  action_Archive_Item_Rename: ActionBound
}

class SuiteRename extends Component<props> {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);

    this.state = {
      show: false,
      newName: '',
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }

  updateInputValue = (e) => {
    this.setState({newName: e.target.value});
  };

  addSpace = (e) => {
    const key = e.which;
    if (key == 32) {
      let val = this.state.newName;
      val += ' ';
      this.setState({newName: val});
    }
  };

  render() {
    let {archive, suiteSelectedUUID} = this.props.archiveStore;
    let fileName = archive.find(f => f.uuid === suiteSelectedUUID).fileName;

    let {
      action_Archive_Suite_Rename,
    } = this.props;

    return <div></div>;
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
    action_Archive_Suite_Rename,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SuiteRename);
