var FormDetails = require('./object/FormDetails');
var formRest = require('../FormRest/index');
var _ = require('lodash');
var moment = require('moment');
var FormManager = /** @class */ (function () {
    /**
     *
     * @param dataManager
     */
    function FormManager(dataManager) {
        this.dataManager = dataManager;
    }
    Object.defineProperty(FormManager, "dataName", {
        get: function () {
            return 'forms';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Download forms from server
     */
    FormManager.prototype.downloadForms = function () {
        var _this = this;
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
            then(function () { return _this.checkForUpdates(); }).
            /**
             * NeedsUpdating: A list of forms I need to download
             * ServerIndex: Contains information on the forms I need to download
             *  such as lastModified
             * LocalIndex: My local index contains information on my forms stored as
             *  implementations of FormDetail objects
             */
            then(function (_a) {
            var needsUpdating = _a.needsUpdating, serverIndex = _a.serverIndex, localIndex = _a.localIndex;
            // Since two of the properties above need to be used later, I cant just abandon them here
            // This means I have to create a custom promise which will pass them along with result from fromRest.GetForms
            return new Promise(function (resolve, reject) {
                // This will return an objects in the style of {formName: {result: content, err: null}, formName2: {re...}}
                return formRest.getForms(needsUpdating).then(function (result) {
                    resolve({
                        forms: result,
                        serverIndex: serverIndex,
                        localIndex: localIndex,
                    });
                }).catch(function (e) { return reject(e); }); // Error needs to be handled since this promise is technically not linked to our main chain
            });
        }).
            /**
             *  Now I have the new form content in forms
             *  The server index which contains the new info on these forms
             *  And my local index which has all the information on my old forms
             *      (some of which we did not download because they don't need updating)
             */
            then(function (_a) {
            var forms = _a.forms, serverIndex = _a.serverIndex, localIndex = _a.localIndex;
            console.log('Writing updates');
            return Promise.all(Object.keys(forms).map(function (name) {
                var form = forms[name];
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
                var formDetails = FormDetails.createFormDetailsFromContent(form.result, name, serverIndex[name].lastModified);
                // Write them to file
                console.log("Writing " + name);
                return _this.dataManager.write(name, form.result).
                    then(function () {
                    // After we successfully write, update our local index
                    localIndex[name] = formDetails;
                });
            })).then(function () {
                // Finally at the end write our updated index
                return _this.dataManager.write('index', JSON.stringify(localIndex));
            });
        });
    };
    /**
     * Check for updates
     */
    FormManager.prototype.checkForUpdates = function () {
        var _this = this;
        console.log('checking for updates');
        return this.dataManager.init().then(function () {
            return _this.dataManager.exists('index');
        }).then(function (exists) {
            if (!exists)
                return _this.dataManager.write('index', '{}').
                    then(function () {
                    return '{}';
                });
            else
                return _this.dataManager.read('index');
        }).then(function (localIndex) {
            return new Promise(function (resolve, reject) {
                formRest.getFormsIndex().then(function (serverIndex) {
                    resolve({
                        localIndex: JSON.parse(localIndex),
                        serverIndex: JSON.parse(serverIndex),
                    });
                }).catch(function (e) { return reject(e); });
            });
        }).then(function (_a) {
            var localIndex = _a.localIndex, serverIndex = _a.serverIndex;
            var needsUpdating = [];
            var localNames = Object.keys(localIndex);
            var serverNames = Object.keys(serverIndex);
            var newServerFiles = _.difference(serverNames, localNames);
            var localOnlyFiles = _.difference(localNames, serverNames);
            if (newServerFiles.length > 0)
                console.log("Server has new files: [" + newServerFiles + "]");
            if (localOnlyFiles.length > 0)
                console.log("Client has files not found on server [" + localOnlyFiles + "]");
            needsUpdating = newServerFiles;
            localNames.forEach(function (name) {
                if (serverIndex[name]) {
                    var serverTime = moment(serverIndex[name].lastModified);
                    var localTime = moment(localIndex[name].lastModified);
                    if (serverTime.isAfter(localTime)) {
                        console.log(name + " needs updating");
                        needsUpdating.push(name);
                    }
                }
            });
            return ({
                actionRequired: (needsUpdating.length > 0),
                needsUpdating: needsUpdating,
                serverIndex: serverIndex,
                localIndex: localIndex,
            });
        });
    };
    /**
     * Get form by id
     */
    FormManager.prototype.getFormByFileName = function (name) {
        return this.dataManager.read(name);
    };
    /**
     * Get form data
     */
    FormManager.prototype.getFormsData = function () {
        return this.dataManager.read('index').then(function (content) {
            return JSON.parse(content);
        });
    };
    return FormManager;
}());
module.exports = FormManager;
