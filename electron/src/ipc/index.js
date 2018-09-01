var IpcWrapper = require('./IpcWrapper');
var formsBridge = require('./formsBridge');
var stateBridge = require('./stateBridge');
var archiveBridge = require('./exportBridge');
var electronBridge = require('./electronBridge');
var _a = require('../storage'), stateManager = _a.stateManager, formManager = _a.formManager, exportManager = _a.exportManager;
module.exports = function (ipc, window) {
    var ipcW = new IpcWrapper(ipc, window);
    stateBridge(ipcW, stateManager, window);
    formsBridge(ipcW, formManager);
    archiveBridge(ipcW, exportManager);
    electronBridge(ipcW);
};
