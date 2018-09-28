import {JSDOM} from 'jsdom';
import * as jQuery from 'jquery';

export interface I_FormDetails {
    fileName: string;
    id: string;
    name: string;
    detail: string;
    lastModified: string;
}

export class FormDetails implements I_FormDetails {

    detail: string;
    fileName: string;
    id: string;
    lastModified: string;
    name: string;

    constructor(props: I_FormDetails) {
        Object.assign(this, props);
    }

}

export interface I_FormComplete extends I_FormDetails {
    content: any
}

export class FormComplete implements I_FormComplete {

    detail: string;
    fileName: string;
    id: string;
    lastModified: string;
    name: string;
    content: any;

    constructor(props: I_FormComplete) {
        Object.assign(this, props);
    }


}

export function parseForm(htmlContent: string, fileName: string, lastModified: string) {

    const {window} = new JSDOM(htmlContent);

    const id = window.document.querySelector('.ics_Id').textContent;
    const name = window.document.querySelector('.ics_Title').textContent;
    const detail = window.document.querySelector('.ics_Description').textContent;
    if (id != null && name != null && detail != null)
        return new FormDetails({fileName, id, name, detail, lastModified});
    else
        return null;
}

export function createFormDetailFromContent(fileName: string, content: any) {

    const {window} = new JSDOM(content);
    jQuery(window);
    const $ = window.$;

    const id = $('.ics_Id').text();
    const name = $('.ics_Title').text();
    const detail = $('.ics_Description').html();
    const lastModified = $('.lastSaved').html();

    return new FormDetails({
        id,
        name,
        detail,
        fileName,
        lastModified,
    });

}

export function createFormFromContent(fileName: string, content: any) {

    const {window} = new JSDOM(content);
    jQuery(window);
    const $ = window.$;

    const id = $('.ics_Id').text();
    const name = $('.ics_Title').text();
    const detail = $('.ics_Description').html();
    const lastModified = $('.lastSaved').html();

    return new FormComplete({
        id,
        name,
        detail,
        fileName,
        lastModified,
        content,
    });

}
