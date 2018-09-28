"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../../_core/error");
var fs_extra_1 = require("fs-extra");
var os = require("os");
var DataManager = /** @class */ (function () {
    function DataManager(folder) {
        this.folder = '';
        if (folder === undefined)
            throw new error_1.MissingArgumentError('folder');
        this.folder = folder;
    }
    Object.defineProperty(DataManager, "root", {
        get: function () {
            return os.tmpdir() + "/BC_ICS";
        },
        enumerable: true,
        configurable: true
    });
    DataManager.prototype.normalize = function (name) {
        if (name === undefined)
            throw new error_1.MissingArgumentError('name');
        if (typeof name !== 'string')
            throw new error_1.IncorrectTypeError('string', typeof name, 'name');
        return DataManager.root + "/" + this.folder + "/" + name;
    };
    DataManager.initRoot = function () {
        return new fs_extra_1.default.exists(DataManager.root).then(function (exists) {
            if (!exists)
                return fs_extra_1.default.mkdir(DataManager.root);
        });
    };
    DataManager.prototype.init = function () {
        var _this = this;
        return fs_extra_1.default.exists(this.normalize('')).then(function (exists) {
            if (!exists)
                return fs_extra_1.default.mkdir(_this.normalize(''));
        });
    };
    /**
     * Verify that the data directory exists. If it does, check that the
     * data file of name exists
     */
    DataManager.prototype.exists = function (name) {
        var _this = this;
        if (name === undefined)
            throw new error_1.MissingArgumentError('name');
        if (typeof name !== 'string')
            throw new error_1.IncorrectTypeError('string', typeof name, 'name');
        return this.init().then(function () { return fs_extra_1.default.exists(_this.normalize(name)); });
    };
    /**
     * Read data locally
     * @param name Name of data to be retrieved
     */
    DataManager.prototype.read = function (name) {
        var _this = this;
        if (name === undefined)
            throw new error_1.MissingArgumentError('name');
        if (typeof name !== 'string')
            throw new error_1.IncorrectTypeError('string', typeof name, 'name');
        return this.exists(name).then(function (exists) {
            if (!exists)
                throw new error_1.FileNotFoundError(_this.normalize(name));
            else
                return fs_extra_1.default.readFile(_this.normalize(name)).then(function (data) { return data.toString(); });
        });
    };
    /**
     * List dir
     */
    DataManager.prototype.dir = function () {
        var _this = this;
        return this.init().then(function () {
            return fs_extra_1.default.readdir(_this.normalize(''));
        });
    };
    /**
     * Save data locally
     * @param name Name of data
     * @param content Content to be written
     */
    DataManager.prototype.write = function (name, content) {
        var _this = this;
        if (name === undefined)
            throw new error_1.MissingArgumentError('name');
        if (typeof name !== 'string')
            throw new error_1.IncorrectTypeError('string', typeof name, 'name');
        if (content === undefined)
            throw new error_1.MissingArgumentError('content');
        if (typeof content !== 'string')
            throw new error_1.IncorrectTypeError('string', typeof content, 'content');
        return this.init().then(function () {
            return _this.exists(name);
        }).then(function (exists) {
            if (exists)
                return _this.delete(name);
        }).then(function () {
            return fs_extra_1.default.writeFile(_this.normalize(name), content);
        });
    };
    /**
     * Remove data locally
     * @param name Name of data
     */
    DataManager.prototype.delete = function (name) {
        if (name === undefined)
            throw new error_1.MissingArgumentError('name');
        if (typeof name !== 'string')
            throw new error_1.IncorrectTypeError('string', typeof name, 'name');
        return fs_extra_1.default.remove(this.normalize(name));
    };
    return DataManager;
}());
exports.default = DataManager;
