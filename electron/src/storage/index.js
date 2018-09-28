"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./DataManager/index");
// import FormManager from './FormManager/index';
// import StateManager from './StateMananger/index';
var index_2 = require("./ExportMananger/index");
// export const formManager = new FormManager(new DataManager('forms'));
// export const stateManager = new StateManager(new DataManager('state'));
exports.exportManager = new index_2.default(new index_1.default('exports'));
exports.init = function () {
    return index_1.default.initRoot();
};
