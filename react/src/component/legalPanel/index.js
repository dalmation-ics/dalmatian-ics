// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import LegalAgreement, {LAST_LEGAL_UPDATE} from 'src/_core/global/legal_agreement';

import action_UI_AcceptLegal
  from 'src/_redux/action/action_UI/action_UI_AcceptLegal';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';

type propTypes = {
  action_UI_AcceptLegal: ActionBound,
  acceptLegal: Date | null
}

class LegalPanel extends Component<propTypes> {

  render() {

    const {
      acceptLegal,
      action_UI_AcceptLegal,
    } = this.props;

    const legalUpToDate = (acceptLegal != null) && (acceptLegal >
        LAST_LEGAL_UPDATE);
    console.log(acceptLegal, LAST_LEGAL_UPDATE);

    return (
        <div>
          <Modal isOpen={!legalUpToDate} size={'lg'}
                 toggle={() => {
                 }}>
            <div>{acceptLegal || 'never'}</div>
            <ModalHeader>
              Legal Disclaimer
            </ModalHeader>
            <p>woah</p>
            <ModalBody>
              <LegalAgreement/>
            </ModalBody>
            <ModalFooter>
              <Button
                  className="btn-primary"
                  onClick={action_UI_AcceptLegal}
              >
                I Accept
              </Button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }

}

const mapStateToProps = (state) => {
  const acceptLegal = state.uiStore.acceptedLegal;
  return {
    acceptLegal,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_UI_AcceptLegal,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalPanel);
