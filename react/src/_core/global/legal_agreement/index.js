// @flow
import React, {Component} from 'react';

export const LAST_LEGAL_UPDATE = new Date(2018, 7, 20, 18, 0);

class LegalAgreement extends Component<{}> {

  render() {
    return (
        <div>
          <p>
            By continuing to use this software I acknowledge and
            agree that the current members and former members of
            the Dalmatian ICS team are providing <em>Dalmatian ICS </em>
            software on an “as is” and “as available”
            basis, and that my use and reliance upon any third
            party content and services accessed thereby is at my
            sole risk and discretion.
          </p>
        </div>
    );
  }
}

export default LegalAgreement;
