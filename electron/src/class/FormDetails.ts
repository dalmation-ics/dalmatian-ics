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

    const id = window.document.querySelector('.ics_Id').textContent;
    const name = window.document.querySelector('.ics_Title').textContent;
    const detail = window.document.querySelector('.ics_Description').textContent;

    return new FormDetails({fileName, id, name, detail, lastModified});

}



