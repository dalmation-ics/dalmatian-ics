import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import * as actionStatus from 'src/_core/redux/actionStatus';

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
