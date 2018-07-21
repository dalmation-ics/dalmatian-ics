import IpcMain = Electron.IpcMain;
import BrowserWindow = Electron.BrowserWindow;
import {RESPONSE_POSTFIX} from './_core/contract/_general';
import {ErrorFirstCallback} from './type/Callbacks';

export default class IpcWrapper {

    ipcMain: IpcMain;
    window: BrowserWindow;

    constructor(ipcMain: IpcMain, window: BrowserWindow) {
        this.ipcMain = ipcMain;
        this.window = window;
    }

    register(name: string, action: (callback: ErrorFirstCallback, args: any) => void) {
        this.ipcMain.on(name, (event, args) => {
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
        this.ipcMain.on(name, (event, args) => {
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

    prompt(name: string, action: (callback: ErrorFirstCallback, args: any) => void, args) {
        console.log(`Sending ${name}`);
        this.window.webContents.send(name, args);
        this.ipcMain.once(`${name}${RESPONSE_POSTFIX}`, (event, {err, result}) => {
            console.log(`Received ${name}${RESPONSE_POSTFIX}`);
            action(err, result);
        });
    }

}