import {JSDOM} from 'jsdom';
import * as jQuery from 'jquery';

export class FormDetails {

    fileName: string;
    id: string;
    name: string;
    detail: string;
    lastModified: string;

    constructor(fileName: string, id: string, name: string, detail: string, lastModified: string) {
        this.fileName = fileName;
        this.id = id;
        this.name = name;
        this.detail = detail;
        this.lastModified = lastModified;
    }

}

export function parseForm(htmlContent: string, fileName: string, lastModified: string) {

    const {window} = new JSDOM(htmlContent);
    const $ = (input) => jQuery(input, window);

    console.log(window.document.querySelectorAll('.ics_input'));
    console.log($('.ics_input').length);

    const id = $('.ics_Id').text();
    const name = $('.ics_Title').text();
    const detail = $('.ics_Description').text();

    return new FormDetails(fileName, id, name, detail, lastModified);

}



