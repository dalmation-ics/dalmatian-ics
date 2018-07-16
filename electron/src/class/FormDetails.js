"use strict";
exports.__esModule = true;
var jsdom_1 = require("jsdom");
var FormDetails = /** @class */ (function () {
    function FormDetails(props) {
        Object.assign(this, props);
    }
    return FormDetails;
}());
exports["default"] = FormDetails;
function parseForm(htmlContent, fileName, lastModified) {
    var window = new jsdom_1.JSDOM(htmlContent).window;
    var id = window.document.querySelector('.ics_Id').textContent;
    var name = window.document.querySelector('.ics_Title').textContent;
    var detail = window.document.querySelector('.ics_Description').textContent;
    return new FormDetails({ fileName: fileName, id: id, name: name, detail: detail, lastModified: lastModified });
}
exports.parseForm = parseForm;
