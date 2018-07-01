"use strict";
exports.__esModule = true;
/**
 * StorageManager is intended for large storage operations.
 *
 * Any read or write methods will return promises.
 */
var fs = require("fs-extra"); // https://www.npmjs.com/package/fs-extra
var aes256 = require("aes256"); // https://www.npmjs.com/package/aes256
var _path = require("path");
var BASE_STORAGE_DIRECTORY = 'storage'; // Name of directory where all files will be written
var ENCRYPTION_KEY = 'dalmatian'; // Encrypt files to deter end user modification of files
var operational_directory = null; // The directory StorageManager was initialized with
/**
 *
 * Ensures that the operational directory exists and is valid before further use
 *
 * Creates the operational directory if it does not exist
 *
 * @returns {Promise<void>}
 */
function initialize(path) {
    return new Promise(function (resolve, reject) {
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
        }).then(function () {
            operational_directory = _path.join(path, BASE_STORAGE_DIRECTORY); // Assign variable operational_directory now that it is initialized
            resolve();
        })["catch"](function (e) { return reject(e); }); // Reject errors
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
    console.log("Read request " + directory + "/" + fileName);
    return new Promise(function (resolve, reject) {
        if (!getOperationalDirectory())
            reject('StorageManager has not been initialized');
        var directory_path = _path.join(getOperationalDirectory(), directory);
        var file_path = _path.join(directory_path, fileName);
        fs.exists(directory_path).then(function (exists) {
            if (!exists) {
                resolve(null); // Resolve null if it does not
            }
            else {
                return fs.exists(file_path).then(function (exists) {
                    if (!exists) {
                        resolve(null); // Resolve null if it does not
                    }
                    else {
                        return fs.readFile(file_path).then(function (content) {
                            var decrypted = aes256.decrypt(ENCRYPTION_KEY, content.toString()); // Decrypt file
                            resolve(decrypted); // Resolve contents
                        });
                    }
                });
            }
        })["catch"](function (e) { return reject(e); }); // Handle errors
    });
}
/**
 *
 * The write function will write content to a stored file of fileName under directory
 *
 * If the directory does not exist it will be created
 *
 * Returns a promise that is resolved when the content is written
 *
 * @param {String} directory
 * @param {String} fileName
 * @param {String} content
 * @returns {Promise<void>}
 */
function write(directory, fileName, content) {
    console.log("Write request " + directory + "/" + fileName);
    return new Promise(function (resolve, reject) {
        if (!getOperationalDirectory())
            reject('StorageManager has not been initialized');
        var directory_path = _path.join(getOperationalDirectory(), directory);
        var file_path = _path.join(directory_path, fileName);
        fs.exists(directory_path).then(function (exists) {
            if (!exists) {
                console.log("Creating directory " + directory);
                return fs.mkdir(directory_path);
            }
            else {
                return fs.stat(directory_path).then(function (stat) {
                    if (!stat.isDirectory()) {
                        console.log(directory + " is not a directory");
                    }
                });
            }
        }).then(function () {
            var encrypted = aes256.encrypt(ENCRYPTION_KEY, content);
            return fs.writeFile(file_path, encrypted);
        }).then(function () {
            resolve();
        })["catch"](function (e) { return reject(e); });
    });
}
/**
 * Runs fs.exists() and fs.stat() on a path to confirm that the path both exists and is a directory
 * @returns {Promise<boolean>}
 */
function checkDirectoryIsValid(path) {
    return new Promise(function (resolve, reject) {
        fs.exists(path).then(function (exists) {
            if (!exists) {
                resolve(false);
            }
            else {
                return fs.stat(path).then(function (stat) {
                    resolve(stat.isDirectory());
                });
            }
        })["catch"](function (e) { return reject(e); });
    });
}
function getOperationalDirectory() {
    return operational_directory;
}
var _exports;
if (process.env.NODE_ENV === 'test') {
    _exports = {
        read: read,
        write: write,
        initialize: initialize,
        getOperationalDirectory: getOperationalDirectory
    };
}
else {
    _exports = {
        read: read,
        write: write,
        initialize: initialize
    };
}
exports["default"] = _exports;
