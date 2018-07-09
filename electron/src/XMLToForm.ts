/**
 * XMLToForm converts ICS XML files into application compatible HTML
 */
import {parseString} from 'xml2js';
import {JSDOM} from 'jsdom';
import * as StorageManager from './StorageManager';

/**
 * Convert ICS XML to HTML and generate FormDetails
 * Resolves on complete with I_ConvertedXMLResult which holds HTML content and FormDetails
 * @returns {Promise<String>}
 */
export function convertFromXML(xml): Promise<String> {

    return new Promise<String>((resolve, reject) => {

        parseString(xml, (err, xmlObject) => {

            if (err) {
                reject(err);
                return;
            }

            const form = xmlObject['RMS_Express_Form'];
            const title = form['form_parameters'][0]['display_form'][0].match(
                /[^_]*/)[0].toUpperCase();

            StorageManager.read('/forms', `bcics_${title}`).then(content => {

                console.log(content);

                if (content) {

                    const xmlVariables = form['variables'][0];
                    const {window} = new JSDOM(content);

                    Object.keys(xmlVariables).forEach(v => {

                        const value = xmlVariables[v][0];

                        const el = window.document.getElementById(v);
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

                } else {
                    reject(`Could not find HTML equivalent to ${title}`);
                }

            }).catch(e => {
                reject(e);
            });

        });

    });

}

