// @flow
import type Electron from 'electron';
// Assign electron to an empty object so that the default export points to this object
let electron: Electron
	= {
	ipcRenderer: {
		send: (
			name: string | any | null, args?: any,
			callback?: (string | any | null) => any) => {
			console.log('Stub');
		},
		sendSync: (name: string | any | null, args?: any) => {
			console.log('Stub');
			return {err: '', result: ''};
		},
		on: (
			name: string | any | null, args?: any,
			callback?: (string | any | null) => any) => {
			console.log('Stub');
		},
		once: (
			name: string | any | null, args?: any,
			callback?: (string | any | null) => any) => {
			console.log('Stub');
		},
	},
};

export const initialize = () => {

	if (window.require) {
		let _electron = window.require('electron');
		if (_electron) {
			// Fill the exported object with the properties of electron, this allows us to change the contents of default export
			Object.assign(electron, _electron);
		}
	}

	// If require('electron') does not yield, it is probably because the react application is being run in a browser
	if (Object.keys(electron).length === 0)
		throw new Error(
			'Electron does not exist in this context. Is React running in Electron?');

};

export default electron;
