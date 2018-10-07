// @flow
import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';
import type {ActionStatus} from 'src/_core/redux/types/actionStatus';

import action_Archive_Item_Update from 'src/_redux/action/action_Archive_Item/action_Archive_Item_Update';
import {CommandBarItemAction} from 'src/component/global/commandBar/component/commandBarItem';

import {getContent} from '../../index';
import SaveIndicator from './container/save_indicator';

type propTypes = {
	action_Archive_Item_Update: ActionBound,
	action_Electron_SetTitle: ActionBound,
	saveArchiveStatus: ActionStatus,
	saveArchiveError: ActionStatus,
	form: any
}

class ButtonSaveForm extends Component<propTypes> {

	requiredFieldsFilled = () => {
		const requiredFields: any = document.querySelectorAll('[required]');
		let allFilled = true;
		for (let i in requiredFields) {
			if (requiredFields.hasOwnProperty(i)) {
				const req = (requiredFields[i].value + '').trim();
				if (req === '' || req === null) {
					requiredFields[i].value = '';
					allFilled = false;
				}
			}
		}
		return allFilled;
	};

	onClick_Save = () => {
		const {action_Archive_Item_Update} = this.props;
		const reqCheck = this.requiredFieldsFilled();
		if (reqCheck) {
			let content = getContent();
			action_Archive_Item_Update(content).then(() => {
				toast.success('Form changes saved');
			}).catch(toast.error);
		} else {
			toast(({closeToast}): React.Element => {
				return <div>
					<h3>You have unfilled Required fields!</h3>
					<button className='btn btn-primary'
					        onClick={closeToast}>Close
					</button>
				</div>;
			}, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 60000,
				closeButton: false,
				draggable: false,
				draggablePercent: 50,
				type: toast.TYPE.WARNING,
				closeOnClick: false,
			});
		}

	};

	render() {
		const {
			saveArchiveStatus,
			saveArchiveError,
		} = this.props;
		return (
			<CommandBarItemAction onClick={this.onClick_Save}><SaveIndicator
				saveArchiveStatus={saveArchiveStatus}
				saveArchiveError={saveArchiveError}/></CommandBarItemAction>
		);
	}
}

const mapStateToProps = (state) => {

	const archive = state.archiveStore.archive;
	const selectedUUID = state.archiveStore.suiteSelectedUUID;
	const form = archive.find(f => f.uuid === selectedUUID);
	const saveArchiveStatus = state.archiveStore.saveArchiveStatus;
	const saveArchiveError = state.archiveStore.saveArchiveError;
	return {
		form,
		saveArchiveStatus,
		saveArchiveError,
	};

};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return thunkBindActionCreators({
		action_Archive_Item_Update,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonSaveForm);
