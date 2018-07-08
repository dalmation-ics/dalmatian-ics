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
var ServerMock = require("mock-http-server"); // https://www.npmjs.com/package/mock-http-server
var SUT = require("./FormFetcher");
var getIt = require("get-it");
var gi_base = require("get-it/lib/middleware/base");
var gi_promise = require("get-it/lib/middleware/promise");
var FormDetails_1 = require("./class/FormDetails");
var FormFetcher_1 = require("./FormFetcher");
var server = new ServerMock({ host: 'localhost', port: 30025 });
var mock_getIt_instance = getIt([
    gi_base('http://localhost:30025'),
    gi_promise({ onlyBody: true })
]);
var SERVER_INDEX = {
    bcics_ICS205: { lastModified: '2018-05-18T12:37:21-07:00' },
    bcics_ICS206: { lastModified: '2018-05-18T12:37:21-07:00' },
    bcics_ICS205A: { lastModified: '2018-05-18T12:37:21-07:00' }
};
var ICS205_Content = 'ICS205 Content';
var ICS205_Details = new FormDetails_1["default"]({
    fileName: 'bcics_ICS205',
    name: 'ICS205 A Land Before Time',
    id: 'ICS205',
    detail: 'ICS205 Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});
var ICS206_Content = 'ICS206 Content';
var ICS206_Details = new FormDetails_1["default"]({
    fileName: 'bcics_ICS206',
    name: 'ICS206 Electric Boogaloo',
    id: 'ICS206',
    detail: 'ICS206 Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});
var ICS205A_Content = 'ICS205A Content';
var ICS205A_Details = new FormDetails_1["default"]({
    fileName: 'bcics_ICS205A',
    name: 'ICS205A This time its different',
    id: 'ICS205A',
    detail: 'ICS205A Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});
describe('FormFetcher should ', function () {
    beforeEach(function (done) {
        SUT.setGetItInstance(mock_getIt_instance);
        SUT.setTimeout(10000);
        server.start(done);
    });
    afterEach(function (done) {
        server.stop(done);
    });
    it('resolve true to be true', function () {
        expect(true).toBe(true);
    });
    describe('has method fetchIndex that ', function () {
        it('exists', function () {
            expect(SUT.fetchIndex).toBeDefined();
        });
        it('can download index', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Arrange
                        server.on({
                            path: '/index.json',
                            reply: buildSuccessResponse(JSON.stringify(SERVER_INDEX))
                        });
                        return [4 /*yield*/, SUT.fetchIndex()];
                    case 1:
                        result = _a.sent();
                        // Assert
                        expect(result).toEqual(SERVER_INDEX);
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles empty response', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Arrange
                        server.on({
                            path: '/index.json',
                            reply: ''
                        });
                        // Act & Assert
                        return [4 /*yield*/, expect(SUT.fetchIndex()).rejects.toBeInstanceOf(FormFetcher_1.BadServerResponseError)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles invalid JSON', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Arrange
                        server.on({
                            path: '/index.json',
                            reply: buildSuccessResponse('. 0')
                        });
                        // Act & Assert
                        return [4 /*yield*/, expect(SUT.fetchIndex()).rejects.toBeInstanceOf(FormFetcher_1.BadServerResponseError)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles timeout', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Arrange
                        server.on({
                            path: '/index.json',
                            reply: buildSuccessResponse(JSON.stringify(SERVER_INDEX)),
                            delay: 3000
                        });
                        SUT.setTimeout(50);
                        return [4 /*yield*/, SUT.fetchIndex()["catch"](function (e) {
                                expect(e.message).toContain('Socket timed out');
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can be aborted', function (done) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Arrange
                        server.on({
                            path: '/index.json',
                            reply: buildSuccessResponse(JSON.stringify(SERVER_INDEX)),
                            delay: 3000
                        });
                        // Act
                        SUT.fetchIndex()["catch"](function (e) {
                            expect(e).toBeInstanceOf(FormFetcher_1.UserCancelledError);
                            done();
                        });
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 1:
                        _a.sent();
                        SUT.abort();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can be aborted twice', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Arrange
                        server.on({
                            path: '/index.json',
                            reply: buildSuccessResponse(JSON.stringify(SERVER_INDEX)),
                            delay: 1000
                        });
                        // Act
                        SUT.fetchIndex()["catch"](function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        expect(e).toBeInstanceOf(FormFetcher_1.UserCancelledError);
                                        SUT.fetchIndex()["catch"](function (_e) { return __awaiter(_this, void 0, void 0, function () {
                                            var result;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        expect(_e).toBeInstanceOf(FormFetcher_1.UserCancelledError);
                                                        return [4 /*yield*/, SUT.fetchIndex()];
                                                    case 1:
                                                        result = _a.sent();
                                                        expect(result).toEqual(SERVER_INDEX);
                                                        done();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                                    case 1:
                                        _a.sent();
                                        SUT.abort();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                    case 1:
                        _a.sent();
                        SUT.abort();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('has method fetchForms that ', function () {
        it('exists', function () {
            expect(SUT.fetchForms).toBeDefined();
        });
    });
});
function buildSuccessResponse(body, isJson) {
    return {
        status: 200,
        headers: { 'content-type': isJson ? 'application/json' : 'text/html' },
        body: body
    };
}
