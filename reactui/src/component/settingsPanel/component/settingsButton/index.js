// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';
import action_UI_ToggleSettingsMenu from 'src/_redux/action/action_UI/action_UI_ToggleSettingsMenu';

class SettingsButton extends Component<{
	action_UI_ToggleSettingsMenu: ActionBound,
}> {

	render() {
		const {
			action_UI_ToggleSettingsMenu,
		} = this.props;

		return (
			<Button onClick={() => {
				action_UI_ToggleSettingsMenu();
			}}>Settings</Button>
		);
	}

}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return thunkBindActionCreators({
		action_UI_ToggleSettingsMenu,
	}, dispatch);
};

export default connect(null, mapDispatchToProps)(SettingsButton);

