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
var ServerMock = require("mock-http-server"); // https://www.npmjs.com/package/mock-http-server
var UpdateManager_1 = require("./UpdateManager");
var StorageManager_1 = require("./StorageManager");
var getIt = require("get-it");
var gi_base = require("get-it/lib/middleware/base");
var gi_promise = require("get-it/lib/middleware/promise");
var server = new ServerMock({ host: 'localhost', port: 30025 });
var request = getIt([
    gi_base('http://localhost:30025'),
    gi_promise({ onlyBody: true })
]);
var sandbox;
describe('UpdateManager should ', function () {
    beforeAll(function () {
        UpdateManager_1["default"].setGetItRequest(request);
    });
    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });
    beforeEach(function () {
        UpdateManager_1["default"].setGetItRequest(request);
    });
    afterEach(function () {
        sandbox.restore();
    });
    it('resolve true to be true', function () {
        expect(true).toBe(true);
    });
    describe('has method checkForUpdates that ', function () {
        beforeEach(function (done) {
            server.start(done);
        });
        afterEach(function (done) {
            server.stop(done);
        });
        it('exists', function () {
            expect(UpdateManager_1["default"].checkForUpdates).toBeDefined();
        });
        it('loads local index, downloads server index, and compares the two, resolving empty array', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_read, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_read = sandbox.stub(StorageManager_1["default"], 'read');
                        stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({
                            bcics_ICS205: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS206: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS205A: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS210: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS213: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS214: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS214A: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS217A: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS309: { lastModified: '2018-05-18T12:37:21-07:00' }
                        }));
                        server.on({
                            method: 'GET',
                            path: '/index.json',
                            reply: {
                                status: 200,
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify({
                                    bcics_ICS205: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS206: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS205A: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS210: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS213: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS214: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS214A: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS217A: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS309: { lastModified: '2018-05-18T12:37:21-07:00' }
                                })
                            }
                        });
                        return [4 /*yield*/, UpdateManager_1["default"].checkForUpdates()["catch"](function (e) { return console.log(e); })];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('loads local index, downloads server index, and compares the two, resolving updates needed due to new version', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_read, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_read = sandbox.stub(StorageManager_1["default"], 'read');
                        stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({
                            bcics_ICS205: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS206: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS205A: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS210: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS213: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS214: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS214A: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS217A: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS309: { lastModified: '2018-05-18T12:37:21-07:00' }
                        }));
                        server.on({
                            method: 'GET',
                            path: '/index.json',
                            reply: {
                                status: 200,
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify({
                                    bcics_ICS205: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS206: { lastModified: '2018-06-18T12:37:21-07:00' },
                                    bcics_ICS205A: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS210: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS213: { lastModified: '2018-06-18T12:37:21-07:00' },
                                    bcics_ICS214: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS214A: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS217A: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS309: { lastModified: '2018-05-18T12:37:21-07:00' }
                                })
                            }
                        });
                        return [4 /*yield*/, UpdateManager_1["default"].checkForUpdates()];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toEqual(['bcics_ICS206', 'bcics_ICS213']);
                        return [2 /*return*/];
                }
            });
        }); });
        it('loads local index, downloads server index, and compares the two, resolving updates needed due to new file', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_read, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_read = sandbox.stub(StorageManager_1["default"], 'read');
                        stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({
                            bcics_ICS205: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS206: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS210: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS213: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS214: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS214A: { lastModified: '2018-05-18T12:37:21-07:00' },
                            bcics_ICS309: { lastModified: '2018-05-18T12:37:21-07:00' }
                        }));
                        server.on({
                            method: 'GET',
                            path: '/index.json',
                            reply: {
                                status: 200,
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify({
                                    bcics_ICS205: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS206: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS205A: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS210: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS213: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS214: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS214A: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS217A: { lastModified: '2018-05-18T12:37:21-07:00' },
                                    bcics_ICS309: { lastModified: '2018-05-18T12:37:21-07:00' }
                                })
                            }
                        });
                        return [4 /*yield*/, UpdateManager_1["default"].checkForUpdates()];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toEqual(['bcics_ICS205A', 'bcics_ICS217A']);
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles errors from read appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, stub_read;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('Oh no');
                        stub_read = sandbox.stub(StorageManager_1["default"], 'read');
                        stub_read.rejects(error);
                        // Act
                        return [4 /*yield*/, expect(UpdateManager_1["default"].checkForUpdates()).rejects.toBe(error)];
                    case 1:
                        // Act
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles errors from request appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, stub_read, stub_request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('oh no');
                        stub_read = sandbox.stub(StorageManager_1["default"], 'read');
                        stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({}));
                        stub_request = sandbox.stub();
                        stub_request.rejects(error);
                        UpdateManager_1["default"].setGetItRequest(stub_request);
                        // Act
                        return [4 /*yield*/, expect(UpdateManager_1["default"].checkForUpdates()).rejects.toBe(error)];
                    case 1:
                        // Act
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles invalid local json appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_read;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_read = sandbox.stub(StorageManager_1["default"], 'read');
                        stub_read.withArgs('/forms', 'index.json').resolves('1 0+1');
                        // Act Assert
                        return [4 /*yield*/, expect(UpdateManager_1["default"].checkForUpdates()).rejects.toBeInstanceOf(SyntaxError)];
                    case 1:
                        // Act Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles invalid server json appropriately', function () { return __awaiter(_this, void 0, void 0, function () {
            var stub_read, stub_request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_read = sandbox.stub(StorageManager_1["default"], 'read');
                        stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({}));
                        stub_request = sandbox.stub();
                        stub_request.resolves('falsee');
                        UpdateManager_1["default"].setGetItRequest(stub_request);
                        // Act Assert
                        return [4 /*yield*/, expect(UpdateManager_1["default"].checkForUpdates()).rejects.toBeInstanceOf(SyntaxError)];
                    case 1:
                        // Act Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles server timeout appropriately', function (done) {
            // Arrange
            var stub_read = sandbox.stub(StorageManager_1["default"], 'read');
            stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({}));
            UpdateManager_1["default"].setTimeout(1000);
            server.on({
                method: 'GET',
                path: '/index.json',
                reply: {
                    status: 200,
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                        hello: 'is it me you\'re looking for?'
                    })
                },
                delay: 2000
            });
            // Act Assert
            UpdateManager_1["default"].checkForUpdates()["catch"](function (e) {
                expect(e.message).toContain('Socket timed out');
                done();
            });
        });
        it('can be aborted when requesting', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var stub_read;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stub_read = sandbox.stub(StorageManager_1["default"], 'read');
                        stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({}));
                        UpdateManager_1["default"].setTimeout(5000);
                        server.on({
                            method: 'GET',
                            path: '/index.json',
                            reply: {
                                status: 200,
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify({
                                    hello: 'is it me you\'re looking for?'
                                })
                            },
                            delay: 5000
                        });
                        // Act Assert
                        UpdateManager_1["default"].checkForUpdates()["catch"](function (e) {
                            expect(e).toBeInstanceOf(UpdateManager_1.UserCancelledError);
                            done();
                        });
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 1:
                        _a.sent();
                        UpdateManager_1["default"].abort();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can be aborted when reading', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var stub_read;
            return __generator(this, function (_a) {
                stub_read = sandbox.stub(StorageManager_1["default"], 'read');
                stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({}));
                UpdateManager_1["default"].setTimeout(5000);
                server.on({
                    method: 'GET',
                    path: '/index.json',
                    reply: {
                        status: 200,
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({
                            hello: 'is it me you\'re looking for?'
                        })
                    },
                    delay: 5000
                });
                // Act Assert
                UpdateManager_1["default"].checkForUpdates()["catch"](function (e) {
                    console.log(e);
                    expect(e).toBeInstanceOf(UpdateManager_1.UserCancelledError);
                    done();
                });
                UpdateManager_1["default"].abort();
                return [2 /*return*/];
            });
        }); });
    });
    // describe('has method downloadNewForms that', () => {
    //
    //     beforeEach((done) => {
    //         server.start(done);
    //     });
    //
    //     afterEach((done) => {
    //         server.stop(done);
    //     });
    //
    //     it('exists', () => {
    //
    //         expect(SUT.checkForUpdates).toBeDefined();
    //
    //     });
    //
    // });
    //
    // describe('has method abort that ', () => {
    //
    //     it('exists', () => {
    //
    //         expect(SUT.abort).toBeDefined();
    //
    //     });
    //
    //     it('works', async () => {
    //
    //         // jest.setTimeout(5000);
    //         //
    //         // await StorageManager.initialize('/home/spectre/.config/dalmatian-ics-electron/storage/forms').then(async () => {
    //         //     await SUT.downloadNewForms().catch(e => console.log(e));
    //         // }).catch(e => console.log(e));
    //
    //     });
    //
    // });
});