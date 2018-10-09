// @flow
import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import '../../public/css/dark.css';
import '../../public/css/normal.css';
import '../../public/css/themeApplicator.css';
import type {Theme} from '../../types';

class ThemeApplicator extends Component<{
	theme: Theme,
	children: React.Node
}> {

	render() {
		let cssClass = 'themeApplicator themeApplicator_default';
		if (this.props.theme !== undefined && this.props.theme !== null)
			cssClass = 'themeApplicator themeApplicator_' + this.props.theme.name;

		return (
			<div className={cssClass}>
				{this.props.children}
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	const {theme} = state.uiStore;
	return {
		theme,
	};
};

export default connect(mapStateToProps)(ThemeApplicator);
