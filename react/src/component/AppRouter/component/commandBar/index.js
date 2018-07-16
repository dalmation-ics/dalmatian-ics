// @flow
import React, {Component} from 'react';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import {connect} from 'react-redux';
import type {Dispatch} from 'src/_core/redux/types';
import type {StateUI} from 'src/_redux/reducer/reducer_UI';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
} from 'reactstrap';
import CommandBarItem from './container/commandBarItem';

type props = {
  navStore: StateUI,
  children?: Array<CommandBarItem>
}

type state = { isOpen: boolean };

class CommandBar extends Component<props, state> {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    return <div>
      <Navbar color="light" light fluid={'true'} toggleable>
        <NavbarToggler right onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {this.props.children}
          </Nav>
        </Collapse>
      </Navbar>
    </div>;
    ;
  }
}

const mapStateToProps = (state) => {
  return {
    navStore: state.navStore,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandBar);
;
