import React, {Component} from 'react';
import {Button} from 'reactstrap';
import action_Nav_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser/index';
import thunkBindActionCreators
  from 'src/_core/redux/thunkBindActionCreators';
import {connect} from 'react-redux';
import type {Dispatch} from 'src/_core/redux/types/index';
import {
  NavItem,
} from 'reactstrap';

class CommandBarItem extends Component<{
  active?: boolean | null,
  children?: React.Node,
}> {

  render() {
    return (
        <NavItem active={this.props.active || true}>
          {this.props.children}
        </NavItem>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandBarItem);
