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
// import * as request from 'request-promise'; // https://www.npmjs.com/package/request-promise
var getIt = require("get-it");
var StorageManager_1 = require("./StorageManager");
var _ = require("lodash");
var moment = require("moment");
var gi_base = require("get-it/lib/middleware/base");
var gi_promise = require("get-it/lib/middleware/promise");
var FormDetails_1 = require("./class/FormDetails");
var DOWNLOAD_DIRECTORY = '/forms';
var target = 'https://s3-us-west-2.amazonaws.com/dalmatian-ics-forms';
var timeout = 20000;
var request = getIt([
    gi_base(target),
    gi_promise({ onlyBody: true })
]);
var update_process_active = false;
var cancel_token = gi_promise.CancelToken.source();
var isAborting = false;
/**
 * CheckForUpdates read a local index.json file and compares it to the servers index.json file
 * By comparing the two files the client can determine if there are updates available
 * This will resolve an array containing the names of files which require updating
 * @returns {Promise<boolean>}
 */
function checkForUpdates() {
    return new Promise(function (resolve, reject) {
        var index_local = null;
        var index_server = null;
        if (update_process_active == true) {
            reject('An update process is already underway');
        }
        update_process_active = true;
        /*
        Read the local index.json file
        If no index.json file exists, updates are most certainly needed. Resolve true
        Else, continue on to download index.json from the server
         */
        var p_get_local_index = function () { return StorageManager_1["default"].read(DOWNLOAD_DIRECTORY, 'index.json').then(function (contents) {
            if (!isAborting) {
                if (!contents) {
                    index_local = {};
                    return p_download_index();
                }
                else {
                    try {
                        index_local = JSON.parse(contents);
                        return p_download_index();
                    }
                    catch (e) {
                        update_process_active = false;
                        reject(e);
                    }
                }
            }
            else {
                update_process_active = false;
                isAborting = false;
                reject(new UserCancelledError());
            }
        }); };
        /*
        Download the server's index.json file
        If there is no index.json file on the server. Panic
        Else continue on to compare the two files
         */
        var p_download_index = function () { return request({
            url: "/index.json",
            timeout: timeout,
            cancelToken: cancel_token.token
        }).then(function (content) {
            if (!content) {
                reject('Server response empty');
            }
            else {
                try {
                    index_server = JSON.parse(content);
                    return p_compare_indexes();
                }
                catch (e) {
                    isAborting = false;
                    update_process_active = false;
                    reject(e);
                }
            }
        }, function (e) {
            update_process_active = false;
            isAborting = false;
            if (e.constructor.name === 'Cancel') {
                reject(new UserCancelledError());
            }
            else {
                reject(e);
            }
        }); };
        /*
        Compare the two indexes which should be stored in variables index_local and index_server
        Resolve true if findNewServerFiles returns an array with any new server file
         */
        var p_compare_indexes = function () { return new Promise(function () {
            resolve(findNewServerFiles(index_local, index_server));
            isAborting = false;
            update_process_active = false;
        }); };
        // Begin
        p_get_local_index()["catch"](function (e) {
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
function downloadNewForms() {
    return new Promise(function (resolve, reject) {
        if (update_process_active == true) {
            reject('An update process is already underway');
        }
        var failed = [];
        var writeQueue = [];
        var WriteQueueObject = /** @class */ (function () {
            function WriteQueueObject(content, formDetails) {
                this.content = content;
                this.formDetails = formDetails;
            }
            return WriteQueueObject;
        }());
        var p_get_new_forms = function () { return module.exports["default"].checkForUpdates().then(function (needsUpdating) {
            return Promise.all(needsUpdating.map(function (file) { return new Promise(function (_resolve, _reject) {
                request({
                    url: "/" + file + ".html",
                    timeout: timeout,
                    cancelToken: cancel_token.token
                }).then(function (content) {
                    console.log("Success " + file);
                    try {
                        var formDetails = FormDetails_1.parseForm(content, file, '');
                        writeQueue.push(new WriteQueueObject(content, formDetails));
                        _resolve();
                    }
                    catch (e) {
                        _reject(e);
                    }
                })["catch"](function (e) {
                    console.log("Failed " + file + ": " + e);
                    failed.push(file);
                    _resolve();
                });
            }); }));
        }).then(function () { return p_process_write_queue(); }); };
        var p_process_write_queue = function () { return Promise.all(writeQueue.map(function (writeQueueObject) {
            return StorageManager_1["default"].write(DOWNLOAD_DIRECTORY, writeQueueObject.formDetails.fileName + ".html", writeQueueObject.content);
        })).then(function () {
            return p_update_index();
        }); };
        var p_update_index = function () { return request({
            url: '/index.json',
            timeout: timeout,
            cancelToken: cancel_token.token
        })
            .then(function (content) { return JSON.parse(content); })
            .then(function (index) {
        }); };
        // Begin
        p_get_new_forms()["catch"](function (e) { return reject(e); });
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
function fetch_index() {
    return request({
        url: '/index.json',
        timeout: timeout,
        cancelToken: cancel_token.token
    }).then(function (content) { return JSON.parse(content); });
}
function abort() {
    if (update_process_active) {
        cancel_token.cancel();
        cancel_token = gi_promise.CancelToken.source();
        isAborting = true;
    }
}
function setGetItRequest(getItRequestObject) {
    request = getItRequestObject;
}
function setTimeout(millis) {
    timeout = millis;
}
exports["default"] = {
    checkForUpdates: checkForUpdates,
    downloadNewForms: downloadNewForms,
    setTimeout: setTimeout,
    abort: abort,
    setGetItRequest: setGetItRequest
};
