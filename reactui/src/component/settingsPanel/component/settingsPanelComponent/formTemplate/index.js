// @flow
import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, CardTitle,} from 'reactstrap';

import RepoSelector from './component/repoSelector';

class formTemplateConfig extends Component<{}> {

	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						<CardTitle>Form template settings</CardTitle>
					</CardHeader>
					<CardBody>
						<p>
							Form repo selector (chooses where to download forms from)
						</p>
						<RepoSelector/>
						<p>
							Form download selector (chooses what forms to download)
						</p>
					</CardBody>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = () => {
	return {};
};

export default connect(mapStateToProps)(formTemplateConfig);
