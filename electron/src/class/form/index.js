"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var jQuery = require("jquery");
/**
 * Class for storing and managing templates of forms
 */
var FormTemplate = /** @class */ (function () {
    function FormTemplate(props) {
        Object.assign(this, props);
    }
    return FormTemplate;
}());
exports.FormTemplate = FormTemplate;
/**
 * Describes a form's meta-data (doesn't have any content associated with it)
 */
var FormDetails = /** @class */ (function () {
    function FormDetails(props) {
        Object.assign(this, props);
    }
    return FormDetails;
}());
exports.FormDetails = FormDetails;
/**
 * Describes a form object including content
 */
var FormComplete = /** @class */ (function () {
    function FormComplete(props) {
        Object.assign(this, props);
    }
    return FormComplete;
}());
exports.FormComplete = FormComplete;
/**
 * Handles incoming form templates being processed for local usage
 * @param {string} htmlContent
 * @param {string} fileName
 * @param {string} lastModified
 * @returns {any}
 */
function parseFormTemplate(htmlContent, fileName, lastModified) {
    var window = new jsdom_1.JSDOM(htmlContent).window;
    var id = window.document.querySelector('.ics_Id').textContent;
    var name = window.document.querySelector('.ics_Title').textContent;
    var detail = window.document.querySelector('.ics_Description').textContent;
    if (id != null && name != null && detail != null)
        return new FormDetails({ fileName: fileName, id: id, name: name, detail: detail, lastModified: lastModified });
    else
        return null;
}
exports.parseFormTemplate = parseFormTemplate;
function createFormDetailFromContent(fileName, content) {
    //done to disable type checking on window because TS and Jquery don't understand each other
    var window = new jsdom_1.JSDOM(content).window;
    jQuery(window);
    var $ = window.$;
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
    var window = new jsdom_1.JSDOM(content).window;
    jQuery(window);
    var $ = window.$;
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
