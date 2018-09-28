///<reference path="../../../node_modules/electron/electron.d.ts"/>
//const JSZip = require('node-zip');

import {dialog, shell} from 'electron';
import {createFormFromContent, FormComplete} from '../../class/form';
import fs from 'fs-extra';
import * as nodeZip from 'node-zip';
import * as form_converter from '../../class/form_converter/index';

import {
    FileNotFoundError,
    MissingArgumentError,
    UserCancelledError,
} from '../../_core/error';

export default class ExportManager {
    lastPath: string;
    dataManager: Object;

    /**
     * @param dataManager
     */
    constructor(dataManager: Object) {

        if (dataManager === undefined)
            throw new MissingArgumentError('dataManager');

        this.dataManager = dataManager;
        this.lastPath = '~';
    }

    showInFolder(filePath: URL | string | null) {
        let localPath = '' + filePath;
        if (!filePath)
            localPath = this.lastPath;
        if (!localPath || localPath === '')
            throw new FileNotFoundError(localPath);
        shell.showItemInFolder(localPath);
        return localPath;
    }

    mailTo(subject: string, body: string) {
        shell.openItem('mailto:<email>?subject=' + subject + '&body=' +
            body);
    }

    /**
     *
     * @param {Map<filename, content>} content where id:filename
     * @param {string} filePath (optional
     * @returns {Promise<any>}
     */
    save(content: Map<string, any>, filePath = '') {
        const filters = [
            {name: 'BCICS form', extensions: ['bcics']},
            {name: 'zip', extensions: ['zip']},
            {name: 'Custom filetype', extensions: ['*']},
        ];
        const options = {
            title: 'Save BCICS form compressed data',
            filters,
            defaultPath: this.lastPath,
        };
        return new Promise((resolve, reject) => {
            try {
                if (!(filePath && filePath !== '')) {
                    //show electron dialog
                    filePath = dialog.showSaveDialog(options);
                    if (!(filePath && filePath !== '')) {
                        //user cancelled
                        throw new UserCancelledError('saving the archive');
                    }
                    this.lastPath = filePath;
                }
                let zip = new nodeZip();
                content.forEach((item, index) => {
                    zip.file(item.fileName, item.content);
                });
                let data = zip.generate(
                    {base64: false, compression: 'DEFLATE'});
                let localPath = filePath + '';
                fs.writeFile(filePath, data, 'binary', (err: string | Error | null) => {
                    console.log(localPath + ' DONE!!!!!!');
                    resolve(localPath);
                });
            } catch (exc) {
                reject({exception: exc, filePath});
            }
        });
    }

    handleCodePoints(array: any[]) {
        let CHUNK_SIZE = 0x8000; // arbitrary number here, not too small, not too big
        let length = array.length;
        let result = '';
        let slice;
        for (let index = 0; index < length; index += CHUNK_SIZE) {
            slice = array.slice(index, Math.min(index + CHUNK_SIZE, length)); // `Math.min` is not really necessary here I think
            result += String.fromCharCode.apply(null, slice);
        }
        return result;
    }

    load(filePath = '') {
        const filters = [
            {name: 'BCICS form', extensions: ['bcics.zip', 'bcics']},
            {name: 'zip', extensions: ['zip']},
            {name: 'Other filetype', extensions: ['*']},
        ];

        const options = {
            title: 'Open BCICS form compressed data',
            filters,
            defaultPath: this.lastPath,
        };
        return new Promise((resolve, reject) => {
            try {
                if (!(filePath && filePath !== '')) {
                    //show electron dialog
                    const fileList = dialog.showOpenDialog(options);
                    if (!(fileList && fileList.length > 0)) {
                        //user cancelled
                        throw new UserCancelledError('loading an archive');
                    }
                    filePath = fileList[0];
                    this.lastPath = filePath;
                }
                console.log('file requested:' + filePath);

                let fileData = require('fs').readFileSync(filePath, 'binary');
                // let data = new require('node-zip')(fileData,
                //     {base64: false, compression: 'DEFLATE'});
                let data = nodeZip(fileData, {base64: false, compression: 'DEFLATE'});
                let fileList = data.files;

                let result = [];

                for (let key in fileList) {
                    console.log(key);
                    const resultFile = fileList[key];

                    //this is returning uints instead of strings
                    const obj = resultFile._data.getContent('string');

                    //convert uint array to string
                    const objStr = this.handleCodePoints(obj);

                    const form: FormComplete = createFormFromContent(key, objStr);
                    result.push(form);
                }
                resolve({result, filePath});
            } catch (exc) {
                reject(exc);
            }
        });
    }

    import(filePath = '') {
        const filters = [
            {name: 'RMS Express FormComplete XML', extensions: ['xml']},
        ];
        const options = {
            title: 'Import XML form',
            filters,
            defaultPath: this.lastPath,
        };
        return new Promise((resolve, reject) => {
            try {

                if (!(filePath && filePath !== '')) {
                    //show electron dialog
                    const fileList = dialog.showOpenDialog(options);
                    if (!(fileList && fileList.length > 0)) {
                        //user cancelled
                        throw new UserCancelledError('importing XML');
                    }
                    filePath = fileList[0];
                    this.lastPath = filePath;
                }

                fs.readFile(filePath).then((result: object | string) => {
                    return form_converter.convert(result.toString());
                }).then(resolve).catch(reject);

            } catch (e) {
                reject(e);
            }
        });
    }

}
