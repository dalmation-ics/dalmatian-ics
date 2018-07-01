"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var sinon = require("sinon");
var fs = require("fs-extra");
var path = require("path");
var StorageManager_1 = require("./StorageManager");
var operational_directory = '../../__TestArea__';
describe('StorageManager should ', function () {
    it('resolves true to be true ', function () {
        expect(true).toBe(true);
    });
    describe('have method initialize that ', function () {
        it('exists', function () {
            expect(StorageManager_1["default"].initialize).toBeDefined();
        });
        it('Check operational_directory validity and create storage folder', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_exists, stub_stat, stub_mkdir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_exists = sinon.stub(fs, 'exists');
                        stub_exists.withArgs(operational_directory).resolves(true);
                        stub_exists.withArgs(path.join(operational_directory, 'storage')).resolves(false);
                        stub_stat = sinon.stub(fs, 'stat');
                        stub_stat.withArgs(operational_directory).resolves({
                            isDirectory: function () {
                                return true;
                            }
                        });
                        stub_mkdir = sinon.stub(fs, 'mkdir');
                        stub_mkdir.withArgs(path.join(operational_directory, 'storage')).resolves();
                        // Act
                        return [4 /*yield*/, StorageManager_1["default"].initialize(operational_directory)];
                    case 1:
                        // Act
                        _a.sent();
                        // Assert
                        // - operational_directory should be checked to see if it exists
                        expect(stub_exists.getCall(0).args[0]).toBe(operational_directory);
                        // - operational_directory should be checked to see if it is a directory
                        expect(stub_stat.getCall(0).args[0]).toBe(operational_directory);
                        // - storage folder should be checked to see if it exists
                        expect(stub_exists.getCall(1).args[0]).toBe(path.join(operational_directory, 'storage'));
                        // - storage folder should be created because it does not exist
                        expect(stub_mkdir.getCall(0).args[0]).toBe(path.join(operational_directory, 'storage'));
                        // Restore
                        stub_mkdir.restore();
                        stub_stat.restore();
                        stub_exists.restore();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Check operational_directory validity and not create storage folder as it already exists', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_exists, stub_stat, stub_mkdir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_exists = sinon.stub(fs, 'exists');
                        stub_exists.withArgs(operational_directory).resolves(true);
                        stub_exists.withArgs(path.join(operational_directory, 'storage')).resolves(true);
                        stub_stat = sinon.stub(fs, 'stat');
                        stub_stat.withArgs(operational_directory).resolves({
                            isDirectory: function () {
                                return true;
                            }
                        });
                        stub_mkdir = sinon.stub(fs, 'mkdir');
                        stub_mkdir.withArgs(path.join(operational_directory, 'storage')).resolves();
                        // Act
                        return [4 /*yield*/, StorageManager_1["default"].initialize(operational_directory)];
                    case 1:
                        // Act
                        _a.sent();
                        // Assert
                        // - operational_directory should be checked to see if it exists
                        expect(stub_exists.getCall(0).args[0]).toBe(operational_directory);
                        // - operational_directory should be checked to see if it is a directory
                        expect(stub_stat.getCall(0).args[0]).toBe(operational_directory);
                        // - storage folder should be checked to see if it exists
                        expect(stub_exists.getCall(1).args[0]).toBe(path.join(operational_directory, 'storage'));
                        // - storage folder should not be created because it already exists
                        expect(stub_mkdir.calledOnce).toBe(false);
                        // Restore
                        stub_mkdir.restore();
                        stub_stat.restore();
                        stub_exists.restore();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Rejects if operational_directory does not exist', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_exists = sinon.stub(fs, 'exists');
                        stub_exists.withArgs(operational_directory).resolves(false);
                        // Act Assert
                        return [4 /*yield*/, expect(StorageManager_1["default"].initialize(operational_directory)).rejects.toBeTruthy()];
                    case 1:
                        // Act Assert
                        _a.sent();
                        // Restore
                        stub_exists.restore();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Rejects if operational_directory is not a directory', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_exists, stub_stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_exists = sinon.stub(fs, 'exists');
                        stub_exists.withArgs(operational_directory).resolves(false);
                        stub_stat = sinon.stub(fs, 'stat');
                        stub_stat.withArgs(operational_directory).resolves({
                            isDirectory: function () {
                                return false;
                            }
                        });
                        // Act Assert
                        return [4 /*yield*/, expect(StorageManager_1["default"].initialize(operational_directory)).rejects.toBeTruthy()];
                    case 1:
                        // Act Assert
                        _a.sent();
                        // Restore
                        stub_exists.restore();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
