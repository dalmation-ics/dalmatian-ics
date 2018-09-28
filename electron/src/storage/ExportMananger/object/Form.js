"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var jquery_1 = require("jquery");
var FormDetails = /** @class */ (function () {
    function FormDetails(_a) {
        var id = _a.id, name = _a.name, detail = _a.detail, fileName = _a.fileName, content = _a.content;
        this.id = id;
        this.name = name;
        this.detail = detail;
        this.fileName = fileName;
        this.content = content;
    }
    FormDetails.createFormDetailsFromContent = function (fileName, content) {
        return createFormFromContent(fileName, content);
    };
    return FormDetails;
}());
exports.default = FormDetails;
function createFormFromContent(fileName, content) {
    var window = new jsdom_1.JSDOM(content).window;
    var $ = jquery_1.default(window);
    var id = $('.ics_Id').text();
    var name = $('.ics_Title').text();
    var detail = $('.ics_Description').html();
    return new FormDetails({
        id: id,
        name: name,
        detail: detail,
        fileName: fileName,
        content: content,
    });
}
