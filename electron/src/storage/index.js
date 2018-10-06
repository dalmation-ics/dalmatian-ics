"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./DataManager/index");
var index_2 = require("./FormTemplateManager/index");
var index_3 = require("./StateMananger/index");
var index_4 = require("./ExportMananger/index");
exports.formTemplateManager = new index_2.default(new index_1.default('forms'));
exports.stateManager = new index_3.default(new index_1.default('state'));
exports.exportManager = new index_4.default(new index_1.default('exports'));
exports.init = function () {
    return index_1.default.initRoot();
};
