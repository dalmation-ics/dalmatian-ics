import ArchiveBridge from './archiveBridge'

import IpcWrapper from './IpcWrapper'
import BrowserWindow = Electron.BrowserWindow;

import electronBridge from './electronBridge';
import stateBridge from './stateBridge';
import formTemplateBridge from './formTemplateBridge'

const IpcBridgeConfiguration = (window: BrowserWindow) => {
    const ipcW = new IpcWrapper(window);
    stateBridge(ipcW);
    formTemplateBridge(ipcW);
    ArchiveBridge(ipcW);
    electronBridge(ipcW);
};
export default IpcBridgeConfiguration;
