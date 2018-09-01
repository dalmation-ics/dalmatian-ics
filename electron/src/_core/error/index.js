var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
module.exports = {
    FileNotFoundError: /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(path) {
            var _this = _super.call(this) || this;
            _this.name = 'FileNotFoundError';
            _this.message = "File Not Found: " + path;
            return _this;
        }
        return class_1;
    }(Error)),
    UserCancelledError: /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2(operationName) {
            if (operationName === void 0) { operationName = 'the operation'; }
            var _this = _super.call(this) || this;
            _this.name = 'UserCancelledError';
            _this.message = "The user cancelled " + operationName;
            return _this;
        }
        return class_2;
    }(Error)),
    FormNotFoundError: /** @class */ (function (_super) {
        __extends(class_3, _super);
        function class_3(name) {
            var _this = _super.call(this) || this;
            _this.name = 'FormNotFoundError';
            _this.message = 'Form not found: ' + name;
            return _this;
        }
        return class_3;
    }(Error)),
    FailedConversionError: /** @class */ (function (_super) {
        __extends(class_4, _super);
        function class_4(reason) {
            var _this = _super.call(this) || this;
            _this.name = 'FailedConversionError';
            _this.message = 'Failed to convert XML: ' + reason;
            return _this;
        }
        return class_4;
    }(Error))
};
