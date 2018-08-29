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
var SUT = require("./UpdateManager");
var FormFetcher = require("./FormFetcher");
var StorageManager = require("./StorageManager");
var FormDetails_1 = require("./class/FormDetails");
var _ = require("lodash");
var SERVER_INDEX = {
    dalmatian_ICS205: { lastModified: '2018-05-18T12:37:21-07:00' },
    dalmatian_ICS206: { lastModified: '2018-05-18T12:37:21-07:00' },
    dalmatian_ICS205A: { lastModified: '2018-05-18T12:37:21-07:00' }
};
var ICS205_Details = new FormDetails_1["default"]({
    fileName: 'dalmatian_ICS205',
    name: 'ICS205 A Land Before Time',
    id: 'ICS205',
    detail: 'ICS205 Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});
var ICS206_Details = new FormDetails_1["default"]({
    fileName: 'dalmatian_ICS206',
    name: 'ICS206 Electric Boogaloo',
    id: 'ICS206',
    detail: 'ICS206 Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});
var ICS205A_Details = new FormDetails_1["default"]({
    fileName: 'dalmatian_ICS205A',
    name: 'ICS205A This time its different',
    id: 'ICS205A',
    detail: 'ICS205A Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});
var LOCAL_INDEX = {
    'dalmatian_ICS205': ICS205_Details,
    'dalmatian_ICS206': ICS206_Details,
    'dalmatian_ICS205A': ICS205A_Details
};
var ICS205_ServerResponse = {
    fileName: 'dalmatian_ICS205',
    content: 'ICS205 Content',
    details: ICS205_Details,
    error: null,
    failure: false
};
var ICS206_ServerResponse = {
    fileName: 'dalmatian_ICS206',
    content: 'ICS206 Content',
    details: ICS206_Details,
    error: null,
    failure: false
};
var ICS205A_ServerResponse = {
    fileName: 'dalmatian_ICS205A',
    content: 'ICS205A Content',
    details: ICS205A_Details,
    error: null,
    failure: false
};
var sandbox;
var DIRECTORY = '/forms';
describe('UpdateManager should ', function () {
    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });
    afterEach(function () {
        sandbox.restore();
    });
    it('resolve true to be true', function () {
        expect(true).toBe(true);
    });
    describe('have method checkForFormUpdates that', function () {
        it('exists', function () {
            expect(SUT.checkForFormUpdates).toBeDefined();
        });
        it('finds all forms when reading index returns null', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_fetchIndex, stub_read, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
                        stub_fetchIndex.resolves(SERVER_INDEX);
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(null);
                        return [4 /*yield*/, SUT.checkForFormUpdates()];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toEqual(['dalmatian_ICS205', 'dalmatian_ICS206', 'dalmatian_ICS205A']);
                        return [2 /*return*/];
                }
            });
        }); });
        it('can find updateable forms', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_fetchIndex, m_Local_Index, stub_read, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
                        stub_fetchIndex.resolves(SERVER_INDEX);
                        m_Local_Index = _.cloneDeep(LOCAL_INDEX);
                        m_Local_Index['dalmatian_ICS206'].lastModified = '2018-05-11T12:37:21-07:00';
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));
                        return [4 /*yield*/, SUT.checkForFormUpdates()];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toEqual(['dalmatian_ICS206']);
                        return [2 /*return*/];
                }
            });
        }); });
        it('can find multiple updateable forms', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_fetchIndex, m_Local_Index, stub_read, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
                        stub_fetchIndex.resolves(SERVER_INDEX);
                        m_Local_Index = _.cloneDeep(LOCAL_INDEX);
                        m_Local_Index['dalmatian_ICS206'].lastModified = '2018-05-11T12:37:21-07:00';
                        m_Local_Index['dalmatian_ICS205A'].lastModified = '2018-05-11T12:37:21-07:00';
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));
                        return [4 /*yield*/, SUT.checkForFormUpdates()];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toEqual(['dalmatian_ICS206', 'dalmatian_ICS205A']);
                        return [2 /*return*/];
                }
            });
        }); });
        it('can find zero updateable forms', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_fetchIndex, stub_read, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
                        stub_fetchIndex.resolves(SERVER_INDEX);
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(LOCAL_INDEX));
                        return [4 /*yield*/, SUT.checkForFormUpdates()];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('can handle rejection from fetchIndex', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, stub_fetchIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
                        stub_fetchIndex.rejects(error);
                        // Act & Assert
                        return [4 /*yield*/, expect(SUT.checkForFormUpdates()).rejects.toBe(error)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can handle rejection from read', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, stub_fetchIndex, stub_read;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
                        stub_fetchIndex.resolves(SERVER_INDEX);
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').rejects(error);
                        // Act & Assert
                        return [4 /*yield*/, expect(SUT.checkForFormUpdates()).rejects.toBe(error)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('only allows one process at a time', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var stub_fetchIndex, stub_read;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
                        stub_fetchIndex.resolves(new Promise(function (resolve) { return setTimeout(resolve, 1000); }).then(function () { return SERVER_INDEX; }));
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(LOCAL_INDEX));
                        // Act
                        SUT.checkForFormUpdates().then(function () {
                            done();
                        });
                        return [4 /*yield*/, expect(SUT.checkForFormUpdates()).rejects.toEqual('A checkForUpdates operation is already underway')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can be run twice', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_fetchIndex, stub_read, result, result2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
                        stub_fetchIndex.resolves(SERVER_INDEX);
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(LOCAL_INDEX));
                        return [4 /*yield*/, SUT.checkForFormUpdates()];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toEqual([]);
                        return [4 /*yield*/, SUT.checkForFormUpdates()];
                    case 2:
                        result2 = _a.sent();
                        // Assert
                        expect(result2).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('have method downloadFormUpdates that', function () {
        it('exists', function () {
            expect(SUT.downloadFormUpdates).toBeDefined();
        });
        it('can update multiple forms', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_checkForFormUpdates, stub_FetchForms, m_Local_Index, stub_read, stub_write, m_Local_Index_Expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
                        stub_checkForFormUpdates.resolves(['dalmatian_ICS205A', 'dalmatian_ICS205']);
                        stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
                        stub_FetchForms.withArgs(['dalmatian_ICS205A', 'dalmatian_ICS205']).resolves([
                            ICS205A_ServerResponse,
                            ICS205_ServerResponse
                        ]);
                        m_Local_Index = _.cloneDeep(LOCAL_INDEX);
                        m_Local_Index['dalmatian_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Up to date
                        m_Local_Index['dalmatian_ICS205'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
                        m_Local_Index['dalmatian_ICS205A'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));
                        stub_write = sandbox.stub(StorageManager, 'write');
                        stub_write.resolves();
                        // Act
                        return [4 /*yield*/, SUT.downloadFormUpdates()];
                    case 1:
                        // Act
                        _a.sent();
                        m_Local_Index_Expected = _.cloneDeep(LOCAL_INDEX);
                        m_Local_Index_Expected['dalmatian_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Untouched
                        m_Local_Index_Expected['dalmatian_ICS205'].lastModified = '2018-05-18T12:37:21-07:00'; // Now matches server
                        m_Local_Index_Expected['dalmatian_ICS205A'].lastModified = '2018-05-18T12:37:21-07:00'; // Now matches server
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === 'index' &&
                                args[2] === JSON.stringify(m_Local_Index_Expected);
                        }).length).toBe(1);
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === ICS205_ServerResponse.fileName &&
                                args[2] === ICS205_ServerResponse.content;
                        }).length).toBe(1);
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === ICS205A_ServerResponse.fileName &&
                                args[2] === ICS205A_ServerResponse.content;
                        }).length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('can handle rejection from checkForFormUpdates ', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, stub_checkForFormUpdates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
                        stub_checkForFormUpdates.rejects(error);
                        // Act & Assert
                        return [4 /*yield*/, expect(SUT.downloadFormUpdates()).rejects.toBe(error)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can handle rejection from checkForFormUpdates ', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, stub_checkForFormUpdates, stub_FetchForms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
                        stub_checkForFormUpdates.resolves(['dalmatian_ICS205A', 'dalmatian_ICS205']);
                        stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
                        stub_FetchForms.withArgs(['dalmatian_ICS205A', 'dalmatian_ICS205']).rejects(error);
                        // Act & Assert
                        return [4 /*yield*/, expect(SUT.downloadFormUpdates()).rejects.toBe(error)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can handle rejection from read ', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, stub_checkForFormUpdates, stub_FetchForms, stub_read;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
                        stub_checkForFormUpdates.resolves(['dalmatian_ICS205A', 'dalmatian_ICS205']);
                        stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
                        stub_FetchForms.withArgs(['dalmatian_ICS205A', 'dalmatian_ICS205']).resolves([
                            ICS205A_ServerResponse,
                            ICS205_ServerResponse
                        ]);
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').rejects(error);
                        // Act & Assert
                        return [4 /*yield*/, expect(SUT.downloadFormUpdates()).rejects.toBe(error)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can handle invalid JSON from read ', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, stub_checkForFormUpdates, stub_FetchForms, stub_read;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
                        stub_checkForFormUpdates.resolves(['dalmatian_ICS205A', 'dalmatian_ICS205']);
                        stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
                        stub_FetchForms.withArgs(['dalmatian_ICS205A', 'dalmatian_ICS205']).resolves([
                            ICS205A_ServerResponse,
                            ICS205_ServerResponse
                        ]);
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves('.0');
                        // Act & Assert
                        return [4 /*yield*/, expect(SUT.downloadFormUpdates()).rejects.toBeInstanceOf(SyntaxError)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can handle rejection from write: forms ', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, stub_checkForFormUpdates, stub_FetchForms, m_Local_Index, stub_read, stub_write;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
                        stub_checkForFormUpdates.resolves(['dalmatian_ICS205A', 'dalmatian_ICS205']);
                        stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
                        stub_FetchForms.withArgs(['dalmatian_ICS205A', 'dalmatian_ICS205']).resolves([
                            ICS205A_ServerResponse,
                            ICS205_ServerResponse
                        ]);
                        m_Local_Index = _.cloneDeep(LOCAL_INDEX);
                        m_Local_Index['dalmatian_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Up to date
                        m_Local_Index['dalmatian_ICS205'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
                        m_Local_Index['dalmatian_ICS205A'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));
                        stub_write = sandbox.stub(StorageManager, 'write');
                        stub_write.onCall(0).rejects(error);
                        // Act & Assert
                        return [4 /*yield*/, expect(SUT.downloadFormUpdates()).rejects.toBe(error)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can handle rejection from write: index', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, stub_checkForFormUpdates, stub_FetchForms, m_Local_Index, stub_read, stub_write;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
                        stub_checkForFormUpdates.resolves(['dalmatian_ICS205A', 'dalmatian_ICS205']);
                        stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
                        stub_FetchForms.withArgs(['dalmatian_ICS205A', 'dalmatian_ICS205']).resolves([
                            ICS205A_ServerResponse,
                            ICS205_ServerResponse
                        ]);
                        m_Local_Index = _.cloneDeep(LOCAL_INDEX);
                        m_Local_Index['dalmatian_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Up to date
                        m_Local_Index['dalmatian_ICS205'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
                        m_Local_Index['dalmatian_ICS205A'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));
                        stub_write = sandbox.stub(StorageManager, 'write');
                        stub_write.withArgs().resolves();
                        stub_write.withArgs(DIRECTORY, 'index', sinon.match.any).rejects(error);
                        // Act & Assert
                        return [4 /*yield*/, expect(SUT.downloadFormUpdates()).rejects.toBe(error)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can be run twice', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_checkForFormUpdates, stub_FetchForms, m_Local_Index, stub_read, stub_write, m_Local_Index_Expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
                        stub_checkForFormUpdates.resolves(['dalmatian_ICS205A', 'dalmatian_ICS205']);
                        stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
                        stub_FetchForms.withArgs(['dalmatian_ICS205A', 'dalmatian_ICS205']).resolves([
                            ICS205A_ServerResponse,
                            ICS205_ServerResponse
                        ]);
                        m_Local_Index = _.cloneDeep(LOCAL_INDEX);
                        m_Local_Index['dalmatian_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Up to date
                        m_Local_Index['dalmatian_ICS205'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
                        m_Local_Index['dalmatian_ICS205A'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));
                        stub_write = sandbox.stub(StorageManager, 'write');
                        stub_write.resolves();
                        // Act
                        return [4 /*yield*/, SUT.downloadFormUpdates()];
                    case 1:
                        // Act
                        _a.sent();
                        m_Local_Index_Expected = _.cloneDeep(LOCAL_INDEX);
                        m_Local_Index_Expected['dalmatian_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Untouched
                        m_Local_Index_Expected['dalmatian_ICS205'].lastModified = '2018-05-18T12:37:21-07:00'; // Now matches server
                        m_Local_Index_Expected['dalmatian_ICS205A'].lastModified = '2018-05-18T12:37:21-07:00'; // Now matches server
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === 'index' &&
                                args[2] === JSON.stringify(m_Local_Index_Expected);
                        }).length).toBe(1);
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === ICS205_ServerResponse.fileName &&
                                args[2] === ICS205_ServerResponse.content;
                        }).length).toBe(1);
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === ICS205A_ServerResponse.fileName &&
                                args[2] === ICS205A_ServerResponse.content;
                        }).length).toBe(1);
                        stub_write.resetHistory();
                        // Act
                        return [4 /*yield*/, SUT.downloadFormUpdates()];
                    case 2:
                        // Act
                        _a.sent();
                        // Assert
                        expect(stub_write.getCalls().length).toBe(3);
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === 'index' &&
                                args[2] === JSON.stringify(m_Local_Index_Expected);
                        }).length).toBe(1);
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === ICS205_ServerResponse.fileName &&
                                args[2] === ICS205_ServerResponse.content;
                        }).length).toBe(1);
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === ICS205A_ServerResponse.fileName &&
                                args[2] === ICS205A_ServerResponse.content;
                        }).length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('can update multiple forms with no local', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_checkForFormUpdates, stub_FetchForms, stub_read, stub_write, m_Local_Index_Expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
                        stub_checkForFormUpdates.resolves(['dalmatian_ICS205A', 'dalmatian_ICS205']);
                        stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
                        stub_FetchForms.withArgs(['dalmatian_ICS205A', 'dalmatian_ICS205']).resolves([
                            ICS205A_ServerResponse,
                            ICS205_ServerResponse
                        ]);
                        stub_read = sandbox.stub(StorageManager, 'read');
                        stub_read.withArgs(DIRECTORY, 'index').resolves(null);
                        stub_write = sandbox.stub(StorageManager, 'write');
                        stub_write.resolves();
                        // Act
                        return [4 /*yield*/, SUT.downloadFormUpdates()];
                    case 1:
                        // Act
                        _a.sent();
                        m_Local_Index_Expected = _.cloneDeep(LOCAL_INDEX);
                        m_Local_Index_Expected['dalmatian_ICS205'].lastModified = '2018-05-18T12:37:21-07:00';
                        m_Local_Index_Expected['dalmatian_ICS205A'].lastModified = '2018-05-18T12:37:21-07:00';
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === 'index' &&
                                JSON.stringify(JSON.parse(args[2]).dalmatian_ICS205) === JSON.stringify(m_Local_Index_Expected.dalmatian_ICS205) &&
                                JSON.stringify(JSON.parse(args[2]).dalmatian_ICS205A) === JSON.stringify(m_Local_Index_Expected.dalmatian_ICS205A);
                        }).length).toBe(1);
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === ICS205_ServerResponse.fileName &&
                                args[2] === ICS205_ServerResponse.content;
                        }).length).toBe(1);
                        expect(stub_write.getCalls().filter(function (c) {
                            var args = c.args;
                            return args[0] === DIRECTORY &&
                                args[1] === ICS205A_ServerResponse.fileName &&
                                args[2] === ICS205A_ServerResponse.content;
                        }).length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
