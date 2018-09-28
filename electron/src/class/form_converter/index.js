"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = require("../../class/form/");
var xml2js_1 = require("xml2js");
var jsdom_1 = require("jsdom");
var $ = require("jquery");
function convert(xmlContent) {
    return new Promise(function (resolve, reject) {
        xml2js_1.parseString(xmlContent, function (err, xmlObject) {
            if (err) {
                reject(err);
                return;
            }
            var form = xmlObject['RMS_Express_Form'];
            var title = form['form_parameters'][0]['display_form'][0].match(/[^_]*/)[0].toUpperCase();
            if (CONVERSION[title]) {
                CONVERSION[title](form['variables'][0]).then(function (htmlContent) {
                    var convertedForm = new form_1.FormComplete(htmlContent);
                    convertedForm.content = htmlContent;
                    resolve(convertedForm);
                });
            }
            else {
                var rejectMessage = "Unrecognized form title " + title;
                console.log(rejectMessage);
                reject(rejectMessage);
            }
        });
    });
}
function bind(name, xmlVariables) {
    var formManager = require('../storage').formManager;
    return formManager.getFormByFileName('bcics_' + name).then(function (htmlContent) {
        var window = new jsdom_1.JSDOM(htmlContent).window;
        // const $ = jQuery(window);
        Object.keys(xmlVariables).forEach(function (v) {
            var value = xmlVariables[v][0];
            var el = $("#" + v);
            var type = el.prop('nodeName');
            switch (type) {
                case 'INPUT':
                    el.attr('value', value);
                    break;
                case 'TEXTAREA':
                    el.html(value);
                    break;
                case 'SELECT':
                    el.find("option[value=\"" + value + "\"]").attr('selected', 'selected');
                    break;
            }
        });
        return ($('html').html());
    });
}
var CONVERSION = {};
CONVERSION['ICS205'] = function (xmlVariables) { return bind('ICS205', xmlVariables); };
CONVERSION['ICS205A'] = function (xmlVariables) { return bind('ICS205A', xmlVariables); };
CONVERSION['ICS206'] = function (xmlVariables) { return bind('ICS206', xmlVariables); };
CONVERSION['ICS210'] = function (xmlVariables) { return bind('ICS210', xmlVariables); };
CONVERSION['ICS213'] = function (xmlVariables) { return bind('ICS213', xmlVariables); };
CONVERSION['ICS214'] = function (xmlVariables) { return bind('ICS214', xmlVariables); };
CONVERSION['ICS214A'] = function (xmlVariables) { return bind('ICS214A', xmlVariables); };
CONVERSION['ICS217A'] = function (xmlVariables) { return bind('ICS217A', xmlVariables); };
CONVERSION['ICS309'] = function (xmlVariables) { return bind('ICS309', xmlVariables); };
exports.default = {
    convert: convert,
};
