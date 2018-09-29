import IpcMain = Electron.IpcMain;
import {ipcMain} from 'electron';
import BrowserWindow = Electron.BrowserWindow;
import {RESPONSE_POSTFIX} from '../_core/contract/_general';
import {ErrorFirstCallback} from '../type/Callbacks';
import * as strings from '../_core/res/strings';

const {version} = require('../../../package.json');

export default class IpcWrapper {

    public window: BrowserWindow;
    public appTitle: string = strings.APP_TITLE + ((version !== undefined) && (' ' + version));

    ipcMain: IpcMain;

    constructor(window: BrowserWindow) {
        this.window = window;
        this.ipcMain = ipcMain;
    }

    register(name: string, action: (callback: ErrorFirstCallback, args: any) => void) {
        this.ipcMain.on(name, (event: any, args: any) => {
            console.log(`Received ${name}`);
            action((err, result) => {

                if (err)
                    console.log(err);

                const out = {
                    err: err ? err.message : null,
                    result
                };

                console.log(`Sending ${name}${RESPONSE_POSTFIX}`);
                event.sender.send(name + RESPONSE_POSTFIX, out);

            }, args);
        });
    }

    registerSync(name: string, action: (callback: ErrorFirstCallback, args: any) => void) {
        this.ipcMain.on(name, (event: any, args: any) => {
            console.log(`Recieved ${name}`);
            action((err, result) => {

                if (err)
                    console.log(err);

                const out = {
                    err: err ? err.message : null,
                    result,
                };

                console.log(`Sending Sync ${name}${RESPONSE_POSTFIX}`);
                event.returnValue = out;

            }, args);
        });

    }

    prompt(name: string, action: (callback: ErrorFirstCallback, args: any) => void, args: any) {
        console.log(`Sending ${name}`);
        this.window.webContents.send(name, args);
        this.ipcMain.once(`${name}${RESPONSE_POSTFIX}`, (event: any, {err, result}) => {
            console.log(`Received ${name}${RESPONSE_POSTFIX}`);
            action(err, result);
        });
    }

}
