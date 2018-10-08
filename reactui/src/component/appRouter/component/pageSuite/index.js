// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Jumbotron, Row} from 'reactstrap';
import uuid from 'uuid';

import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';

import type {ActionBound, Dispatch} from 'src/_core/redux/types';
import * as s from 'src/_core/res/strings';

import action_Archive_Item_Duplicate from 'src/_redux/action/action_Archive_Item/action_Archive_Item_Duplicate';
import action_Archive_Item_Select from 'src/_redux/action/action_Archive_Item/action_Archive_Item_Select';
import action_Archive_Suite_Blank from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Blank';
import action_Archive_Suite_Load from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_Load';
import action_Archive_Suite_ShowFileInFolder
	from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_ShowFileInFolder';
import action_Nav_RedirectUser from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';

import {CommandBarItemAction, CommandBarItemNav,} from 'src/component/global/commandBar/component/commandBarItem';
import CommandBar, {SideBar} from 'src/component/global/commandBar/index';
import {ButtonSuiteItemDelete, ButtonSuiteItemRename} from './component';
import SuiteListGrid from './container/suite_list_grid';

type props = {
	filePath: null | string,
	archive?: Array<any>,
	suiteSelectedUUID: uuid.v4 | uuid.v6 | string | null,
	action_Archive_Item_Select: ActionBound,
	action_Nav_RedirectUser: ActionBound,
	action_Archive_Item_Duplicate: ActionBound,
	action_Archive_Suite_ShowFileInFolder: ActionBound
}

class PageSuite extends Component<props> {

	static createSideBar = (props: props) => {

		let {
			filePath,
			archive,
			suiteSelectedUUID,
			action_Nav_RedirectUser,
			action_Archive_Item_Duplicate,
		} = props;

		if (archive === undefined) {
			action_Nav_RedirectUser('/');
			return null;
		}

		const selectedFile = archive.find(f => f.uuid === suiteSelectedUUID);

		const subtitle = selectedFile !== undefined ?
			(selectedFile.fileName + ' (' + selectedFile.id + ')') :
			s.NO_FORM_SELECTED;

		return <SideBar title={filePath}
		                subtitle={subtitle}>
			<hr/>
			{/* Rename */}
			{suiteSelectedUUID && <ButtonSuiteItemRename/>}

			{/* Delete */}
			{suiteSelectedUUID && <ButtonSuiteItemDelete/>}

			{/* Duplicate */}
			{suiteSelectedUUID && <CommandBarItemAction
				glyph={'duplicate'}
				onClick={action_Archive_Item_Duplicate}
			>{s.DUPLICATE}</CommandBarItemAction>}

			{/* Edit */}
			{suiteSelectedUUID && <CommandBarItemNav
				glyph={'edit'}
				path={'/editor'}
			>{s.EDIT}</CommandBarItemNav>}
		</SideBar>;

	};

	render() {
		const {
			suiteSelectedUUID,
			archive,
			action_Archive_Item_Select,
			action_Archive_Suite_ShowFileInFolder,
			filePath,
		} = this.props;

		const onClick_fileInFolder = () => {
			action_Archive_Suite_ShowFileInFolder(filePath);
		};

		return (
			<div>
				<CommandBar>
					<CommandBarItemNav path={'/'}>Menu</CommandBarItemNav>
					{filePath !== undefined && <CommandBarItemAction
						onClick={onClick_fileInFolder}>
						{s.SHOW_ARCHIVE_IN_FOLDER}
					</CommandBarItemAction>}
				</CommandBar>
				<Row noGutters>
					<Col xs={7} sm={8} md={9}>
						<div className={'container-fluid'}>
							<Jumbotron fluid>
								<SuiteListGrid formList={archive}
								               onFormClick={action_Archive_Item_Select}
								               suiteSelectedUUID={suiteSelectedUUID}/>
							</Jumbotron>
						</div>
					</Col>
					<Col xs={5} sm={4} md={3}>
						{PageSuite.createSideBar(this.props)}
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	let isArchiveLoaded = state.archiveStore.archive !== undefined &&
		Array.isArray(state.archiveStore.archive) &&
		state.archiveStore.archive.length > 0;
	const {archive, filePath, suiteSelectedUUID} = state.archiveStore;
	return {isArchiveLoaded, archive, filePath, suiteSelectedUUID};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return thunkBindActionCreators({
		action_Archive_Suite_Blank,
		action_Nav_RedirectUser,
		action_Archive_Suite_Load,
		action_Archive_Item_Select,
		action_Archive_Item_Duplicate,
		action_Archive_Suite_ShowFileInFolder
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSuite);
