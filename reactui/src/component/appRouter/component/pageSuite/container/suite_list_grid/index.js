import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {Card, CardBody, CardColumns, CardFooter, CardHeader, CardText, CardTitle,} from 'reactstrap';

import * as s from 'src/_core/res/strings';

type propsSuiteListGridElement = {
	formData: object,
	onFormClick: (Event) => any,
	onFormDoubleClick: (Event) => any,
};

export class SuiteListGridElement extends Component<propsSuiteListGridElement> {

	render() {

		const {
			onFormClick,
			onFormDoubleClick,
			formData,
			active,
		} = this.props;

		//compute how much to shrink the name
		let nameFontScalar = 1;
		if (formData && formData.name && formData.name.length > 0) {
			nameFontScalar = 1.2 -
				(0.001 * formData.name.length * formData.name.length);
			nameFontScalar = Math.max(nameFontScalar, 0.8);
		}

		return (
			<Card color={active ? 'primary' : 'info'}
			      outline={!active}
			      onClick={() => {
				      if (onFormClick)
					      onFormClick(formData.uuid);
			      }}
			      onDoubleClick={() => {
				      if (onFormDoubleClick)
					      onFormDoubleClick(formData.uuid);
			      }}
			      cssClass={'col-xs-6 col-sm-3 col-md-2'}>
				<CardHeader>
					<CardTitle>{formData.fileName}</CardTitle>
				</CardHeader>
				<CardBody className={'text-center'}>
					<h3><FontAwesome name='list-alt' icon='list-alt'/></h3>
					<CardText>{formData.fileType || s.DATA_TYPE_FORM}</CardText>
				</CardBody>
				<CardFooter>
					<p>{formData.id}</p>
					<p style={{
						fontStretch: 'condensed',
						fontSize: nameFontScalar + 'em',
						height: '4rem',
						overflowY: 'auto',
					}}>{formData.name || ''}</p>
				</CardFooter>
			</Card>);
	}

}

type propTypesSuiteListGrid = {
	formList: Array<any>,
	onFormClick: (Event) => any,
	onFormDoubleClick: (Event) => any,
};

export default class SuiteListGrid extends Component<propTypesSuiteListGrid> {

	render() {

		const {
			onFormClick,
			onFormDoubleClick,
			formList,
			suiteSelectedUUID,
		} = this.props;

		//Somehow no archive was loaded, typically an error
		if (formList === undefined || formList.map === undefined)
			return <h3>{s.ARCHIVE.UNDEFINED_ARCHIVE.INSTRUCTION}</h3>;

		//User creates a new archive
		if (formList.length === 0)
			return <Card>
				<CardHeader><CardTitle>{s.ARCHIVE.EMPTY.TITLE}</CardTitle>
				</CardHeader>
				<CardBody>
					<CardText>
						{s.ARCHIVE.EMPTY.INSTRUCTION}
					</CardText>
				</CardBody>
			</Card>;

		return (
			<div className="container-fluid">
				<CardColumns>
					{formList.map((form, index) => {
						return (
							<SuiteListGridElement
								formData={form}
								key={'formSuiteGrid' + index}
								onFormClick={onFormClick}
								onFormDoubleClick={onFormDoubleClick}
								active={form.uuid === suiteSelectedUUID}
							/>
						);
					})}
				</CardColumns>
			</div>
		);
	}
}
