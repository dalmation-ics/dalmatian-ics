//@flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavItem,} from 'reactstrap';

import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';

import type {ActionBound, Dispatch} from 'src/_core/redux/types/index';
import action_Nav_RedirectUser from 'src/_redux/action/action_Nav/action_Nav_RedirectUser/index';

type propsCommandBarItem = {
	active?: boolean | null,
	children?: React.Node,
	disabled: boolean | null
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
		const {active, children, disabled} = this.props;
		return (
			<NavItem active={active || false} disabled={disabled}>
				{children}
			</NavItem>
		);
	}
}

class ComponentCommandBarItemAction extends Component<propCommandBarItemAction> {
	render() {
		const {active, children, onClick, disabled} = this.props;
		return (
			<NavItem active={active || false} disabled={disabled}>
				<a className={'nav-link'} onClick={onClick}>
					{children}
				</a>
			</NavItem>
		);
	}
}

class ComponentCommandBarItemNav extends Component<propsCommandBarItemNav> {
	render() {
		const {active, children, path, action_Nav_RedirectUser, disabled} = this.props;
		const action = () => {
			action_Nav_RedirectUser(path);
		};
		return <NavItem active={active || false} disabled={disabled}>
			<a className={'nav-link'} onClick={action}>
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
