// @flow
import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, CardTitle,} from 'reactstrap';

import action_FormTemplate_SelectRepository
	from 'src/_redux/action/action_FormTemplate/action_FormTemplate_SelectRepository';

import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';

const defaultSelectValue = 'DEFAULT';

type state = {
	selected: string
};

type propTypes = {
	selectedRepositoryUrl: string | null,
	action_FormTemplate_SelectRepository: ActionBound
};

class RepoSelector extends Component<propTypes, state> {
	constructor() {
		super();
		this.state = {
			selected: defaultSelectValue
		};
	}

	render() {
		let {selectedRepositoryUrl} = this.props;
		return (
			<div>
				<Card>
					<CardHeader>
						<CardTitle>Form repository</CardTitle>
					</CardHeader>
					<CardBody>
						<p>{selectedRepositoryUrl || 'Use the default repository'}</p>
					</CardBody>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {selectedRepositoryUrl} = state.archiveStore;
	return {selectedRepositoryUrl};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return thunkBindActionCreators({action_FormTemplate_SelectRepository}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoSelector);
