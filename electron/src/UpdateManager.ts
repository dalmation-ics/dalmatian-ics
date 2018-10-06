/**
 * UpdateManager handles the management of form templates.
 *
 * Its responsibilities include:
 * - Checking if new forms are available on the server
 * - Download these new forms if they are available
 * - Storing forms locally
 */
import * as moment from 'moment';
import * as _ from 'lodash';
import * as FormFetcher from './FormFetcher';
import {I_ServerIndex, I_FetchFormResult} from './FormFetcher';
import FormDetails from './class/form/index';
import * as StorageManager from './StorageManager';

const DIRECTORY = '/forms';

let checkForUpdates_inProgress: boolean = false;
let downloadFormUpdates_inProgress: boolean = false;

/**
 * CheckForFormUpdates read a local index.json file and compares it to the servers index.json file
 * By comparing the two files the client can determine if there are updates available
 * This will resolve an array containing the names of files which require updating
 * @returns {Promise<Array<string>>}
 */
export function checkForFormUpdates(): Promise<Array<string>> {

    return new Promise<Array<string>>((resolve, reject) => {

        if (checkForUpdates_inProgress)
            reject('A checkForUpdates operation is already underway');
        else
            checkForUpdates_inProgress = true;

        let local_index: I_LocalIndex;
        let server_index: I_ServerIndex;

        /*
        Fetch index from server
         */
        const p_fetchIndex = () => FormFetcher.fetchIndex().then(index => {
            server_index = index;
            return p_readIndex();
        });

        /*
        Read local index and attempt JSON parse
        If there is no index.json, resolve a list of all forms available on server
         */
        const p_readIndex = () => StorageManager.read(DIRECTORY, 'index').then(content => {
            if (content !== null) {
                local_index = JSON.parse(content);
                return p_compare();
            } else {
                resolve(Object.keys(server_index));
                checkForUpdates_inProgress = false;
            }
        });

        /*
        Compare the two indexes and resolve a list of updateable forms
         */
        const p_compare = () => new Promise(() => {
            checkForUpdates_inProgress = false;
            resolve(findNewServerFiles(local_index, server_index));
        });

        /*
        Begin
         */
        p_fetchIndex().catch(e => {
            checkForUpdates_inProgress = false;
            reject(e);
        });

    });

}

/**
 * DownloadFormUpdates starts by checking for updates, receiving a list of form updates available
 * It will then download each of these new forms, as well as update the index.json file
 * @returns {Promise<Array<I_FetchFormResult>>}
 */
export function downloadFormUpdates(): Promise<Array<I_FetchFormResult>> {

    return new Promise<Array<I_FetchFormResult>>((resolve, reject) => {

        if (downloadFormUpdates_inProgress)
            reject('A downloadFormUpdates operation is already underway');
        else
            downloadFormUpdates_inProgress = true;

        let updateableFormList: Array<string>;
        let downloadResults: Array<I_FetchFormResult>;
        let local_index: I_LocalIndex;

        /*
        Get a list of forms which can be updated
         */
        const p_checkForFormUpdates = () => module.exports.checkForFormUpdates().then(result => {
            updateableFormList = result;
            return p_fetchForms();
        });

        /*
        Attempt to download these forms from the server
         */
        const p_fetchForms = () => FormFetcher.fetchForms(updateableFormList).then(result => {
            downloadResults = result;
            return p_readLocalIndex();
        });

        /*
        Load local index for editing
         */
        const p_readLocalIndex = () => StorageManager.read(DIRECTORY, 'index').then(contents => {
            local_index = JSON.parse(contents);
            return p_writeForms();
        });

        /*
        Write new forms to disk
         */
        const p_writeForms = () => Promise.all(downloadResults.map(fetchResult => {

            if (!fetchResult.error)
                return StorageManager.write(DIRECTORY, fetchResult.fileName, fetchResult.content);

        })).then(() => {

            return p_updateLocalIndex();

        });

        /*
        Update local index with new form
         */
        const p_updateLocalIndex = () => new Promise((_resolve) => {

            local_index = local_index || {};
            downloadResults.forEach(fetchResult => {

                if (!fetchResult.error)
                    local_index[fetchResult.fileName] = fetchResult.details;

            });

            _resolve(StorageManager.write(DIRECTORY, 'index', JSON.stringify(local_index)));

        }).then(() => {
            downloadFormUpdates_inProgress = false;
            resolve(downloadResults);
        });

        /*
        Begin
         */
        p_checkForFormUpdates().catch(e => {
            downloadFormUpdates_inProgress = false;
            reject(e);
        });

    });

}

/**
 * Returns a list of files that meet the following requirements
 * -> A file on the server has a more recent last modified date than a local file
 * -> A file is listed by the server that does not exist locally
 *
 * Ex. of contents
 * {
 *    dalmatian_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
 *    dalmatian_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
 *    dalmatian_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
 *    dalmatian_ICS213: {lastModified: '2018-05-18T12:37:21-07:00'}
 * }
 *
 * Returns an empty array if client is up to date
 *
 * @param local_index
 * @param server_index
 */
function findNewServerFiles(local_index: I_LocalIndex, server_index: I_ServerIndex): Array<string> {

    let needsUpdating = [];

    const localNames = Object.keys(local_index);
    const serverNames = Object.keys(server_index);

    const newServerFiles = _.difference(serverNames, localNames);

    if (newServerFiles.length > 0)
        console.log(`Server has new files: [${newServerFiles}]`);

    needsUpdating = newServerFiles;

    localNames.forEach((name) => {
        if (server_index[name]) {
            const serverTime = moment(server_index[name].lastModified);
            const localTime = moment(local_index[name].lastModified);
            if (serverTime.isAfter(localTime)) {
                console.log(`${name} needs updating`);
                needsUpdating.push(name);
            }
        }
    });

    return needsUpdating;

}

export function abort() {

    if (checkForUpdates_inProgress || downloadFormUpdates_inProgress) {
        FormFetcher.abort();
    }

}

export interface I_LocalIndex {
    [form: string]: FormDetails
}
