import * as _ from 'lodash';
// @flow
import * as React from 'react';
import {Provider} from 'react-redux';
import {toast} from 'react-toastify';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {ACT_LOAD_STATE} from 'src/_core/contract/stateBridge';
import ipcRWrapper from 'src/_core/electron/ipcWrapper';
import action_Archive_Suite_CheckPassedFile
	from 'src/_redux/action/action_Archive_Suite/action_Archive_Suite_CheckPassedFile';
import action_FormTemplate_GetFormsIndex from 'src/_redux/action/action_FormTemplate/action_FormTemplate_GetFormsIndex';
import allReducers from 'src/_redux/reducer';
import {ACT_SAVE_STATE} from '../../_core/contract/stateBridge';

//redux middleware
const middleware = applyMiddleware(
	thunk,
	createLogger({
		collapsed: true, // Collapse the log in the console by default
		diff: true, // Log the differences between the previous and the new state
		predicate: (getState, action) => action.type.substr(0, 12) !==
			'@@redux-form', // Don't log actions dispatched by redux-form (too many).
	}),
);
let store;

export function initializeStore() {

	store = checkAndLoadSavedState();
	dispatchFormDataCheck();
}

type Props = {
	children?: React.Node,
};

class AppReduxProvider extends React.Component<Props> {
	render() {
		return (
			<Provider store={store}>
				{this.props.children}
			</Provider>
		);
	}
}

function checkAndLoadSavedState() {

	/**
	 * Check to see if there is a saved state
	 */
	let savedState = {};
	try {
		const loadedStateResponse = ipcRWrapper.promptSync(ACT_LOAD_STATE);
		if (!loadedStateResponse.err && loadedStateResponse.result !== false) {
			savedState = loadedStateResponse.result;
			savedState.navStore.redirectTarget = savedState.navStore.path;
			if (_.get(savedState, 'archiveStore.suiteSelectedUUID') !== null)
				savedState.navStore.suiteSelectedUUID = null;
			toast.info('Welcome back', {autoClose: 1300});
		} else {
			throw new Error('No state saved');
		}
	}
	catch (exc) {
		toast.info('Welcome', {autoClose: 1300});
		savedState = {
			navStore: {
				redirectTarget: '/',
			},
		};
	}

	/**
	 * Be ready to save state when electron is closing
	 */
	ipcRWrapper.register(ACT_SAVE_STATE, (callback) => {
		console.log('registering ' + ACT_SAVE_STATE);
		callback(null, store.getState());
	});

	/**
	 * Create the store for use in Redux
	 */
	return createStore(allReducers, savedState, middleware);
}

function dispatchFormDataCheck() {
	store.dispatch(action_FormTemplate_GetFormsIndex()).then(() => { // Get form index
		store.dispatch(action_Archive_Suite_CheckPassedFile()).catch(e => {
			console.log(e);
			return e;
		}); // Check for passed file
	});
}

export default AppReduxProvider;
