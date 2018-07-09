"use strict";
exports.__esModule = true;
/**
 * XMLToForm converts ICS XML files into application compatible HTML
 */
var xml2js_1 = require("xml2js");
var jsdom_1 = require("jsdom");
var StorageManager = require("./StorageManager");
/**
 * Convert ICS XML to HTML and generate FormDetails
 * Resolves on complete with I_ConvertedXMLResult which holds HTML content and FormDetails
 * @returns {Promise<String>}
 */
function convertFromXML(xml) {
    return new Promise(function (resolve, reject) {
        xml2js_1.parseString(xml, function (err, xmlObject) {
            if (err) {
                reject(err);
                return;
            }
            var form = xmlObject['RMS_Express_Form'];
            var title = form['form_parameters'][0]['display_form'][0].match(/[^_]*/)[0].toUpperCase();
            StorageManager.read('/forms', "bcics_" + title).then(function (content) {
                console.log(content);
                if (content) {
                    var xmlVariables_1 = form['variables'][0];
                    var window_1 = new jsdom_1.JSDOM(content).window;
                    Object.keys(xmlVariables_1).forEach(function (v) {
                        var value = xmlVariables_1[v][0];
                        var el = window_1.document.getElementById(v);
                        console.log(v);
                        // const type = el.prop('nodeName');
                        // switch (type) {
                        //     case 'INPUT':
                        //         el.attr('value', value);
                        //         break;
                        //     case 'TEXTAREA':
                        //         el.html(value);
                        //         break;
                        //     case 'SELECT':
                        //         el.find(`option[value="${value}"]`).attr('selected', 'selected');
                        //         break;
                        // }
                    });
                }
                else {
                    reject("Could not find HTML equivalent to " + title);
                }
            })["catch"](function (e) {
                reject(e);
            });
        });
    });
}
exports.convertFromXML = convertFromXML;
