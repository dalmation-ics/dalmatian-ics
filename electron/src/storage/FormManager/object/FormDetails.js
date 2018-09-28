const {JSDOM} = require('jsdom');
const jQuery = require('jquery');

class FormDetails {

    static createFormDetailsFromContent(fileName, content) {
        return createFormFromContent(fileName, content);
    }

    constructor({fileName, id, name, detail, lastModified}) {

        this.fileName = fileName;
        this.id = id;
        this.name = name;
        this.detail = detail;
        this.lastModified = lastModified;

    }

}

function createFormFromContent(content, fileName, lastModified) {

    const {window} = new JSDOM(content);
    const $ = jQuery(window);

    const id = $('.ics_Id').text();
    const name = $('.ics_Title').text();
    const detail = $('.ics_Description').html();

    return new FormDetails({
        fileName,
        id,
        name,
        detail,
        lastModified,
    });

}

module.exports = FormDetails;

