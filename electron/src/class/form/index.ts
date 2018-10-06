import {JSDOM} from 'jsdom';
import * as jQuery from 'jquery';

/**
 * Interface for storing and managing templates of forms
 */
export interface I_FormTemplate {
    fileName: string;
    id: string;
    name: string;
    detail: string;
    lastModified: string;
}

/**
 * Class for storing and managing templates of forms
 */
export class FormTemplate implements I_FormTemplate {
    detail: string;
    fileName: string;
    id: string;
    lastModified: string;
    name: string;

    constructor(props: I_FormDetails) {
        Object.assign(this, props);
    }
}

/**
 * Describes a form's meta-data (doesn't have any content associated with it)
 */
export interface I_FormDetails {
    fileName: string;
    id: string;
    name: string;
    detail: string;
    lastModified: string;
}

/**
 * Describes a form's meta-data (doesn't have any content associated with it)
 */
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

/**
 * Describes a form object including content
 */
export interface I_FormComplete extends I_FormDetails {
    content: any
}

/**
 * Describes a form object including content
 */
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

/**
 * Handles incoming form templates being processed for local usage
 * @param {string} htmlContent
 * @param {string} fileName
 * @param {string} lastModified
 * @returns {any}
 */
export function parseFormTemplate(htmlContent: string, fileName: string, lastModified: string) {

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
    //done to disable type checking on window because TS and Jquery don't understand each other
    const window: any = new JSDOM(content).window;
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
