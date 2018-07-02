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
 * Rejects if it is not valid
 *
 * @returns {Promise<void>}
 */
function initialize(path: string): Promise<void> {

    return new Promise<void>((resolve, reject) => {

        const storage_dir = _path.join(path, BASE_STORAGE_DIRECTORY);

        /*
        Check if the provided path is valid (exists and is directory)
        Reject if not
        Continue on to check if storage folder exists
         */
        const p_check_path_valid = () => checkDirectoryIsValid(path).then(valid => {

            if (!valid) {
                reject('StorageManager initialization path not valid');
            } else {
                return p_check_storage_exists();
            }
        });

        /*
        Check storage folder exists at path
        Finish if it does
        Create it if it does not
         */
        const p_check_storage_exists = () => fs.exists(storage_dir).then(exists => {

            if (exists) {
                return p_finish();
            } else {
                return p_create_storage_directory();
            }

        });

        /*
        Create storage directory in path
        Then finish
         */
        const p_create_storage_directory = () => fs.mkdir(storage_dir).then(() => {
            return p_finish();
        });

        /*
        Assign global operational_directory variable
        Resolve
         */
        const p_finish = () => new Promise(() => {
            operational_directory = storage_dir;
            resolve();
        });

        // Begin
        p_check_path_valid().catch(e => reject(e));

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

        if (!getOperationalDirectory())
            reject('StorageManager has not been initialized');

        const directory_path = _path.join(getOperationalDirectory(), directory);
        const file_path = _path.join(directory_path, fileName);

        /*
        Check if directory exists
        Continue down chain if exists
        Resolve null if it does not
         */
        const p_check_exist_directory_path = () => fs.exists(directory_path).then(exists => {

            if (exists) {
                return p_check_exist_file_path();
            } else {
                resolve(null); //
            }

        });

        /*
        Check if the file exists
        Continue down chain if exists
        Resolve null if it does not
         */
        const p_check_exist_file_path = () => fs.exists(file_path).then(exists => {

            if (exists) {
                return p_read_file();
            } else {
                resolve(null);
            }

        });

        /*
        Read the file at directory/fileName
        Decrypt the contents once completed and resolve the decrypted contents
         */
        const p_read_file = () => fs.readFile(file_path).then(content => {

            const decrypted = aes256.decrypt(ENCRYPTION_KEY, content.toString());
            resolve(decrypted);

        });

        // Begin
        p_check_exist_directory_path().catch(e => reject(e));

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

    return new Promise<void>((resolve, reject) => {

        if (!getOperationalDirectory())
            reject('StorageManager has not been initialized');

        const directory_path = _path.join(getOperationalDirectory(), directory);
        const file_path = _path.join(directory_path, fileName);

        /*
        Check if directory exists
        Continue down chain if exists
        Create the directory if it does not
         */
        const p_check_exist_directory_path = () => fs.exists(directory_path).then(exists => {

            if (exists) {
                return p_write_file();
            } else {
                return p_create_directory();
            }

        });

        /*
        Create the directory path because it does not exist
        Then continue down chain
         */
        const p_create_directory = () => fs.mkdir(directory_path).then(() => {
            return p_write_file();
        });

        /*
        Encrypt contents then write to file
         */
        const p_write_file = () => {

            const encrypted = aes256.encrypt(ENCRYPTION_KEY, content);
            return fs.writeFile(file_path, encrypted);

        };

        // Begin
        p_check_exist_directory_path().catch(e => reject(e));

    });

}

/**
 * Runs fs.exists() and fs.stat() on a path to confirm that the path both exists and is a directory
 * @returns {Promise<boolean>}
 */
function checkDirectoryIsValid(path: string): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        /*
        Check if path exists
        Continue to stat the path if it does
        Resolve false if it does not
         */
        const p_check_path_exists = () => fs.exists(path).then(exists => {

            if (exists) {
                return p_stat_path();
            } else {
                resolve(false);
            }

        });

        /*
        Stat the path to determine if it is a directory
        Resolve the result (true|false)
         */
        const p_stat_path = () => fs.stat(path).then(stat => {

            resolve(stat.isDirectory());

        });

        // Begin
        p_check_path_exists().catch(e => reject(e));

    });

}

function getOperationalDirectory() {
    return operational_directory;
}

export class StorageClass {

    directory: string;

    constructor(directory: string) {
        this.directory = directory;
    }

    read(fileName: string) {
        return read(this.directory, fileName);
    }

    write(fileName: string, content: string) {
        return write(this.directory, fileName, content);
    }

}

let _exports;
if (process.env.NODE_ENV === 'test') {
    _exports = {
        read,
        write,
        initialize,
        getOperationalDirectory
    };
} else {
    _exports = {
        read,
        write,
        initialize
    };
}

export default _exports;

