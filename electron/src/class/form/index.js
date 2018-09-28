"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var $ = require("jquery");
var FormDetails = /** @class */ (function () {
    function FormDetails(props) {
        Object.assign(this, props);
    }
    return FormDetails;
}());
exports.FormDetails = FormDetails;
var FormComplete = /** @class */ (function () {
    function FormComplete(props) {
        Object.assign(this, props);
    }
    return FormComplete;
}());
exports.FormComplete = FormComplete;
function parseForm(htmlContent, fileName, lastModified) {
    var window = new jsdom_1.JSDOM(htmlContent).window;
    var id = window.document.querySelector('.ics_Id').textContent;
    var name = window.document.querySelector('.ics_Title').textContent;
    var detail = window.document.querySelector('.ics_Description').textContent;
    if (id != null && name != null && detail != null)
        return new FormDetails({ fileName: fileName, id: id, name: name, detail: detail, lastModified: lastModified });
    else
        return null;
}
exports.parseForm = parseForm;
function createFormDetailFromContent(fileName, content) {
    var id = $('.ics_Id').text();
    var name = $('.ics_Title').text();
    var detail = $('.ics_Description').html();
    var lastModified = $('.lastSaved').html();
    return new FormDetails({
        id: id,
        name: name,
        detail: detail,
        fileName: fileName,
        lastModified: lastModified,
    });
}
exports.createFormDetailFromContent = createFormDetailFromContent;
function createFormFromContent(fileName, content) {
    var id = $('.ics_Id').text();
    var name = $('.ics_Title').text();
    var detail = $('.ics_Description').html();
    var lastModified = $('.lastSaved').html();
    return new FormComplete({
        id: id,
        name: name,
        detail: detail,
        fileName: fileName,
        lastModified: lastModified,
        content: content,
    });
}
exports.createFormFromContent = createFormFromContent;
