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
        var storage_dir = _path.join(path, BASE_STORAGE_DIRECTORY);
        /*
        Check if the provided path is valid (exists and is directory)
        Reject if not
        Continue on to check if storage folder exists
         */
        var p_check_path_valid = function () { return checkDirectoryIsValid(path).then(function (valid) {
            if (!valid) {
                reject('StorageManager initialization path not valid');
            }
            else {
                return p_check_storage_exists();
            }
        }); };
        /*
        Check storage folder exists at path
        Finish if it does
        Create it if it does not
         */
        var p_check_storage_exists = function () { return fs.exists(storage_dir).then(function (exists) {
            if (exists) {
                return p_finish();
            }
            else {
                return p_create_storage_directory();
            }
        }); };
        /*
        Create storage directory in path
        Then finish
         */
        var p_create_storage_directory = function () { return fs.mkdir(storage_dir).then(function () {
            return p_finish();
        }); };
        /*
        Assign global operational_directory variable
        Resolve
         */
        var p_finish = function () { return new Promise(function () {
            operational_directory = storage_dir;
            resolve();
        }); };
        // Begin
        p_check_path_valid()["catch"](function (e) { return reject(e); });
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
    return new Promise(function (resolve, reject) {
        if (!getOperationalDirectory())
            reject('StorageManager has not been initialized');
        var directory_path = _path.join(getOperationalDirectory(), directory);
        var file_path = _path.join(directory_path, fileName);
        /*
        Check if directory exists
        Continue down chain if exists
        Resolve null if it does not
         */
        var p_check_exist_directory_path = function () { return fs.exists(directory_path).then(function (exists) {
            if (exists) {
                return p_check_exist_file_path();
            }
            else {
                resolve(null); //
            }
        }); };
        /*
        Check if the file exists
        Continue down chain if exists
        Resolve null if it does not
         */
        var p_check_exist_file_path = function () { return fs.exists(file_path).then(function (exists) {
            if (exists) {
                return p_read_file();
            }
            else {
                resolve(null);
            }
        }); };
        /*
        Read the file at directory/fileName
        Decrypt the contents once completed and resolve the decrypted contents
         */
        var p_read_file = function () { return fs.readFile(file_path).then(function (content) {
            var decrypted = aes256.decrypt(ENCRYPTION_KEY, content.toString());
            resolve(decrypted);
        }); };
        // Begin
        p_check_exist_directory_path()["catch"](function (e) { return reject(e); });
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
    return new Promise(function (resolve, reject) {
        if (!getOperationalDirectory())
            reject('StorageManager has not been initialized');
        var directory_path = _path.join(getOperationalDirectory(), directory);
        var file_path = _path.join(directory_path, fileName);
        /*
        Check if directory exists
        Continue down chain if exists
        Create the directory if it does not
         */
        var p_check_exist_directory_path = function () { return fs.exists(directory_path).then(function (exists) {
            if (exists) {
                return p_write_file();
            }
            else {
                return p_create_directory();
            }
        }); };
        /*
        Create the directory path because it does not exist
        Then continue down chain
         */
        var p_create_directory = function () { return fs.mkdir(directory_path).then(function () {
            return p_write_file();
        }); };
        /*
        Encrypt contents then write to file
         */
        var p_write_file = function () {
            var encrypted = aes256.encrypt(ENCRYPTION_KEY, content);
            return fs.writeFile(file_path, encrypted);
        };
        // Begin
        p_check_exist_directory_path()["catch"](function (e) { return reject(e); });
    });
}
/**
 * Runs fs.exists() and fs.stat() on a path to confirm that the path both exists and is a directory
 * @returns {Promise<boolean>}
 */
function checkDirectoryIsValid(path) {
    return new Promise(function (resolve, reject) {
        /*
        Check if path exists
        Continue to stat the path if it does
        Resolve false if it does not
         */
        var p_check_path_exists = function () { return fs.exists(path).then(function (exists) {
            if (exists) {
                return p_stat_path();
            }
            else {
                resolve(false);
            }
        }); };
        /*
        Stat the path to determine if it is a directory
        Resolve the result (true|false)
         */
        var p_stat_path = function () { return fs.stat(path).then(function (stat) {
            resolve(stat.isDirectory());
        }); };
        // Begin
        p_check_path_exists()["catch"](function (e) { return reject(e); });
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
