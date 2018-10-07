// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEnglishTimeSince} from 'src/_core/moment/MomentUtil';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import actionStatus from 'src/_core/redux/types/actionStatus';
import * as s from 'src/_core/res/strings';

import action_FormTemplate_CancelCheckForUpdates
	from 'src/_redux/action/action_FormTemplate/action_FormTemplate_CancelCheckForUpdates';
import action_FormTemplate_CancelUpdateForms
	from 'src/_redux/action/action_FormTemplate/action_FormTemplate_CancelUpdateForms';
import action_FormTemplate_CheckForUpdates
	from 'src/_redux/action/action_FormTemplate/action_FormTemplate_CheckForUpdates';
import action_FormTemplate_UpdateForms from 'src/_redux/action/action_FormTemplate/action_FormTemplate_UpdateForms';
import action_UI_ToggleUpdatePanel from 'src/_redux/action/action_UI/action_UI_ToggleUpdatePanel';
import type {ActionBound, Dispatch} from '../../../../_core/redux/types';
import './public/style.css';

class UpdatePanel extends Component<{
	style: string | Object | CSSStyleDeclaration | null,
	formTemplateStore: any,
	uiStore: any,
	action_FormTemplate_CancelCheckForUpdates: ActionBound,
	action_FormTemplate_CheckForUpdates: ActionBound,
	action_FormTemplate_UpdateForms: ActionBound,
	action_FormTemplate_CancelUpdateForms: ActionBound,
	action_UI_ToggleUpdatePanel: ActionBound,
}> {

	render() {

		const style = this.props.style || {
			position: 'fixed',
			bottom: '0px',
			right: '2%',
		};
		const {
			formTemplateStore,
			uiStore,
		} = this.props;
		const {
			action_FormTemplate_CancelCheckForUpdates,
			action_FormTemplate_CheckForUpdates,
			action_FormTemplate_UpdateForms,
			action_FormTemplate_CancelUpdateForms,
			action_UI_ToggleUpdatePanel,
		} = this.props;

		const isUpdating = formTemplateStore.updateFormsStatus ===
			actionStatus.STARTED;
		const isCheckingForUpdates = formTemplateStore.checkForUpdatesStatus ===
			actionStatus.STARTED;
		const updateError = formTemplateStore.updateFormsStatus ===
			actionStatus.ERROR;
		const checkUpdateError = formTemplateStore.checkForUpdatesStatus ===
			actionStatus.ERROR;

		let display;
		let message;
		let buttonMessage;
		let buttonClass = 'btn ';
		let panelClass = 'updatePanel panel ';
		if (!isUpdating && !isCheckingForUpdates) {
			switch (formTemplateStore.updatesAvailable) {
				case true: { // Updates are available
					panelClass += 'panel-warning';
					buttonClass += 'btn-warning';
					display = s.UPDATES_AVAILABLE;
					message = s.UPDATES_AVAILABLE;
					buttonMessage = s.UPDATE;
					break;
				}
				case false: { // Updates are not available
					panelClass += 'panel-primary';
					buttonClass += 'btn-default';

					const timeDisplay: any = getEnglishTimeSince(
						formTemplateStore.lastCheckForUpdate);
					if (timeDisplay === 'Today') {
						display = s.NO_UPDATES_AVAILABLE;
					} else {
						display = `Last Checked ${timeDisplay}`;
					}

					message = s.NO_UPDATES_AVAILABLE;
					buttonMessage = s.CHECK_FOR_UPDATES;
					break;
				}
				default: { // Unknown if updates are available
					panelClass += 'panel-warning';
					buttonClass += 'btn-default';
					display = s.NEVER_CHECKED_FOR_UPDATES;
					message = s.NEVER_CHECKED_FOR_UPDATES;
					buttonMessage = s.CHECK_FOR_UPDATES;
					break;
				}
			}
		} else {
			display = isCheckingForUpdates ?
				s.CHECKING_FOR_UPDATES :
				s.UPDATING;
			message = isCheckingForUpdates ?
				s.CHECKING_FOR_UPDATES :
				s.UPDATING;
			panelClass += 'panel-warning';
			buttonClass += 'btn-danger';
			buttonMessage = s.CANCEL;
		}

		if (updateError || checkUpdateError) {
			panelClass = 'updatePanel panel panel-danger';
			display = 'Error';
			message = formTemplateStore.checkForUpdatesError ||
				formTemplateStore.updateFormsError;
		}

		return (
			<div className={panelClass} style={style}>
				<div testid="UpdatePanelHeading" className="panel-heading"
				     onClick={() => {
					     action_UI_ToggleUpdatePanel();
				     }}>
					{display}
				</div>
				{uiStore.updatePanelOpen && (
					<div className="panel-body text-center">
						<p testid="UpdatePanelDisplay">
							{message}
						</p>
						<button
							testid="UpdatePanelButtonUpdate"
							className={buttonClass}
							onClick={() => {
								if (isCheckingForUpdates) {
									action_FormTemplate_CancelCheckForUpdates();
								} else {
									if (formTemplateStore.updatesAvailable) {
										if (isUpdating) {
											action_FormTemplate_CancelUpdateForms();
										} else {
											action_FormTemplate_UpdateForms();
										}
									} else {
										action_FormTemplate_CheckForUpdates();
									}
								}
							}}
						>
							{buttonMessage}
						</button>
					</div>
				)}
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		formTemplateStore: state.formTemplateStore,
		uiStore: state.uiStore,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return thunkBindActionCreators({
		action_FormTemplate_CancelCheckForUpdates,
		action_FormTemplate_CheckForUpdates,
		action_FormTemplate_UpdateForms,
		action_FormTemplate_CancelUpdateForms,
		action_UI_ToggleUpdatePanel,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePanel);
