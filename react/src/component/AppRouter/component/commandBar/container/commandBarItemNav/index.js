import React from 'react';
import action_Nav_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';
import {connect} from 'react-redux';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';
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
