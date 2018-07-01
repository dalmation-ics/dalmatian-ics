/**
 * StorageManager is intended for large storage operations.
 *
 * Any read or write methods will return promises.
 */
import * as fs from 'fs-extra'; // https://www.npmjs.com/package/fs-extra
import * as aes256 from 'aes256'; // https://www.npmjs.com/package/aes256
import * as _path from 'path';

const BASE_STORAGE_DIRECTORY = 'storage'; // Name of directory where all files will be written
const ENCRYPTION_KEY = 'dalmatian'; // Encrypt files to deter end user modification of files

let operational_directory: string = null; // The directory StorageManager was initialized with

/**
 *
 * Ensures that the operational directory exists and is valid before further use
 *
 * Creates the operational directory if it does not exist
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

        }).then(() => {

            operational_directory = _path.join(path, BASE_STORAGE_DIRECTORY); // Assign variable operational_directory now that it is initialized
            resolve();

        }).catch(e => reject(e)); // Reject errors

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

    console.log(`Read request ${directory}/${fileName}`);

    return new Promise<string>((resolve, reject) => {

        if (!operational_directory)
            reject('StorageManager has not been initialized');

        const directory_path = _path.join(operational_directory, directory);
        const file_path = _path.join(directory_path, fileName);

        checkDirectoryIsValid(directory_path).then(valid => { // Check if directory is valid

            if (!valid) {
                reject(`Directory ${directory} is not valid`);
            }

        }).then(() => { // Check if file exists

            return fs.exists(file_path);

        }).then(exists => { // Return null if the file does not exist

            if (!exists) {
                resolve(null);
            }

        }).then(() => { // Read the file

            return fs.readFile(file_path);

        }).then(content => { // Resolve the decrypted content

            const decrypted = aes256.decrypt(ENCRYPTION_KEY, content.toString());

            resolve(decrypted);

        }).catch(e => reject(e)); // Reject errors

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
function write(directory: string, fileName: string, content: string): Promise<void> {

    console.log(`Write request ${directory}/${fileName}`);

    return new Promise<void>((resolve, reject) => {

        if (!operational_directory)
            reject('StorageManager has not been initialized');

        const directory_path = _path.join(operational_directory, directory);
        const file_path = _path.join(directory_path, fileName);

        fs.exists(directory_path).then(exists => { // Check if directory exists

            if (!exists) { // Create the directory if it does not exist

                console.log(`Creating directory ${directory}`);

                return fs.mkdir(directory_path);

            } else {

                return fs.stat(directory_path).then(stat => { // Stat the existing directory to ensure it is, in fact, a directory

                    if (!stat.isDirectory()) {
                        console.log(`${directory} is not a directory`);
                    }

                });

            }

        }).then(() => { // Write file

            const encrypted = aes256.encrypt(ENCRYPTION_KEY, content);

            return fs.writeFile(file_path, encrypted);

        }).then(() => {

            resolve();

        }).catch(e => reject(e));

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
            } else {
                return fs.stat(path).then(stat => {
                    resolve(stat.isDirectory());
                });
            }

        }).catch(e => reject(e));

    });

}

export default {
    initialize,
    read,
    write
};


