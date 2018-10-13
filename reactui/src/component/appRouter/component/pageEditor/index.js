// @flow
import Crypto from 'crypto';
import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import {Button, Container,} from 'reactstrap';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';

import type {ActionBound, Dispatch} from 'src/_core/redux/types';
import type {ActionStatus} from 'src/_core/redux/types/actionStatus';
import * as s from 'src/_core/res/strings';
import action_Electron_SetTitle from 'src/_redux/action/action_Electron/action_Electron_SetTitle';

import action_Nav_RedirectUser from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import {CommandBarItemAction} from 'src/component/global/commandBar/component/commandBarItem';
import CommandBar from 'src/component/global/commandBar/index';
import ButtonSaveForm from './component/buttonSaveForm';

type propTypes = {
	action_Nav_RedirectUser: ActionBound,
	action_Electron_SetTitle: ActionBound,
	saveArchiveStatus: ActionStatus,
	saveArchiveError: ActionStatus,
	form: any
}

export const getContent = () => {
	const inputs: NodeList<any> =
		document.querySelectorAll('.ics_input');
	for (let i: any in inputs) {
		switch (inputs[i].type) {
			case 'text': {
				const input: HTMLInputElement = inputs[i];
				input.setAttribute('value', input.value);
				break;
			}
			case 'textarea': {
				const input: HTMLTextAreaElement = inputs[i];
				input.innerHTML = input.value;
				break;
			}
			case 'select-one': {
				const input: HTMLSelectElement = inputs[i];
				input.options[input.selectedIndex].setAttribute(
					'selected',
					'selected');
				break;
			}
			default:
				break;
		}
		//todo: validate content here
	}

	const formArea = document.querySelector('#FormContent');
	if (formArea !== null)
		return (formArea: HTMLElement).innerHTML;
	else
		return null;
};

class PageEditor extends Component<propTypes> {

	checkForNoChange = (): boolean => {
		let {form} = this.props;
		let content = getContent();
		let hashLive = Crypto.createHash('md5').
		                      update(JSON.stringify(content)).
		                      digest('hex');
		let hashOld = Crypto.createHash('md5').
		                     update(JSON.stringify(form.content)).
		                     digest('hex');
//    console.log(hashLive);
//    console.log(hashOld);
		return hashLive === hashOld;
	};

	onClick_returnToHome = () => {
		let {action_Nav_RedirectUser} = this.props;
		if (this.checkForNoChange()) {
			action_Nav_RedirectUser('/suite');
		} else {

			toast(({closeToast}): React.Element =>
				<Container fluid>
					<h3>
						{s.EDITOR.CURRENT_FILE_HAS_UNSAVED_CHANGES}
					</h3>
					<div>
						<Button color='primary'
						        block
						        onClick={closeToast}>{s.CANCEL}
						</Button>
						<Button color='warning'
						        block
						        onClick={() => {
							        action_Nav_RedirectUser('/suite');
							        closeToast();
						        }}>{s.EDITOR.UNSAVED_CHANGES_DISCARD}
						</Button>
					</div>
				</Container>, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 60000,
				closeButton: false,
				draggable: false,
				draggablePercent: 50,
				type: toast.TYPE.WARNING,
				closeOnClick: false,
				bodyClassName: 'grow-font-size',
			});
		}
	};

	render() {

		const {
			action_Nav_RedirectUser,
			action_Electron_SetTitle,
		} = this.props;

		let {form} = this.props;
		if (form === undefined) {
			toast.error('Please select a form before entering the editor.');
			action_Nav_RedirectUser('/suite');
		} else {
			try {
				action_Electron_SetTitle('Editing (' + form.id + ') ~ "' + form.name + '"');
			} catch (e) {

			}
			return (
				<div className='spa-page'>
					<CommandBar>
						<CommandBarItemAction
							onClick={this.onClick_returnToHome}>Back</CommandBarItemAction>
						<ButtonSaveForm/>
					</CommandBar>
					<div
						id='FormContent'
						dangerouslySetInnerHTML={{__html: form.content}}>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {

	const {
		archive,
		saveArchiveStatus,
		saveArchiveError,
		suiteSelectedUUID,
	} = state.archiveStore;
	const form = archive.find(f => f.uuid === suiteSelectedUUID);
	return {
		formsStore: state.formsStore,
		archiveStore: state.archiveStore,
		form,
		saveArchiveStatus,
		saveArchiveError,
	};

};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return thunkBindActionCreators({
		action_Nav_RedirectUser,
		action_Electron_SetTitle,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageEditor);
