const IpcWrapper = require('./IpcWrapper');
const formsBridge = require('./formsBridge');
const stateBridge = require('./stateBridge');
const archiveBridge = require('./exportBridge');
const electronBridge = require('./electronBridge');

const {
   stateManager,
   formManager,
   exportManager,
} = require('../storage');

module.exports = (ipc, window) => {
    const ipcW = new IpcWrapper(ipc, window);
   stateBridge(ipcW, stateManager, window);
   formsBridge(ipcW, formManager);
   archiveBridge(ipcW, exportManager);
   electronBridge(ipcW);
};
