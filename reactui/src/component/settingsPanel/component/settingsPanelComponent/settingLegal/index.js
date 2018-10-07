import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import {Button, FormGroup} from 'reactstrap';
import LegalAgreement from 'src/_core/global/legal_agreement';

class SettingsLegal extends Component {

	static onClick_ShowLegalAgreement = () => {
		toast(({closeToast}) =>
			<div>
				<h3>Legal Agreement</h3>
				<LegalAgreement/>
				<Button color={'primary'}
				        onClick={closeToast}>
					Close
				</Button>
			</div>, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 60000,
			closeButton: false,
			draggable: false,
			draggablePercent: 50,
			type: toast.TYPE.INFO,
			closeOnClick: false,
		});
	};

	render() {

		return (
			<div className={'panel panel-primary'}>
				<h3 className={'panel-heading'}>Legal</h3>
				<FormGroup>
					<button
						onClick={SettingsLegal.onClick_ShowLegalAgreement}
					>
						Legal Agreement
					</button>
				</FormGroup>
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	const {} = state;
	return {};
};

export default connect(mapStateToProps)(SettingsLegal);
