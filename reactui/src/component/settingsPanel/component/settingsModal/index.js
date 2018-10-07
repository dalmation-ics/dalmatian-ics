// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane
} from 'reactstrap';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';
import action_UI_ToggleSettingsMenu from 'src/_redux/action/action_UI/action_UI_ToggleSettingsMenu/index';
import SettingsPanelComponentList, {type SettingsPanelSection} from '../settingsPanelComponent';

class MenuSettings extends Component<{
	action_UI_ToggleSettingsMenu: ActionBound,
	settingsMenuOpen: boolean,
}, {
	activeTab: number
}> {
	state = {
		activeTab: 1,
	};
	static settingsItemList = () => {
		if (SettingsPanelComponentList === null ||
			SettingsPanelComponentList === undefined) {
			return [];
		}
		return SettingsPanelComponentList;
	};

	toggle(tab: number) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab,
			});
		}
	}

	wrapSettingsPanelCell = (section: SettingsPanelSection, index) => {
		const Content = section.BodyComponent;
		return <TabPane name={index}
		                tabId={index}
		                key={'settingsPanelComponentCell_' + index}
		>
			{Content}
		</TabPane>;
	};

	makeTabHeader = (section: SettingsPanelSection, index) => {
		return <NavItem key={'settingsPanelTabNavItem_' + index}>
			<NavLink
				key={'settingsPanelTabNavLink_' + index}
				active={this.state.activeTab === index}
				onClick={() => {
					this.toggle(index);
				}}
			>
				{section.title}
			</NavLink>
		</NavItem>;
	};

	makeSettingsComponentList = (list) => {
		return list.map((w, i) => {
			return this.wrapSettingsPanelCell(w, i);
		});

	};

	makeTabHeaderList = (list) => {
		return list.map((w, i) => {
			return this.makeTabHeader(w, i);
		});
	};

	render() {

		const {
			settingsMenuOpen,
		} = this.props;
		const {
			action_UI_ToggleSettingsMenu,
		} = this.props;
		const list = MenuSettings.settingsItemList();

		return (
			<Modal size={'lg'} style={{maxWidth: '90%', height: '90vh'}}
			       className={'h-100'}
			       isOpen={settingsMenuOpen}
			       toggle={() => {
				       action_UI_ToggleSettingsMenu();
			       }}>
				<ModalHeader>
					Settings
				</ModalHeader>
				<ModalBody>
					<div className={'row'}>
						<div className={'col-12 col-md-3 col-lg-2'}>
							<Nav tabs>
								{this.makeTabHeaderList(list)}
							</Nav>
						</div>
						<div className={'col-12 col-md'}>
							<TabContent
								activeTab={this.state.activeTab}>
								{this.makeSettingsComponentList(list)}
							</TabContent>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button size={'lg'} onClick={() => {
						action_UI_ToggleSettingsMenu(false);
					}}>Close</Button>
				</ModalFooter>
			</Modal>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		settingsMenuOpen: state.uiStore.settingsMenuOpen,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return thunkBindActionCreators({
		action_UI_ToggleSettingsMenu,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuSettings);

