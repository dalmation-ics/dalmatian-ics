import React, {Component} from 'react';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import {connect} from 'react-redux';
import {Alert, Button, FormGroup} from 'react-bootstrap';
import {toast} from 'react-toastify';
import LegalAgreement from 'src/_core/global/legal_agreement';
import * as s from 'src/_core/res/strings';

class SettingsLegal extends Component {

    static onClick_ShowLegalAgreement = () => {
        toast(({closeToast}) =>
            <div>
                <h3>Legal Agreement</h3>
                <LegalAgreement/>
                <button className='btn btn-primary'
                        onClick={closeToast}>
                    Close
                </button>
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

export default SettingsLegal;

// const mapStateToProps = (state) => {
//     const {} = state;
//     return {};
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return thunkBindActionCreators({}, dispatch);
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(SettingsLegal);
