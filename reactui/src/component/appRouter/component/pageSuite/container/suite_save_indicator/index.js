import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as actionStatus from 'src/_core/redux/actionStatus';
import {Glyphicon} from 'react-bootstrap'

class SuiteSaveIndicator extends Component {

    static propTypes = {
        saveArchiveStatus: PropTypes.string,
        saveArchiveError: PropTypes.string,
    };

    render() {

        const {
            saveArchiveStatus,
        } = this.props;

        function buildButton(message) {
            return (
                <span>
                    <Glyphicon glyph="floppy-disk"/>
                    {message}
                </span>
            );
        }

        switch (saveArchiveStatus) {
            case actionStatus.STARTED:
                return buildButton('Saving');
            default:
                return buildButton('Save');
        }

    };
}

export default SuiteSaveIndicator;
