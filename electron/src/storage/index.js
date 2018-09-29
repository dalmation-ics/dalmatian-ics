"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./DataManager/index");
// import FormManager from './FormManager/index';
var index_2 = require("./StateMananger/index");
var index_3 = require("./ExportMananger/index");
// export const formManager = new FormManager(new DataManager('forms'));
exports.stateManager = new index_2.default(new index_1.default('state'));
exports.exportManager = new index_3.default(new index_1.default('exports'));
exports.init = function () {
    return index_1.default.initRoot();
};
