import React, {Component} from 'react';
import {Button} from 'reactstrap';
import action_Nav_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';
import action_Archive_Item_New
  from 'src/_redux/action/action_Archive_Item/action_Archive_Item_New';
import {connect} from 'react-redux';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';
import action_Nav_SelectForm
  from 'src/_redux/action/action_Nav/action_Nav_SelectForm';
import action_UI_ToggleUpdatePanel
  from 'src/_redux/action/action_UI/action_UI_ToggleUpdatePanel';
import CommandBarItem from '../commandBarItem';
import {
  NavItem,
} from 'reactstrap';

class CommandBarItemNav extends CommandBarItem<{
  active?: boolean | null,
  children?: React.Node | string,
  action_Nav_RedirectUser: ActionBound,
  path: string,
}> {

  render() {
    return (
        <NavItem active={this.props.active || true}
                 onClick={() => this.props.action_Nav_RedirectUser(
                     this.props.path)}>
          {this.props.children}
        </NavItem>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_Nav_RedirectUser,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandBarItemNav);
