//@flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  NavItem,
} from 'reactstrap';

import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';
import action_Nav_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';

import type {ActionBound, Dispatch} from 'src/_core/redux/types/index';

type propsCommandBarItem = {
  active?: boolean | null,
  children?: React.Node,
}
type propsCommandBarItemNav = {
  ...propsCommandBarItem,
  action_Nav_RedirectUser: ActionBound,
  path: string
}
type propCommandBarItemAction = {
  ...propsCommandBarItem,
  onClick: (e?: Event) => any
}

class ComponentCommandBarItem extends Component<propsCommandBarItemNav> {

  render() {
    const {active, children} = this.props;
    return (
        <NavItem active={active || true}>
          {children}
        </NavItem>
    );
  }
}

class ComponentCommandBarItemAction extends Component<propCommandBarItemAction> {
  render() {
    const {active, children, onClick} = this.props;
    return (
        <NavItem active={active || true}>
          <a onClick={onClick}>
            {children}
          </a>
        </NavItem>
    );
  }
}

class ComponentCommandBarItemNav extends Component<propsCommandBarItemNav> {
  render() {
    const {active, children, path, action_Nav_RedirectUser} = this.props;
    const action = () => {
      action_Nav_RedirectUser(path);
    };
    return <NavItem active={active || true}>
      <a onClick={action}>
        {children}
      </a>
    </NavItem>;
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

/**
 * Default command bar item that does nothing
 */
export let CommandBarItem =
    connect(mapStateToProps, mapDispatchToProps)(ComponentCommandBarItem);
/**
 * Default command bar item that takes a path and when clicked, navigates to
 * that path.
 */
export let CommandBarItemNav =
    connect(mapStateToProps, mapDispatchToProps)(ComponentCommandBarItemNav);
/**
 * Default command bar item that takes an action to execute when clicked.
 */
export let CommandBarItemAction =
    connect(mapStateToProps, mapDispatchToProps)(ComponentCommandBarItemAction);
