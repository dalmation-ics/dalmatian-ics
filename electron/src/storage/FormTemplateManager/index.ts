import {parseFormTemplate} from '../../class/form';
import formRest from '../../rest/FormRest';
import * as _ from 'lodash';
import * as moment from 'moment';
import DataManager from "@src/src/storage/DataManager";

export default class FormTemplateManager {
    dataManager: DataManager;

    static get dataName() {
        return 'forms';
    }

    /**
     *
     * @param dataManager
     */
    constructor(dataManager: DataManager) {

        this.dataManager = dataManager;

    }

    /**
     * Download forms from server
     */
    downloadForms() {

        console.log('getting updates');

        /**
         * Initialize data manager
         */
        return this.dataManager.init().

        /**
         *  Check for updates
         *  This return a list of forms that I need to download
         *  It will also give me the server index which has last modified details
         *  Also returned from this method is the local index
         *  With the local index I can update the dateModified on affected items
         */
        then(() => this.checkForUpdates()).

        /**
         * NeedsUpdating: A list of forms I need to download
         * ServerIndex: Contains information on the forms I need to download
         *  such as lastModified
         * LocalIndex: My local index contains information on my forms stored as
         *  implementations of FormDetail objects
         */
        then(({needsUpdating, serverIndex, localIndex}: any) => {
            // Since two of the properties above need to be used later, I cant just abandon them here
            // This means I have to create a custom promise which will pass them along with result from fromRest.GetForms
            return new Promise((resolve, reject) => {
                // This will return an objects in the style of {formName: {result: content, err: null}, formName2: {re...}}
                return formRest.getForms(needsUpdating).then(result => {
                    resolve({

                        forms: result, // Here I am passing the result down to the next promise

                        serverIndex, // And these are the two properties I had to shim into the next promise
                        localIndex,

                    });
                }).catch(e => reject(e)); // Error needs to be handled since this promise is technically not linked to our main chain
            });

        }).

        /**
         *  Now I have the new form content in forms
         *  The server index which contains the new info on these forms
         *  And my local index which has all the information on my old forms
         *      (some of which we did not download because they don't need updating)
         */
        then(({forms, serverIndex, localIndex}: any) => {

            console.log('Writing updates');
            return Promise.all(Object.keys(forms).map(name => { // For every downloaded form

                const form = forms[name];
                /**
                 * ex. bcics_ICS205A {
                     *      result: <html>...
                     *      err: null
                     * }
                 */

                /**
                 * Create the FormDetails
                 * This is how we store forms locally
                 * Not only does it hold lastModified, but it also
                 *  holds the description HTML for use in the application
                 */
                const formDetails =
                    parseFormTemplate(
                        form.result, name, serverIndex[name].lastModified);

                // Write them to file
                console.log(`Writing ${name}`);
                return this.dataManager.write(name, form.result).then(() => {
                    // After we successfully write, update our local index
                    localIndex[name] = formDetails;
                });

            })).then(() => {
                // Finally at the end write our updated index
                return this.dataManager.write('index',
                    JSON.stringify(localIndex));
            });

        });
    }

    /**
     * Check for updates
     */
    checkForUpdates() {

        console.log('checking for updates');
        return this.dataManager.init().then(() => {
            return this.dataManager.exists('index');
        }).then((exists: boolean) => {
            if (!exists)
                return this.dataManager.write('index', '{}').then(() => {
                    return '{}';
                });
            else
                return this.dataManager.read('index');
        }).then((localIndex: any) => {
            return new Promise<object>((resolve, reject) => {
                formRest.getFormsIndex().then((serverIndex: any) => {
                    resolve({
                        localIndex: JSON.parse(localIndex),
                        serverIndex: JSON.parse(serverIndex),
                    });
                }).catch((e: Event) => reject(e));
            });
        }).then(({localIndex, serverIndex}: any) => {

            let needsUpdating: any[] = [];

            const localNames = Object.keys(localIndex);
            const serverNames = Object.keys(serverIndex);

            const newServerFiles = _.difference(serverNames, localNames);
            const localOnlyFiles = _.difference(localNames, serverNames);

            if (newServerFiles.length > 0)
                console.log(`Server has new files: [${newServerFiles}]`);
            if (localOnlyFiles.length > 0)
                console.log(
                    `Client has files not found on server [${localOnlyFiles}]`);

            needsUpdating = newServerFiles;

            localNames.forEach((name) => {
                if (serverIndex[name]) {
                    const serverTime = moment(serverIndex[name].lastModified);
                    const localTime = moment(localIndex[name].lastModified);
                    if (serverTime.isAfter(localTime)) {
                        console.log(`${name} needs updating`);
                        needsUpdating.push(name);
                    }
                }
            });

            return ({
                actionRequired: (
                    needsUpdating.length > 0
                ),
                needsUpdating,
                serverIndex,
                localIndex,
            });

        });

    }

    /**
     * Get form by id
     */
    getFormByFileName(name: string) {
        return this.dataManager.read(name);
    }

    /**
     * Get form data
     */
    getFormsData() {
        return this.dataManager.read('index').then((content: any) => {
            return JSON.parse(content);
        });
    }

}
