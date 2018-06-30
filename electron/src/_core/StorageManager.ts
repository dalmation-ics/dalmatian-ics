/**
 * StorageManager is intended for large storage operations.
 *
 * Any read or write methods will return promises.
 */
import * as fs from 'fs-extra'; // https://www.npmjs.com/package/fs-extra
import {Promise} from 'es6-promise';
import * as _path from 'path';

const BASE_STORAGE_DIRECTORY = 'storage'; // Name of directory where all files will be written

const operational_directory: string = null; // The directory StorageManager was initialized with

/**
 *
 * @returns {Promise<void>}
 */
function initialize(path: string): Promise<void> {

    return new Promise<void>((resolve, reject) => {

        checkDirectoryIsValid(path).then(valid => { // Check if provided path exists and is a directory

            if (!valid) {
                reject('StorageManager initialization path is invalid');
            }

        }).then(() => { // Check if path/BASE_STORAGE_DIRECTORY exists

            return fs.exists(_path.join(path, BASE_STORAGE_DIRECTORY));

        }).then(exists => { // Create path/BASE_STORAGE_DIRECTORY if it does not exist

            if (!exists) {

                console.log('Base storage directory does not exist');

                return fs.mkdir(_path.join(path, BASE_STORAGE_DIRECTORY)).then(() => {

                    console.log('Base storage directory created');

                });

            }

        }).then(() => resolve());

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
function read(directory: string, fileName: string): Promise<string> {

    return new Promise<string>((resolve, reject) => {

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
function write(directory: string, fileName: string, content: string): Promise<void> {

    return new Promise<void>((resolve, reject) => {

    });

}

/**
 * Runs fs.exists() and fs.stat() on a path to confirm that the path both exists and is a directory
 * @returns {Promise<boolean>}
 */
function checkDirectoryIsValid(path: string): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        fs.exists(path).then(exists => { // Check if provided path exists

            if (!exists) {
                resolve(false);
            }

        }).then(() => { // Stat the path to check if it is a directory

            return fs.stat(path);

        }).then(stat => { // Check if provided path is a directory

            resolve(stat.isDirectory());

        });

    });

}

export default {
    initialize,
    read,
    write
};


