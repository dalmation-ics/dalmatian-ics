import {JSDOM} from 'jsdom';
import jQuery from 'jquery';

export default class FormDetails {
    id: any;
    name: string;
    detail: any;
    fileName: string;
    content: any;

    static createFormDetailsFromContent(fileName, content) {
        return createFormFromContent(fileName, content);
    }

    constructor({id, name, detail, fileName, content}) {

        this.id = id;
        this.name = name;
        this.detail = detail;
        this.fileName = fileName;
        this.content = content;
    }

}

function createFormFromContent(fileName: string, content: any) {

    const {window} = new JSDOM(content);
    const $ = jQuery(window);

    const id = $('.ics_Id').text();
    const name = $('.ics_Title').text();
    const detail = $('.ics_Description').html();

    return new FormDetails({
        id,
        name,
        detail,
        fileName,
        content,
    });

}

