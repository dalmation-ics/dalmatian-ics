// @flow
import {RESPONSE_POSTFIX} from 'src/_core/contract/_general';
import electron from '../index';

export default {

	prompt: (
		name: string,
		callback: (any, any) => void | null,
		args: Array<string> | any,
	) => {
		console.groupCollapsed(
			'%c[AppBridge] ' +
			`%csending ` +
			`%c${name}`,
			'color:magenta',
			'color:grey',
			'',
		);
		console.log(`[Args] ${args && args.length > 0 ? args.join(',') : '[]'}`);
		console.groupEnd();
		electron.ipcRenderer.once(name + RESPONSE_POSTFIX,
			(event, {err, result}) => {
				console.groupCollapsed(
					'%c[AppBridge] ' +
					'%creceived ' +
					`%c${name}${RESPONSE_POSTFIX} ` +
					`%c[${err ? 'Error' : 'Success'}]`,
					'color:magenta',
					'color:grey',
					'',
					err ? 'color:red' : 'color:green',
				);

				console.groupCollapsed('[Result]');
				console.log(result);
				console.groupEnd();

				console.groupCollapsed('[Error]');
				console.log(err);
				console.groupEnd();

				console.groupEnd();
				callback && callback(err, result);
			});
		electron.ipcRenderer.send(name, args);
	},

	promptSync: (name: string, args: Array<string> | any) => {
		console.groupCollapsed(
			'%c[AppBridge] ' +
			'%csending sync ' +
			`%c${name}`,
			'color:magenta',
			'color:grey',
			'',
		);
		console.log(`[Args] ${args && args.length > 0 && args.join !== undefined ?
			args.join(',') :
			'[]'}`);
		console.groupEnd();
		const response = electron.ipcRenderer.sendSync(name, args);
		const {err, result} = response;
		console.groupCollapsed(
			'%c[AppBridge] ' +
			'%creceived sync ' +
			`%c${name} ` +
			`%c[${err ? 'Error' : 'Success'}]`,
			'color:magenta',
			'color:grey',
			'',
			err ? 'color:red' : 'color:green',
		);

		console.groupCollapsed('[Result]');
		console.log(result);
		console.groupEnd();

		console.groupCollapsed('[Error]');
		console.log(err);
		console.groupEnd();

		console.groupEnd();
		return response;
	},

	register: (
		name: string, action: (() => any, Array<string> | any) => any) => {
		electron.ipcRenderer.on(name, (event, args) => {
			console.log(`Received ${name}`);
			action((err, result) => {

				if (err)
					console.log(err);

				const out = {
					err,
					result,
				};

				console.log(`Sending ${name}${RESPONSE_POSTFIX}`);
				event.sender.send(name + RESPONSE_POSTFIX, out);
			}, args);
		});
	},

	registerSync: (name: string, action: any) => {
		electron.ipcRenderer.on(name, (event, args) => {
			console.log(`Received ${name}`);
			action((err, result) => {

				if (err)
					console.log(err);

				const out = {
					err,
					result,
				};

				console.log(`Sending Sync ${name}${RESPONSE_POSTFIX}`);
				event.returnValue = out;
			}, args);
		});
	},

};
