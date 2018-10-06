import {
    IncorrectTypeError,
    MissingArgumentError,
    FileNotFoundError,
} from '../../_core/error';

import * as fs from 'fs-extra';
import * as os from 'os';

export default class DataManager {
    folder: string = '';

    constructor(folder: string) {

        if (folder === undefined)
            throw new MissingArgumentError('folder');

        this.folder = folder;

    }

    static get root() {
        return `${os.tmpdir()}/Dalmatian_ICS`;
    }

    normalize(name: string) {

        if (name === undefined)
            throw new MissingArgumentError('name');

        if (typeof name !== 'string')
            throw new IncorrectTypeError('string', typeof name, 'name');

        return `${DataManager.root}/${this.folder}/${name}`;
    }

    static initRoot() {
        return new fs.exists(DataManager.root).then((exists: boolean) => {
            if (!exists)
                return fs.mkdir(DataManager.root);
        });
    }

    init() {
        return fs.exists(this.normalize('')).then((exists: boolean) => {
            if (!exists)
                return fs.mkdir(this.normalize(''));
        });
    }

    /**
     * Verify that the data directory exists. If it does, check that the
     * data file of name exists
     */
    exists(name: string) {

        if (name === undefined)
            throw new MissingArgumentError('name');

        if (typeof name !== 'string')
            throw new IncorrectTypeError('string', typeof name, 'name');

        return this.init().then(() => fs.exists(this.normalize(name)));

    }

    /**
     * Read data locally
     * @param name Name of data to be retrieved
     */
    read(name: string) {

        if (name === undefined)
            throw new MissingArgumentError('name');

        if (typeof name !== 'string')
            throw new IncorrectTypeError('string', typeof name, 'name');

        return this.exists(name).then((exists: boolean) => {
            if (!exists)
                throw new FileNotFoundError(this.normalize(name));
            else
                return fs.readFile(this.normalize(name)).then((data: any) => data.toString());
        });

    }

    /**
     * List dir
     */
    dir() {

        return this.init().then(() => {
            return fs.readdir(this.normalize(''));
        });

    }

    /**
     * Save data locally
     * @param name Name of data
     * @param content Content to be written
     */
    write(name: string, content: any) {

        if (name === undefined)
            throw new MissingArgumentError('name');

        if (typeof name !== 'string')
            throw new IncorrectTypeError('string', typeof name, 'name');

        if (content === undefined)
            throw new MissingArgumentError('content');

        if (typeof content !== 'string')
            throw new IncorrectTypeError('string', typeof content, 'content');

        return this.init().then(() => {
            return this.exists(name);
        }).then((exists: boolean) => {
            if (exists)
                return this.delete(name);
        }).then(() => {
            return fs.writeFile(this.normalize(name), content);
        });

    }

    /**
     * Remove data locally
     * @param name Name of data
     */
    delete(name: string) {

        if (name === undefined)
            throw new MissingArgumentError('name');

        if (typeof name !== 'string')
            throw new IncorrectTypeError('string', typeof name, 'name');

        return fs.remove(this.normalize(name));
    }

}
