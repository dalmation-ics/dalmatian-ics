//@flow
import React, {Component} from 'react';
import actionStatusCode, {type ActionStatus} from 'src/_core/redux/types/actionStatus';
import * as s from 'src/_core/res/strings';

type propTypes = {
  saveArchiveStatus: ActionStatus,
  saveArchiveError: ActionStatus,
};

class SaveIndicator extends Component<propTypes> {

  render() {
    const animationStyle = {
      transition: 'width 0.75s cubic-bezier(0.000, 0.795, 0.000, 1.000)',
    };
    const {
      saveArchiveStatus,
      saveArchiveError,
    } = this.props;

    switch (saveArchiveStatus) {
      case actionStatusCode.STARTED:
        return <span style={animationStyle}
                     className='badge badge-warning'>{s.SAVE_IN_PROGRESS}</span>;
      case actionStatusCode.ERROR:
        return <span style={animationStyle}>
                    <span className='badge badge-danger'>{s.SAVE_ERROR}</span>
          {saveArchiveError}
                </span>;
      default:
        return <span style={animationStyle}>{s.SAVE}</span>;
    }
  };
}

export default SaveIndicator;
