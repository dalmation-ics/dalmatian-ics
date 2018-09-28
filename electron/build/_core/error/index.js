"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FileNotFoundError = /** @class */ (function (_super) {
    __extends(FileNotFoundError, _super);
    function FileNotFoundError(path) {
        var _this = _super.call(this) || this;
        _this.name = 'FileNotFoundError';
        _this.message = "File Not Found: " + path;
        return _this;
    }
    return FileNotFoundError;
}(Error));
exports.FileNotFoundError = FileNotFoundError;
;
var UserCancelledError = /** @class */ (function (_super) {
    __extends(UserCancelledError, _super);
    function UserCancelledError(operationName) {
        if (operationName === void 0) { operationName = 'the operation'; }
        var _this = _super.call(this) || this;
        _this.name = 'UserCancelledError';
        _this.message = "The user cancelled " + operationName;
        return _this;
    }
    return UserCancelledError;
}(Error));
exports.UserCancelledError = UserCancelledError;
;
var FormNotFoundError = /** @class */ (function (_super) {
    __extends(FormNotFoundError, _super);
    function FormNotFoundError(name) {
        var _this = _super.call(this) || this;
        _this.name = 'FormNotFoundError';
        _this.message = 'FormComplete not found: ' + name;
        return _this;
    }
    return FormNotFoundError;
}(Error));
exports.FormNotFoundError = FormNotFoundError;
;
var FailedConversionError = /** @class */ (function (_super) {
    __extends(FailedConversionError, _super);
    function FailedConversionError(reason) {
        var _this = _super.call(this) || this;
        _this.name = 'FailedConversionError';
        _this.message = 'Failed to convert XML: ' + reason;
        return _this;
    }
    return FailedConversionError;
}(Error));
exports.FailedConversionError = FailedConversionError;
var MissingArgumentError = /** @class */ (function (_super) {
    __extends(MissingArgumentError, _super);
    function MissingArgumentError(argumentName) {
        var _this = _super.call(this) || this;
        _this.name = 'MissingArgumentError';
        _this.message = "Missing expected argument " + argumentName;
        return _this;
    }
    return MissingArgumentError;
}(Error));
exports.MissingArgumentError = MissingArgumentError;
var IncorrectTypeError = /** @class */ (function (_super) {
    __extends(IncorrectTypeError, _super);
    function IncorrectTypeError(expected, found, name) {
        var _this = _super.call(this) || this;
        _this.name = 'IncorrectTypeError';
        _this.message = "Expected " + expected + ". Found " + found + (name ?
            " in " + name : '');
        return _this;
    }
    return IncorrectTypeError;
}(Error));
exports.IncorrectTypeError = IncorrectTypeError;
