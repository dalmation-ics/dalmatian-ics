"use strict";
exports.__esModule = true;
var jsdom_1 = require("jsdom");
var jQuery = require("jquery");
var FormDetails = /** @class */ (function () {
    function FormDetails(fileName, id, name, detail, lastModified) {
        this.fileName = fileName;
        this.id = id;
        this.name = name;
        this.detail = detail;
        this.lastModified = lastModified;
    }
    return FormDetails;
}());
exports.FormDetails = FormDetails;
function parseForm(htmlContent, fileName, lastModified) {
    var window = new jsdom_1.JSDOM(htmlContent).window;
    var $ = function (input) { return jQuery(input, window); };
    console.log(window.document.querySelectorAll('.ics_input'));
    console.log($('.ics_input').length);
    var id = $('.ics_Id').text();
    var name = $('.ics_Title').text();
    var detail = $('.ics_Description').text();
    return new FormDetails(fileName, id, name, detail, lastModified);
}
exports.parseForm = parseForm;
