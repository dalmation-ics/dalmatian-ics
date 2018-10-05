// @flow
import React, {Component} from 'react';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import {connect} from 'react-redux';
import type {Dispatch} from 'src/_core/redux/types/index';
import type {StateUI} from 'src/_redux/reducer/reducer_UI/index';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav, NavItem,
} from 'reactstrap';
import {CommandBarItem} from './component/commandBarItem/index';

type props = {
  children?: Array<CommandBarItem>,
  navStore: StateUI,
  subtitle: string,
  title: string,
}

type state = { isOpen: boolean };

class ComponentCommandBar extends Component<props, state> {

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
      <Navbar color="light" light fluid={'true'} expand>
        <NavbarToggler onClick={this.toggle} right={'true'}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            {this.props.children}
          </Nav>
        </Collapse>
      </Navbar>
    </div>;
  }
}

class ComponentSideBar extends Component<props, state> {

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
    let {children, subtitle, title} = this.props;
    return <div>
      <Navbar color="light" light fluid={'true'} expand>
        <NavbarToggler onClick={this.toggle} right={'true'}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar vertical>
            <NavItem><strong>{title && title}</strong></NavItem>
            <NavItem>{subtitle && subtitle}</NavItem>
            {children}
          </Nav>
        </Collapse>
      </Navbar>
    </div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(
    ComponentCommandBar);
export const SideBar = connect(mapStateToProps, mapDispatchToProps)(
    ComponentSideBar);
