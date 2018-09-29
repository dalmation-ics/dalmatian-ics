import ArchiveBridge from './archiveBridge'

import IpcWrapper from './IpcWrapper'
import BrowserWindow = Electron.BrowserWindow;

import electronBridge from './electronBridge';
import stateBridge from './stateBridge';

const IpcBridgeConfiguration = (window: BrowserWindow) => {
    const ipcW = new IpcWrapper(window);
    stateBridge(ipcW);
    // formsBridge(ipcW);
    ArchiveBridge(ipcW);
    electronBridge(ipcW);
};
export default IpcBridgeConfiguration;
