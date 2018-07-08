/**
 * UpdateManager handles the management of form templates.
 *
 * Its responsibilities include:
 * - Checking if new forms are available on the server
 * - Download these new forms if they are available
 * - Storing forms locally
 */
// import * as request from 'request-promise'; // https://www.npmjs.com/package/request-promise
import * as getIt from 'get-it';
import StorageManager from './StorageManager';
import * as _ from 'lodash';
import * as moment from 'moment';

import * as gi_base from 'get-it/lib/middleware/base';
import * as gi_promise from 'get-it/lib/middleware/promise';
import {default as FormDetails, parseForm} from './class/FormDetails';

const DOWNLOAD_DIRECTORY = '/forms';
let target = 'https://s3-us-west-2.amazonaws.com/dalmatian-ics-forms';
let timeout = 20000;

let request = getIt([
    gi_base(target),
    gi_promise({onlyBody: true})
]);

let update_process_active = false;
let cancel_token = gi_promise.CancelToken.source();
let isAborting = false;

/**
 * CheckForUpdates read a local index.json file and compares it to the servers index.json file
 * By comparing the two files the client can determine if there are updates available
 * This will resolve an array containing the names of files which require updating
 * @returns {Promise<boolean>}
 */
function checkForUpdates(): Promise<Array<string>> {

    return new Promise<Array<string>>((resolve, reject) => {

        let index_local = null;
        let index_server = null;

        if (update_process_active == true) {
            reject('An update process is already underway');
        }

        update_process_active = true;

        /*
        Read the local index.json file
        If no index.json file exists, updates are most certainly needed. Resolve true
        Else, continue on to download index.json from the server
         */
        const p_get_local_index = () => StorageManager.read(DOWNLOAD_DIRECTORY, 'index.json').then(contents => {
            if (!isAborting) {
                if (!contents) {
                    index_local = {};
                    return p_download_index();
                } else {
                    try {
                        index_local = JSON.parse(contents);
                        return p_download_index();
                    } catch (e) {
                        update_process_active = false;
                        reject(e);
                    }
                }
            } else {
                update_process_active = false;
                isAborting = false;
                reject(new UserCancelledError());
            }
        });

        /*
        Download the server's index.json file
        If there is no index.json file on the server. Panic
        Else continue on to compare the two files
         */
        const p_download_index = () => request({
            url: `/index.json`,
            timeout,
            cancelToken: cancel_token.token
        }).then(content => {

            if (!content) {
                reject('Server response empty');
            } else {
                try {
                    index_server = JSON.parse(content);
                    return p_compare_indexes();
                } catch (e) {
                    isAborting = false;
                    update_process_active = false;
                    reject(e);
                }
            }

        }, e => {
            update_process_active = false;
            isAborting = false;
            if (e.constructor.name === 'Cancel') {
                reject(new UserCancelledError());
            } else {
                reject(e);
            }
        });


        /*
        Compare the two indexes which should be stored in variables index_local and index_server
        Resolve true if findNewServerFiles returns an array with any new server file
         */
        const p_compare_indexes = () => new Promise(() => {

            resolve(findNewServerFiles(index_local, index_server));
            isAborting = false;
            update_process_active = false;

        });

        // Begin
        p_get_local_index().catch(e => {
            update_process_active = false;
            isAborting = false;
            reject(e);
        });

    });

}

/**
 * DownloadNewForms starts by checking for updates, receiving a list of form updates available
 * It will then download each of these new forms, as well as the updates index.json file
 * @returns {Promise<Array<string>>}
 */
function downloadNewForms(): Promise<Array<string>> {

    return new Promise<Array<string>>((resolve, reject) => {

        if (update_process_active == true) {
            reject('An update process is already underway');
        }

        const failed = [];
        const writeQueue = [];

        class WriteQueueObject {

            content: string;
            formDetails: FormDetails;

            constructor(content: string, formDetails: FormDetails) {
                this.content = content;
                this.formDetails = formDetails;
            }

        }

        const p_get_new_forms = () => module.exports.default.checkForUpdates().then(needsUpdating => {

            return Promise.all(needsUpdating.map(file => new Promise((_resolve, _reject) => {

                request({
                    url: `/${file}.html`,
                    timeout,
                    cancelToken: cancel_token.token
                }).then(content => {
                    console.log(`Success ${file}`);
                    try {
                        const formDetails = parseForm(content, file, '');
                        writeQueue.push(new WriteQueueObject(content, formDetails));
                        _resolve();
                    } catch (e) {
                        _reject(e);
                    }
                }).catch(e => {
                    console.log(`Failed ${file}: ${e}`);
                    failed.push(file);
                    _resolve();
                });

            })));

        }).then(() => p_process_write_queue());

        const p_process_write_queue = () => Promise.all(writeQueue.map(writeQueueObject =>
            StorageManager.write(DOWNLOAD_DIRECTORY, `${writeQueueObject.formDetails.fileName}.html`, writeQueueObject.content))
        ).then(() => {
            return p_update_index();
        });

        const p_update_index = () => request({
            url: '/index.json',
            timeout,
            cancelToken: cancel_token.token
        })
            .then(content => JSON.parse(content))
            .then(index => {

            });

        // Begin
        p_get_new_forms().catch(e => reject(e));

    });

}

/**
 * Returns a list of files that meet the following requirements
 * -> A file on the server has a more recent last modified date than a local file
 * -> A file is listed by the server that does not exist locally
 *
 * Ex. of contents
 * {
 *    bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
 *    bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
 *    bcics_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
 *    bcics_ICS213: {lastModified: '2018-05-18T12:37:21-07:00'}
 * }
 *
 * Returns an empty array if client is up to date
 *
 * @param index_local
 * @param index_server
 */
function findNewServerFiles(index_local: object, index_server: object): Array<string> {

    let needsUpdating = [];

    const localNames = Object.keys(index_local);
    const serverNames = Object.keys(index_server);

    const newServerFiles = _.difference(serverNames, localNames);

    if (newServerFiles.length > 0)
        console.log(`Server has new files: [${newServerFiles}]`);

    needsUpdating = newServerFiles;

    localNames.forEach((name) => {
        if (index_server[name]) {
            const serverTime = moment(index_server[name].lastModified);
            const localTime = moment(index_local[name].lastModified);
            if (serverTime.isAfter(localTime)) {
                console.log(`${name} needs updating`);
                needsUpdating.push(name);
            }
        }
    });

    return needsUpdating;

}

function fetch_index() {
    return request({
        url: '/index.json',
        timeout,
        cancelToken: cancel_token.token
    }).then(content => JSON.parse(content));
}

function abort() {
    if (update_process_active) {
        cancel_token.cancel();
        cancel_token = gi_promise.CancelToken.source();
        isAborting = true;
    }
}

function setGetItRequest(getItRequestObject: any) {
    request = getItRequestObject;
}

function setTimeout(millis: number) {
    timeout = millis;
}

export default {
    checkForUpdates,
    downloadNewForms,
    setTimeout,
    abort,
    setGetItRequest,
};

