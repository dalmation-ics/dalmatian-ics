// @flow

import {createBrowserHistory} from 'history';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {RouterHistory} from 'react-router-dom';
import {Redirect, Route, Router} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Nav, Navbar, NavItem, NavLink} from 'reactstrap';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import type {Dispatch} from 'src/_core/redux/types';
import action_NavigationPathChange from 'src/_redux/action/action_Nav/action_Nav_PathChange';
import action_RedirectUser from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import {SettingsButton, SettingsModal} from 'src/component/settingsPanel';

import {ThemeApplicator} from 'src/component/settingsPanel/component/settingsPanelComponent/theme_selector';

import LegalPanel from '../legalPanel';
import PageAddForm from './component/pageAddForm';
import PageEditor from './component/pageEditor';
import PageMenuMain from './component/pageMenuMain';
import PageSuite from './component/pageSuite';

/**
 * Create the history for use in router
 * It is being initialized outside of the component so that a new history is not being created each render
 */
export const history: RouterHistory = createBrowserHistory();

type Props = {
	redirectTarget: null | string,
	suiteSelectedUUID: null | string,
};

class AppRouter extends Component<Props> {
	constructor(props) {
		super(props);

		/**
		 * Add a listener to the history so that we can
		 * tell Redux when the user has changed pages
		 *
		 * !Potential bug here as there may exist circumstances where constructor is called twice
		 * If this occurs there will be two action_PathChanges() disptached at the same time
		 * This can be observed in console using Redux Logger.!
		 *
		 */
		const {action_NavigationPathChange} = props;
		history.listen((location) => {
			const {pathname} = location;
			action_NavigationPathChange(pathname);
		});
	}

	render() {
		const {
			suiteSelectedUUID,
			redirectTarget,
		} = this.props;
		return (
			<ThemeApplicator>
				<Router history={history}>
					<div>
						{redirectTarget && <Redirect to={redirectTarget}/>}
						<LegalPanel/>
						<Navbar color='faded' dark>
							<Nav>
								<NavItem>
									<NavLink to="/">Dalmation ICS</NavLink>
								</NavItem>
								<SettingsButton/>
							</Nav>
						</Navbar>
						<hr/>
						<ToastContainer/>
						<SettingsModal/>

						<Route exact path="/" component={PageMenuMain}/>
						<Route path="/suite" component={PageSuite}/>
						<Route path="/addForm" component={PageAddForm}/>
						<Route path='/editor' render={() => {

							if (!suiteSelectedUUID)
								return <Redirect to={'/'}/>;
							else
								return <PageEditor/>;
						}}/>
					</div>
				</Router>
			</ThemeApplicator>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return thunkBindActionCreators({
		action_NavigationPathChange,
		action_RedirectUser,
	}, dispatch);
};

const mapStateToProps = (state) => {
	return {
		suiteSelectedUUID: state.archiveStore.suiteSelectedUUID,
		redirectTarget: state.navStore.redirectTarget,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
