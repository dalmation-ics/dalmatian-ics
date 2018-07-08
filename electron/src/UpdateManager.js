"use strict";
exports.__esModule = true;
/**
 * UpdateManager handles the management of form templates.
 *
 * Its responsibilities include:
 * - Checking if new forms are available on the server
 * - Download these new forms if they are available
 * - Storing forms locally
 */
var moment = require("moment");
var _ = require("lodash");
var FormFetcher = require("./FormFetcher");
var StorageManager = require("./StorageManager");
var DIRECTORY = '/forms';
var checkForUpdates_inProgress = false;
var downloadFormUpdates_inProgress = false;
/**
 * CheckForFormUpdates read a local index.json file and compares it to the servers index.json file
 * By comparing the two files the client can determine if there are updates available
 * This will resolve an array containing the names of files which require updating
 * @returns {Promise<Array<string>>}
 */
function checkForFormUpdates() {
    return new Promise(function (resolve, reject) {
        if (checkForUpdates_inProgress)
            reject('A checkForUpdates operation is already underway');
        else
            checkForUpdates_inProgress = true;
        var local_index;
        var server_index;
        /*
        Fetch index from server
         */
        var p_fetchIndex = function () { return FormFetcher.fetchIndex().then(function (index) {
            server_index = index;
            return p_readIndex();
        }); };
        /*
        Read local index and attempt JSON parse
         */
        var p_readIndex = function () { return StorageManager.read(DIRECTORY, 'index.json').then(function (content) {
            local_index = JSON.parse(content);
            return p_compare();
        }); };
        /*
        Compare the two indexes and resolve a list of updateable forms
         */
        var p_compare = function () { return new Promise(function () {
            checkForUpdates_inProgress = false;
            resolve(findNewServerFiles(local_index, server_index));
        }); };
        /*
        Begin
         */
        p_fetchIndex()["catch"](function (e) {
            checkForUpdates_inProgress = false;
            reject(e);
        });
    });
}
exports.checkForFormUpdates = checkForFormUpdates;
/**
 * DownloadFormUpdates starts by checking for updates, receiving a list of form updates available
 * It will then download each of these new forms, as well as update the index.json file
 * @returns {Promise<Array<I_FetchFormResult>>}
 */
function downloadFormUpdates() {
    return new Promise(function (resolve, reject) {
        if (downloadFormUpdates_inProgress)
            reject('A downloadFormUpdates operation is already underway');
        else
            downloadFormUpdates_inProgress = true;
        var p_checkForFormUpdates = checkForFormUpdates;
        /*
        Begin
         */
        p_checkForFormUpdates()["catch"](function (e) {
            downloadFormUpdates_inProgress = false;
            reject(e);
        });
    });
}
exports.downloadFormUpdates = downloadFormUpdates;
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
 * @param local_index
 * @param server_index
 */
function findNewServerFiles(local_index, server_index) {
    var needsUpdating = [];
    var localNames = Object.keys(local_index);
    var serverNames = Object.keys(server_index);
    var newServerFiles = _.difference(serverNames, localNames);
    if (newServerFiles.length > 0)
        console.log("Server has new files: [" + newServerFiles + "]");
    needsUpdating = newServerFiles;
    localNames.forEach(function (name) {
        if (server_index[name]) {
            var serverTime = moment(server_index[name].lastModified);
            var localTime = moment(local_index[name].lastModified);
            if (serverTime.isAfter(localTime)) {
                console.log(name + " needs updating");
                needsUpdating.push(name);
            }
        }
    });
    return needsUpdating;
}
function abort() {
    if (checkForUpdates_inProgress || downloadFormUpdates_inProgress) {
        FormFetcher.abort();
    }
}
exports.abort = abort;
