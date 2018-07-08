"use strict";
exports.__esModule = true;
var jsdom_1 = require("jsdom");
var jQuery = require("jquery");
var FormDetails = /** @class */ (function () {
    function FormDetails(props) {
        Object.assign(this, props);
    }
    return FormDetails;
}());
exports["default"] = FormDetails;
function parseForm(htmlContent, fileName, lastModified) {
    var window = new jsdom_1.JSDOM(htmlContent).window;
    var $ = function (input) { return jQuery(input, window.document); };
    var id = $('.ics_Id').text();
    var name = $('.ics_Title').text();
    var detail = $('.ics_Description').text();
    return new FormDetails({ fileName: fileName, id: id, name: name, detail: detail, lastModified: lastModified });
}
exports.parseForm = parseForm;
