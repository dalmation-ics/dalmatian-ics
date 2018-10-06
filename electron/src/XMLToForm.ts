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
export function convertFromXML(xml: string): Promise<String> {

    return new Promise<String>((resolve, reject) => {

        parseString(xml, (err, xmlObject) => {

            if (err) {
                reject(err);
                return;
            }

            const form = xmlObject['RMS_Express_Form'];
            const title = form['form_parameters'][0]['display_form'][0].match(
                /[^_]*/)[0].toUpperCase();

            StorageManager.read('/forms', `dalmatian_${title}`).then(content => {

                console.log(content);

                if (content) {

                    const xmlVariables = form['variables'][0];
                    const {window} = new JSDOM(content);

                    Object.keys(xmlVariables).forEach(v => {

                        const value = xmlVariables[v][0];
                        const el = window.document.getElementById(v);

                        if (el) {
                            const type = el.tagName;
                            switch (type) {
                                case 'INPUT':
                                    el.defaultValue = value;
                                    break;
                                case 'TEXTAREA':
                                    el.innerHTML = value;
                                    break;
                                case 'SELECT':
                                    const option = window.document.querySelector(`#${v} option[value="${value}"]`);
                                    if (option) {
                                        option.setAttribute('selected', 'selected');
                                    } else {
                                        const newOption = window.document.createElement('option');
                                        newOption.text = value;
                                        newOption.value = value;
                                        newOption.setAttribute('selected', 'selected');
                                        el.add(newOption);
                                    }
                                    break;
                            }

                        }

                    });

                    const out = window.document.documentElement.outerHTML;
                    resolve(out);

                } else {
                    reject(`Could not find HTML equivalent to ${title}`);
                }

            }).catch(e => {
                reject(e);
            });

        });

    });

}

