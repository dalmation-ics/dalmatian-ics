"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var packageJs = require('../../../../package.json');
var StateManager = /** @class */ (function () {
    /**
     * @param dataManager
     */
    function StateManager(dataManager) {
        this.dataManager = dataManager;
    }
    Object.defineProperty(StateManager, "dataName", {
        get: function () {
            return 'state';
        },
        enumerable: true,
        configurable: true
    });
    StateManager.prototype.save = function (state) {
        var _this = this;
        return this.dataManager.constructor.initRoot().then(function () {
            return _this.dataManager.write(StateManager.dataName, JSON.stringify(state, null, 4));
        });
    };
    StateManager.prototype.load = function () {
        return this.dataManager.read(StateManager.dataName).then(function (result) {
            return JSON.parse(result);
        });
    };
    StateManager.prototype.appVersion = function () {
        return packageJs.version;
    };
    return StateManager;
}());
exports.default = StateManager;
