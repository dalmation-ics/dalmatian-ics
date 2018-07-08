import {JSDOM} from 'jsdom';
import * as jQuery from 'jquery';

export interface I_FormDetails {
    fileName: string;
    id: string;
    name: string;
    detail: string;
    lastModified: string;
}

export default class FormDetails implements I_FormDetails {

    detail: string;
    fileName: string;
    id: string;
    lastModified: string;
    name: string;

    constructor(props: I_FormDetails) {
        Object.assign(this, props);
    }

}

export function parseForm(htmlContent: string, fileName: string, lastModified: string) {

    const {window} = new JSDOM(htmlContent);
    const $ = (input) => jQuery(input, window.document);

    const id = $('.ics_Id').text();
    const name = $('.ics_Title').text();
    const detail = $('.ics_Description').text();

    return new FormDetails({fileName, id, name, detail, lastModified});

}



