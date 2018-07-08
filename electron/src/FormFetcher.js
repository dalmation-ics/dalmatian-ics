"use strict";
exports.__esModule = true;
/**
 * FormFetcher is tasked with all of the network requests for forms or the form index.json
 */
var getIt = require("get-it");
var gi_base = require("get-it/lib/middleware/base");
var gi_promise = require("get-it/lib/middleware/promise");
var gi_httpErrors = require("get-it/lib/middleware/httpErrors");
var FormDetails_1 = require("./class/FormDetails");
var target = 'https://s3-us-west-2.amazonaws.com/dalmatian-ics-forms';
var timeout = 10000;
var index_fetch_in_progress = false;
var forms_fetch_in_progress = false;
var cancel_token = gi_promise.CancelToken.source();
exports.DEFAULT_GET_IT = getIt([
    gi_base(target),
    gi_promise({ onlyBody: true }),
    gi_httpErrors()
]);
var request = exports.DEFAULT_GET_IT;
/**
 * Download index.json from the target AWS server
 * Returns a promise that resolves when index.json has been fetched
 * When cancelled, rejects UserCancelledError
 * @returns {Promise<I_ServerIndex>}
 */
function fetchIndex() {
    return new Promise(function (resolve, reject) {
        if (index_fetch_in_progress)
            reject('A fetch operation is already in progress');
        else
            index_fetch_in_progress = true;
        return request({
            url: '/index.json',
            timeout: timeout,
            cancelToken: cancel_token.token
        }).then(function (content) {
            index_fetch_in_progress = false;
            if (content) {
                try {
                    resolve(JSON.parse(content));
                }
                catch (e) {
                    reject(new BadServerResponseError('Server responded with invalid json'));
                }
            }
            else {
                reject(new BadServerResponseError('Server provided empty response'));
            }
        })["catch"](function (e) {
            index_fetch_in_progress = false;
            if (e.constructor.name === 'Cancel') {
                reject(new UserCancelledError());
            }
            else {
                reject(e);
            }
        });
    });
}
exports.fetchIndex = fetchIndex;
/**
 * Download a series of forms as specified by an array of form names in the arguments
 * Returns a promise that resolves when all forms have been fetched
 * When a form download fails, the process will continue on forms which have had successful downloads
 * @param {Array<string>} formNameArray
 * @returns {Promise<Array<I_FetchFormResult>>}
 */
function fetchForms(formNameArray) {
    return new Promise(function (resolve, reject) {
        if (forms_fetch_in_progress)
            reject('A fetch operation is already in progress');
        else
            forms_fetch_in_progress = true;
        var index;
        var out = [];
        module.exports.fetchIndex().then(function (result) {
            index = result;
        }).then(function () {
            return Promise.all(formNameArray.map(function (name) { return new Promise(function (_resolve) {
                request({
                    url: "/" + name + ".html",
                    timeout: timeout,
                    cancelToken: cancel_token.token
                }).then(function (content) {
                    if (content) {
                        console.log("File download " + name + " successful");
                        out.push({
                            name: name,
                            details: FormDetails_1.parseForm(content, name, index[name].lastModified),
                            content: content,
                            error: null,
                            failure: false
                        });
                        _resolve();
                    }
                    else {
                        throw new BadServerResponseError('Server provided empty response');
                    }
                })["catch"](function (e) {
                    console.log("File download " + name + " failed");
                    var error = e.constructor.name === 'Cancel' ? new UserCancelledError() : e;
                    out.push({
                        name: name,
                        details: null,
                        content: null,
                        error: error,
                        failure: true
                    });
                    _resolve();
                });
            }); })).then(function () {
                forms_fetch_in_progress = false;
                resolve(out);
            });
        })["catch"](function (e) {
            forms_fetch_in_progress = false;
            reject(e);
        });
    });
}
exports.fetchForms = fetchForms;
/**
 * Aborts all current requests
 * Any pending requests will be rejected with UserCancelledError
 */
function abort() {
    if (index_fetch_in_progress || forms_fetch_in_progress) {
        cancel_token.cancel(); // Cancel any request
        cancel_token = gi_promise.CancelToken.source(); // Get a new token
    }
}
exports.abort = abort;
/**
 * Set how long (in milliseconds) the fetch should wait before timing out
 * @param {number} millis
 */
function setTimeout(millis) {
    timeout = millis;
}
exports.setTimeout = setTimeout;
/**
 * Set the GetIt request instance. Used for testing purposes
 * @param getItInstance
 */
function setGetItInstance(getItInstance) {
    request = getItInstance;
}
exports.setGetItInstance = setGetItInstance;
function UserCancelledError() {
    this.message = 'User Cancelled';
}
exports.UserCancelledError = UserCancelledError;
function BadServerResponseError(message) {
    this.message = message;
}
exports.BadServerResponseError = BadServerResponseError;
