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
var request = require("request-promise"); // https://www.npmjs.com/package/request-promise
var StorageManager_1 = require("./StorageManager");
var _ = require("lodash");
var moment = require("moment");
var DOWNLOAD_DIRECTORY = '/forms';
var TARGET = 'https://s3-us-west-2.amazonaws.com/dalmatian-ics-forms/';
var active_request = null;
/**
 * CheckForUpdates read a local index.json file and compares it to the servers index.json file
 * By comparing the two files the client can determine if there are updates available
 * This will resolve a boolean referencing if updates are available or not
 * @returns {Promise<boolean>}
 */
function checkForUpdates() {
    return new Promise(function (resolve, reject) {
        var index_local = null;
        var index_server = null;
        if (active_request != null) {
            reject('A request is already pending');
        }
        /*
        Read the local index.json file
        If no index.json file exists, updates are most certainly needed. Resolve true
        Else, continue on to download index.json from the server
         */
        var p_get_local_index = function () { return StorageManager_1["default"].read(DOWNLOAD_DIRECTORY, 'index.json').then(function (contents) {
            if (!contents) {
                resolve(true);
            }
            else {
                try {
                    index_local = JSON.parse(contents);
                    return p_download_index();
                }
                catch (e) {
                    reject(e);
                }
            }
        }); };
        /*
        Download the server's index.json file
        If there is no index.json file on the server. Panic
        Else continue on to compare the two files
         */
        var p_download_index = function () {
            active_request = request.get({
                uri: TARGET + "index.json"
            }).then(function (content) {
                active_request = null;
                try {
                    index_server = JSON.parse(content);
                    return p_compare_indexes();
                }
                catch (e) {
                    reject(e);
                }
            }, function (e) {
                active_request = null;
                reject(e);
            });
            return active_request;
        };
        /*
        Compare the two indexes which should be stored in variables index_local and index_server
        Resolve true if findNewServerFiles returns an array with any new server file
         */
        var p_compare_indexes = function () { return new Promise(function () {
            resolve(findNewServerFiles(index_local, index_server).length > 0);
        }); };
        // Begin
        p_get_local_index()["catch"](function (e) { return reject(e); });
    });
}
function downloadNewForms() {
    return new Promise(function (resolve, reject) {
        if (active_request) {
            reject('A request is already pending');
        }
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
function findNewServerFiles(index_local, index_server) {
    var needsUpdating = [];
    var localNames = Object.keys(index_local);
    var serverNames = Object.keys(index_server);
    var newServerFiles = _.difference(serverNames, localNames);
    if (newServerFiles.length > 0)
        console.log("Server has new files: [" + newServerFiles + "]");
    needsUpdating = newServerFiles;
    localNames.forEach(function (name) {
        if (index_server[name]) {
            var serverTime = moment(index_server[name].lastModified);
            var localTime = moment(index_local[name].lastModified);
            if (serverTime.isAfter(localTime)) {
                console.log(name + " needs updating");
                needsUpdating.push(name);
            }
        }
    });
    return needsUpdating;
}
function abort() {
    if (active_request) {
        active_request.cancel();
        active_request = null;
    }
}
function hasActiveRequest() {
    return active_request != null;
}
exports["default"] = {
    checkForUpdates: checkForUpdates,
    downloadNewForms: downloadNewForms,
    abort: abort,
    hasActiveRequest: hasActiveRequest
};
