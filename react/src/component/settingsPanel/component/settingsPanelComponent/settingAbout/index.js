// @flow
import React, {Component} from 'react';

class SettingAbout extends Component<{}> {

  render() {
    return (
        <div className={'panel panel-primary'}>
          <h3 className={'panel-heading'}>Credits</h3>
          <div className={'panel-body'}>
            <h4>Bellevue College BC ICS team</h4>
            <p>
              BC ICS was originally developed by Bellevue Colllege
              students from the Bachelors of Applied Science in IST:
              Application Development. It was developed as part of the
              2018 graduating class' capstone in concert with Eastside
              Fire & Rescure.
            </p>
            <h4>Graphics credits</h4>
            <ul>
              <li>Font Awesome</li>
              <li>Bootstrap 3</li>
            </ul>
          </div>
        </div>
    );
  }
}

export default SettingAbout;
