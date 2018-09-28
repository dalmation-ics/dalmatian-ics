/**
 * FormFetcher is tasked with all of the network requests for forms or the form index.json
 */
import * as getIt from 'get-it';
import * as gi_base from 'get-it/lib/middleware/base';
import * as gi_promise from 'get-it/lib/middleware/promise';
import * as gi_httpErrors from 'get-it/lib/middleware/httpErrors';
import FormDetails, {parseForm} from './class/form/index';

const target = 'https://s3-us-west-2.amazonaws.com/dalmatian-ics-forms';

let timeout: number = 10000;
let index_fetch_in_progress: boolean = false;
let forms_fetch_in_progress: boolean = false;
let cancel_token = gi_promise.CancelToken.source();

export const DEFAULT_GET_IT = getIt([
    gi_base(target),
    gi_promise({onlyBody: true}),
    gi_httpErrors()
]);

let request = DEFAULT_GET_IT;

/**
 * Download index.json from the target AWS server
 * Returns a promise that resolves when index.json has been fetched
 * When cancelled, rejects UserCancelledError
 * @returns {Promise<I_ServerIndex>}
 */
export function fetchIndex(): Promise<I_ServerIndex> {

    return new Promise((resolve, reject) => {

        if (index_fetch_in_progress)
            reject('A fetch operation is already in progress');
        else
            index_fetch_in_progress = true;

        return request({
            url: '/index.json',
            timeout,
            cancelToken: cancel_token.token
        }).then(content => {

            index_fetch_in_progress = false;
            if (content) {
                try {
                    resolve(JSON.parse(content));
                } catch (e) {
                    reject(new BadServerResponseError('Server responded with invalid json'));
                    index_fetch_in_progress = false;
                }
            } else {
                reject(new BadServerResponseError('Server provided empty response'));
                index_fetch_in_progress = false;
            }

        }).catch(e => {

            index_fetch_in_progress = false;
            if (e.constructor.name === 'Cancel') {
                reject(new UserCancelledError());
            } else {
                reject(e);
            }

        });

    });

}

/**
 * Download a series of forms as specified by an array of form names in the arguments
 * Returns a promise that resolves when all forms have been fetched
 * When a form download fails, the process will continue on forms which have had successful downloads
 * @param {Array<string>} formNameArray
 * @returns {Promise<Array<I_FetchFormResult>>}
 */
export function fetchForms(formNameArray: Array<string>): Promise<Array<I_FetchFormResult>> {

    return new Promise((resolve, reject) => {

        if (forms_fetch_in_progress)
            reject('A fetch operation is already in progress');
        else
            forms_fetch_in_progress = true;

        let index: I_FetchFormResult;
        const out: Array<I_FetchFormResult> = [];

        module.exports.fetchIndex().then(result => {

            index = result;

        }).then(() => {

            return Promise.all(formNameArray.map(name => new Promise((_resolve) => {

                request({
                    url: `/${name}.html`,
                    timeout,
                    cancelToken: cancel_token.token
                }).then(content => {

                    if (content) {
                        console.log(`File download ${name} successful`);
                        out.push({
                            fileName: name,
                            details: parseForm(content, name, index[name].lastModified),
                            content: content,
                            error: null,
                            failure: false
                        });
                        _resolve();
                    } else {
                        throw new BadServerResponseError('Server provided empty response');
                    }

                }).catch(e => {

                    console.log(`File download ${name} failed`);
                    let error = e.constructor.name === 'Cancel' ? new UserCancelledError() : e;
                    out.push({
                        fileName: name,
                        details: null,
                        content: null,
                        error: error,
                        failure: true
                    });
                    _resolve();

                });

            }))).then(() => {

                forms_fetch_in_progress = false;
                resolve(out);

            });

        }).catch(e => {

            forms_fetch_in_progress = false;
            reject(e);

        });

    });

}

/**
 * Aborts all current requests
 * Any pending requests will be rejected with UserCancelledError
 */
export function abort() {
    if (index_fetch_in_progress || forms_fetch_in_progress) {
        cancel_token.cancel(); // Cancel any request
        cancel_token = gi_promise.CancelToken.source(); // Get a new token
    }
}

/**
 * Set how long (in milliseconds) the fetch should wait before timing out
 * @param {number} millis
 */
export function setTimeout(millis: number) {
    timeout = millis;
}

/**
 * Set the GetIt request instance. Used for testing purposes
 * @param getItInstance
 */
export function setGetItInstance(getItInstance) {
    request = getItInstance;
}

export interface I_FetchFormResult {
    fileName: string,
    content: string
    details: FormDetails
    failure: boolean
    error: Error
}

export interface I_ServerIndex {
    [form: string]: {
        lastModified: string
    }
}

export function UserCancelledError() {
    this.message = 'User Cancelled';
}

export function BadServerResponseError(message: string) {
    this.message = message;
}

