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
var sinon = require("sinon"); // http://sinonjs.org/releases/v2.0.0/
var aes256 = require("aes256"); // https://www.npmjs.com/package/aes256
var fs = require("fs-extra");
var _path = require("path");
var StorageManager_1 = require("./StorageManager");
var sandbox;
var path = '../../__TestArea__';
var operational_directory = _path.join(path, 'storage');
describe('StorageManager should ', function () {
    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });
    afterEach(function () {
        sandbox.restore();
    });
    it('resolves true to be true ', function () {
        expect(true).toBe(true);
    });
    describe('have method initialize that ', function () {
        it('exists', function () {
            expect(StorageManager_1["default"].initialize).toBeDefined();
        });
        it('Check path validity and create storage folder', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_exists, stub_stat, stub_mkdir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_exists = sandbox.stub(fs, 'exists');
                        stub_exists.withArgs(path).resolves(true);
                        stub_exists.withArgs(operational_directory).resolves(false);
                        stub_stat = sandbox.stub(fs, 'stat');
                        stub_stat.withArgs(path).resolves({
                            isDirectory: function () {
                                return true;
                            }
                        });
                        stub_mkdir = sandbox.stub(fs, 'mkdir');
                        stub_mkdir.withArgs(operational_directory).resolves();
                        // Act
                        return [4 /*yield*/, StorageManager_1["default"].initialize(path)];
                    case 1:
                        // Act
                        _a.sent();
                        // Assert
                        // - operational_directory should be checked to see if it exists
                        expect(stub_exists.getCall(0).args[0]).toBe(path);
                        // - operational_directory should be checked to see if it is a directory
                        expect(stub_stat.getCall(0).args[0]).toBe(path);
                        // - storage folder should be checked to see if it exists
                        expect(stub_exists.getCall(1).args[0]).toBe(operational_directory);
                        // - storage folder should be created because it does not exist
                        expect(stub_mkdir.getCall(0).args[0]).toBe(operational_directory);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Check path validity and not create storage folder as it already exists', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_exists, stub_stat, stub_mkdir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_exists = sandbox.stub(fs, 'exists');
                        stub_exists.withArgs(path).resolves(true);
                        stub_exists.withArgs(operational_directory).resolves(true);
                        stub_stat = sandbox.stub(fs, 'stat');
                        stub_stat.withArgs(path).resolves({
                            isDirectory: function () {
                                return true;
                            }
                        });
                        stub_mkdir = sandbox.stub(fs, 'mkdir');
                        stub_mkdir.withArgs(_path.join(path, 'storage')).resolves();
                        // Act
                        return [4 /*yield*/, StorageManager_1["default"].initialize(path)];
                    case 1:
                        // Act
                        _a.sent();
                        // Assert
                        // - operational_directory should be checked to see if it exists
                        expect(stub_exists.getCall(0).args[0]).toBe(path);
                        // - operational_directory should be checked to see if it is a directory
                        expect(stub_stat.getCall(0).args[0]).toBe(path);
                        // - storage folder should be checked to see if it exists
                        expect(stub_exists.getCall(1).args[0]).toBe(operational_directory);
                        // - storage folder should not be created because it already exists
                        expect(stub_mkdir.calledOnce).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Rejects if path does not exist', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_exists = sandbox.stub(fs, 'exists');
                        stub_exists.withArgs(path).resolves(false);
                        // Act Assert
                        return [4 /*yield*/, expect(StorageManager_1["default"].initialize(path)).rejects.toBeTruthy()];
                    case 1:
                        // Act Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Rejects if path is not a directory', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_exists, stub_stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_exists = sandbox.stub(fs, 'exists');
                        stub_exists.withArgs(path).resolves(false);
                        stub_stat = sandbox.stub(fs, 'stat');
                        stub_stat.withArgs(path).resolves({
                            isDirectory: function () {
                                return false;
                            }
                        });
                        // Act Assert
                        return [4 /*yield*/, expect(StorageManager_1["default"].initialize(path)).rejects.toBeTruthy()];
                    case 1:
                        // Act Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('have method read that ', function () {
        it('exists', function () {
            expect(StorageManager_1["default"].read).toBeDefined();
        });
        it('rejects if storage manager has not been initialized', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        StorageManager_1["default"].setOperationalDirectory(null);
                        return [4 /*yield*/, expect(StorageManager_1["default"].read('foo', 'bar')).rejects.toBeDefined()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('resolves null if directory does not exist', function () { return __awaiter(_this, void 0, void 0, function () {
            var directory_path, stub_exists, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        directory_path = _path.join(operational_directory, 'foo');
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        stub_exists = sandbox.stub(fs, 'exists');
                        stub_exists.withArgs(directory_path).resolves(false);
                        return [4 /*yield*/, StorageManager_1["default"].read('foo', 'bar')];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        it('resolves null if the files does not exist', function () { return __awaiter(_this, void 0, void 0, function () {
            var directory_path, file_path, stub_exists, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(operational_directory, 'foo', 'bar');
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        stub_exists = sandbox.stub(fs, 'exists');
                        stub_exists.withArgs(directory_path).resolves(true);
                        stub_exists.withArgs(file_path).resolves(false);
                        return [4 /*yield*/, StorageManager_1["default"].read('foo', 'bar')];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        it('reads file and returns decrypted value', function () { return __awaiter(_this, void 0, void 0, function () {
            var directory_path, file_path, stub_exists, stub_readFile, stub_decrypt, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(operational_directory, 'foo', 'bar');
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        stub_exists = sandbox.stub(fs, 'exists');
                        stub_exists.withArgs(directory_path).resolves(true);
                        stub_exists.withArgs(file_path).resolves(true);
                        stub_readFile = sandbox.stub(fs, 'readFile');
                        stub_readFile.withArgs(file_path).resolves('hello');
                        stub_decrypt = sandbox.stub(aes256, 'decrypt');
                        stub_decrypt.withArgs(sinon.match.any, 'hello').resolves('world');
                        return [4 /*yield*/, StorageManager_1["default"].read('foo', 'bar')];
                    case 1:
                        result = _a.sent();
                        // Assert
                        // - Directory foo should be checked for existence
                        expect(stub_exists.getCall(0).args[0]).toBe(directory_path);
                        // - File bar should be checked for existence
                        expect(stub_exists.getCall(1).args[0]).toBe(file_path);
                        // - readFile should be called on file_path
                        expect(stub_readFile.getCall(0).args[0]).toBe(file_path);
                        // - decrypt should be called on contents ('hello')
                        expect(stub_decrypt.getCall(0).args[1]).toBe('hello');
                        // - expect decrypted contents ('world') to be returned
                        expect(result).toBe('world');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Handles exists error appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, directory_path, file_path, stub_exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(operational_directory, 'foo', 'bar');
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        stub_exists = sandbox.stub(fs, 'exists');
                        stub_exists.withArgs(directory_path).resolves(true);
                        stub_exists.withArgs(file_path).rejects(error);
                        // Act Assert
                        return [4 /*yield*/, expect(StorageManager_1["default"].read('foo', 'bar')).rejects.toBe(error)];
                    case 1:
                        // Act Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Handles readFile error appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, directory_path, file_path, stub_exists, stub_readFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(operational_directory, 'foo', 'bar');
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        stub_exists = sandbox.stub(fs, 'exists');
                        stub_exists.withArgs(directory_path).resolves(true);
                        stub_exists.withArgs(file_path).resolves(true);
                        stub_readFile = sandbox.stub(fs, 'readFile');
                        stub_readFile.withArgs(file_path).rejects(error);
                        // Act Assert
                        return [4 /*yield*/, expect(StorageManager_1["default"].read('foo', 'bar')).rejects.toBe(error)];
                    case 1:
                        // Act Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Handles decrypt error appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, directory_path, file_path, stub_exists, stub_readFile, stub_decrypt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(operational_directory, 'foo', 'bar');
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        stub_exists = sandbox.stub(fs, 'exists');
                        stub_exists.withArgs(directory_path).resolves(true);
                        stub_exists.withArgs(file_path).resolves(true);
                        stub_readFile = sandbox.stub(fs, 'readFile');
                        stub_readFile.withArgs(file_path).resolves('hello');
                        stub_decrypt = sandbox.stub(aes256, 'decrypt');
                        stub_decrypt.withArgs(sinon.match.any, 'hello').rejects(error);
                        // Act Assert
                        return [4 /*yield*/, expect(StorageManager_1["default"].read('foo', 'bar')).rejects.toBe(error)];
                    case 1:
                        // Act Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('have method write that ', function () {
        it('exists', function () {
            expect(StorageManager_1["default"].write).toBeDefined();
        });
        it('rejects if storage manager has not been initialized', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        StorageManager_1["default"].setOperationalDirectory(null);
                        return [4 /*yield*/, expect(StorageManager_1["default"].read('foo', 'bar')).rejects.toBeDefined()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('writes to file, creating a directory if it does not exist', function () { return __awaiter(_this, void 0, void 0, function () {
            var directory_path, file_path, stub_exist, stub_mkdir, stub_encrypt, stub_write;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Arrange
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(directory_path, 'bar');
                        stub_exist = sandbox.stub(fs, 'exists');
                        stub_exist.withArgs(directory_path).resolves(false);
                        stub_mkdir = sandbox.stub(fs, 'mkdir');
                        stub_mkdir.withArgs(directory_path).resolves();
                        stub_encrypt = sandbox.stub(aes256, 'encrypt');
                        stub_encrypt.withArgs(sinon.match.any, 'Hello').returns('World');
                        stub_write = sandbox.stub(fs, 'writeFile');
                        stub_write.withArgs(file_path, sinon.match.any).resolves();
                        // Act
                        return [4 /*yield*/, StorageManager_1["default"].write('foo', 'bar', 'Hello')];
                    case 1:
                        // Act
                        _a.sent();
                        // Assert
                        // - Check to see if directory exists
                        expect(stub_exist.getCall(0).args[0]).toBe(directory_path);
                        // - When directory does not exist, create it
                        expect(stub_mkdir.getCall(0).args[0]).toBe(directory_path);
                        // - Then prepare for writing by encrypting contents
                        expect(stub_encrypt.getCall(0).args[1]).toBe('Hello');
                        // - Write content to disk
                        expect(stub_write.getCall(0).args[0]).toBe(file_path);
                        expect(stub_write.getCall(0).args[1]).toBe('World');
                        return [2 /*return*/];
                }
            });
        }); });
        it('writes to file, not creating a directory that already exists', function () { return __awaiter(_this, void 0, void 0, function () {
            var directory_path, file_path, stub_exist, stub_mkdir, stub_encrypt, stub_write;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Arrange
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(directory_path, 'bar');
                        stub_exist = sandbox.stub(fs, 'exists');
                        stub_exist.withArgs(directory_path).resolves(true);
                        stub_mkdir = sandbox.stub(fs, 'mkdir');
                        stub_mkdir.withArgs(directory_path).resolves();
                        stub_encrypt = sandbox.stub(aes256, 'encrypt');
                        stub_encrypt.withArgs(sinon.match.any, 'Hello').returns('World');
                        stub_write = sandbox.stub(fs, 'writeFile');
                        stub_write.withArgs(file_path, sinon.match.any).resolves();
                        // Act
                        return [4 /*yield*/, StorageManager_1["default"].write('foo', 'bar', 'Hello')];
                    case 1:
                        // Act
                        _a.sent();
                        // Assert
                        // - Check to see if directory exists
                        expect(stub_exist.getCall(0).args[0]).toBe(directory_path);
                        // - When directory exists, do not create it
                        expect(stub_mkdir.callCount).toBe(0);
                        // - Then prepare for writing by encrypting contents
                        expect(stub_encrypt.getCall(0).args[1]).toBe('Hello');
                        // - Write content to disk
                        expect(stub_write.getCall(0).args[0]).toBe(file_path);
                        expect(stub_write.getCall(0).args[1]).toBe('World');
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles exists errors appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, directory_path, file_path, stub_exist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(directory_path, 'bar');
                        stub_exist = sandbox.stub(fs, 'exists');
                        stub_exist.withArgs(directory_path).rejects(error);
                        // Act Assert
                        return [4 /*yield*/, expect(StorageManager_1["default"].write('foo', 'bar', 'Hello')).rejects.toBe(error)];
                    case 1:
                        // Act Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles mkdir errors appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, directory_path, file_path, stub_exist, stub_mkdir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(directory_path, 'bar');
                        stub_exist = sandbox.stub(fs, 'exists');
                        stub_exist.withArgs(directory_path).resolves(false);
                        stub_mkdir = sandbox.stub(fs, 'mkdir');
                        stub_mkdir.withArgs(directory_path).rejects(error);
                        // Act
                        return [4 /*yield*/, expect(StorageManager_1["default"].write('foo', 'bar', 'Hello')).rejects.toBe(error)];
                    case 1:
                        // Act
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles encrypt errors appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, directory_path, file_path, stub_exist, stub_mkdir, stub_encrypt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(directory_path, 'bar');
                        stub_exist = sandbox.stub(fs, 'exists');
                        stub_exist.withArgs(directory_path).resolves(false);
                        stub_mkdir = sandbox.stub(fs, 'mkdir');
                        stub_mkdir.withArgs(directory_path).resolves();
                        stub_encrypt = sandbox.stub(aes256, 'encrypt');
                        stub_encrypt.withArgs(sinon.match.any, 'Hello').throws(error);
                        // Act
                        return [4 /*yield*/, expect(StorageManager_1["default"].write('foo', 'bar', 'Hello')).rejects.toBe(error)];
                    case 1:
                        // Act
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles write errors appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, directory_path, file_path, stub_exist, stub_mkdir, stub_encrypt, stub_write;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        StorageManager_1["default"].setOperationalDirectory(operational_directory);
                        directory_path = _path.join(operational_directory, 'foo');
                        file_path = _path.join(directory_path, 'bar');
                        stub_exist = sandbox.stub(fs, 'exists');
                        stub_exist.withArgs(directory_path).resolves(false);
                        stub_mkdir = sandbox.stub(fs, 'mkdir');
                        stub_mkdir.withArgs(directory_path).resolves();
                        stub_encrypt = sandbox.stub(aes256, 'encrypt');
                        stub_encrypt.withArgs(sinon.match.any, 'Hello').returns('World');
                        stub_write = sandbox.stub(fs, 'writeFile');
                        stub_write.withArgs(file_path, sinon.match.any).rejects(error);
                        // Act
                        return [4 /*yield*/, expect(StorageManager_1["default"].write('foo', 'bar', 'Hello')).rejects.toBe(error)];
                    case 1:
                        // Act
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
