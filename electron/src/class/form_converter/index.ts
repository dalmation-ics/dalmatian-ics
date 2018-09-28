import {FormComplete, FormDetails, parseForm} from '../../class/form/';
import {parseString} from 'xml2js';
import {JSDOM} from 'jsdom';
import * as $ from 'jquery';

function convert(xmlContent) {

    return new Promise((resolve, reject) => {

        parseString(xmlContent, (err: any, xmlObject) => {

            if (err) {
                reject(err);
                return;
            }

            const form = xmlObject['RMS_Express_Form'];
            const title = form['form_parameters'][0]['display_form'][0].match(
                /[^_]*/)[0].toUpperCase();

            if (CONVERSION[title]) {
                CONVERSION[title](form['variables'][0]).then(htmlContent => {
                    const convertedForm = new FormComplete(htmlContent);
                    convertedForm.content = htmlContent;
                    resolve(convertedForm);
                });
            } else {
                const rejectMessage = `Unrecognized form title ${title}`;
                console.log(rejectMessage);
                reject(rejectMessage);
            }

        });

    });

}

function bind(name, xmlVariables) {

    const formManager = require('../storage').formManager;
    return formManager.getFormByFileName('bcics_' + name).then(htmlContent => {

        const {window} = new JSDOM(htmlContent);
        // const $ = jQuery(window);

        Object.keys(xmlVariables).forEach(v => {

            const value = xmlVariables[v][0];

            const el = $(`#${v}`);
            const type = el.prop('nodeName');
            switch (type) {
                case 'INPUT':
                    el.attr('value', value);
                    break;
                case 'TEXTAREA':
                    el.html(value);
                    break;
                case 'SELECT':
                    el.find(`option[value="${value}"]`).attr('selected', 'selected');
                    break;
            }

        });

        return ($('html').html());

    });

}

const CONVERSION = {};
CONVERSION['ICS205'] = (xmlVariables) => bind('ICS205', xmlVariables);
CONVERSION['ICS205A'] = (xmlVariables) => bind('ICS205A', xmlVariables);
CONVERSION['ICS206'] = (xmlVariables) => bind('ICS206', xmlVariables);
CONVERSION['ICS210'] = (xmlVariables) => bind('ICS210', xmlVariables);
CONVERSION['ICS213'] = (xmlVariables) => bind('ICS213', xmlVariables);
CONVERSION['ICS214'] = (xmlVariables) => bind('ICS214', xmlVariables);
CONVERSION['ICS214A'] = (xmlVariables) => bind('ICS214A', xmlVariables);
CONVERSION['ICS217A'] = (xmlVariables) => bind('ICS217A', xmlVariables);
CONVERSION['ICS309'] = (xmlVariables) => bind('ICS309', xmlVariables);

export default {
    convert,
};
