"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * StorageManager is intended for large storage operations.
 *
 * Any read or write methods will return promises.
 */
var fs = require("fs-extra"); // https://www.npmjs.com/package/fs-extra
var es6_promise_1 = require("es6-promise");
var _path = require("path");
var BASE_STORAGE_DIRECTORY = 'storage'; // Name of directory where all files will be written
var operational_directory = null; // The directory StorageManager was initialized with
/**
 *
 * @returns {Promise<void>}
 */
function initialize(path) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        checkDirectoryIsValid(path).then(function (valid) {
            if (!valid) {
                reject('StorageManager initialization path is invalid');
            }
        }).then(function () {
            return fs.exists(_path.join(path, BASE_STORAGE_DIRECTORY));
        }).then(function (exists) {
            if (!exists) {
                console.log('Base storage directory does not exist');
                return fs.mkdir(_path.join(path, BASE_STORAGE_DIRECTORY)).then(function () {
                    console.log('Base storage directory created');
                });
            }
        }).then(function () { return resolve(); });
    });
}
/**
 *
 * The read function will return the content of a stored file of fileName under directory
 *
 * Returns a promise that is resolved when the content is loaded
 *
 * Resolves null if the file does not exist
 *
 * @param {String} directory
 * @param {String} fileName
 * @returns {Promise<string>}
 */
function read(directory, fileName) {
    return new es6_promise_1.Promise(function (resolve, reject) {
    });
}
/**
 *
 * The write function will write content to a stored file of fileName under directory
 *
 * Returns a promise that is resolved when the content is written
 *
 * @param {String} directory
 * @param {String} fileName
 * @param {String} content
 * @returns {Promise<void>}
 */
function write(directory, fileName, content) {
    return new es6_promise_1.Promise(function (resolve, reject) {
    });
}
/**
 * Runs fs.exists() and fs.stat() on a path to confirm that the path both exists and is a directory
 * @returns {Promise<boolean>}
 */
function checkDirectoryIsValid(path) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        fs.exists(path).then(function (exists) {
            if (!exists) {
                resolve(false);
            }
        }).then(function () {
            return fs.stat(path);
        }).then(function (stat) {
            resolve(stat.isDirectory());
        });
    });
}
exports.default = {
    initialize: initialize,
    read: read,
    write: write
};
