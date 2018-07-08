import * as ServerMock from 'mock-http-server'; // https://www.npmjs.com/package/mock-http-server
import * as SUT from './FormFetcher';
import * as moment from 'moment';
import * as getIt from 'get-it';

import * as gi_base from 'get-it/lib/middleware/base';
import * as gi_promise from 'get-it/lib/middleware/promise';
import FormDetails from './class/FormDetails';
import {BadServerResponseError, UserCancelledError} from './FormFetcher';

const server = new ServerMock({host: 'localhost', port: 30025});
const mock_getIt_instance = getIt([
    gi_base('http://localhost:30025'),
    gi_promise({onlyBody: true})
]);

const SERVER_INDEX = {
    bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
    bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
    bcics_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'},
};

const ICS205_Content = 'ICS205 Content';
const ICS205_Details = new FormDetails({
    fileName: 'bcics_ICS205',
    name: 'ICS205 A Land Before Time',
    id: 'ICS205',
    detail: 'ICS205 Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});

const ICS206_Content = 'ICS206 Content';
const ICS206_Details = new FormDetails({
    fileName: 'bcics_ICS206',
    name: 'ICS206 Electric Boogaloo',
    id: 'ICS206',
    detail: 'ICS206 Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});

const ICS205A_Content = 'ICS205A Content';
const ICS205A_Details = new FormDetails({
    fileName: 'bcics_ICS205A',
    name: 'ICS205A This time its different',
    id: 'ICS205A',
    detail: 'ICS205A Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});

describe('FormFetcher should ', () => {

    beforeEach((done) => {
        SUT.setGetItInstance(mock_getIt_instance);
        SUT.setTimeout(10000);
        server.start(done);
    });

    afterEach((done) => {
        server.stop(done);
    });

    it('resolve true to be true', () => {

        expect(true).toBe(true);

    });

    describe('has method fetchIndex that ', () => {

        it('exists', () => {

            expect(SUT.fetchIndex).toBeDefined();

        });

        it('can download index', async () => {

            // Arrange
            server.on({
                path: '/index.json',
                reply: buildSuccessResponse(JSON.stringify(SERVER_INDEX))
            });

            // Act
            const result = await SUT.fetchIndex();

            // Assert
            expect(result).toEqual(SERVER_INDEX);

        });

        it('handles empty response', async () => {

            // Arrange
            server.on({
                path: '/index.json',
                reply: ''
            });

            // Act & Assert
            await expect(SUT.fetchIndex()).rejects.toBeInstanceOf(BadServerResponseError);

        });

        it('handles invalid JSON', async () => {

            // Arrange
            server.on({
                path: '/index.json',
                reply: buildSuccessResponse('. 0')
            });

            // Act & Assert
            await expect(SUT.fetchIndex()).rejects.toBeInstanceOf(BadServerResponseError);

        });

        it('handles timeout', async () => {

            // Arrange
            server.on({
                path: '/index.json',
                reply: buildSuccessResponse(JSON.stringify(SERVER_INDEX)),
                delay: 3000
            });

            SUT.setTimeout(50);

            await SUT.fetchIndex().catch(e => {

                expect(e.message).toContain('Socket timed out');

            });

        });

        it('can be aborted', async (done) => {

            // Arrange
            server.on({
                path: '/index.json',
                reply: buildSuccessResponse(JSON.stringify(SERVER_INDEX)),
                delay: 3000
            });

            // Act
            SUT.fetchIndex().catch(e => {
                expect(e).toBeInstanceOf(UserCancelledError);
                done();
            });

            await new Promise(resolve => setTimeout(resolve, 1000));

            SUT.abort();

        });

        it('can be aborted twice', async (done) => {

            // Arrange
            server.on({
                path: '/index.json',
                reply: buildSuccessResponse(JSON.stringify(SERVER_INDEX)),
                delay: 1000
            });

            // Act
            SUT.fetchIndex().catch(async e => {

                expect(e).toBeInstanceOf(UserCancelledError);

                SUT.fetchIndex().catch(async _e => {

                    expect(_e).toBeInstanceOf(UserCancelledError);

                    const result = await SUT.fetchIndex();

                    expect(result).toEqual(SERVER_INDEX);

                    done();

                });

                await new Promise(resolve => setTimeout(resolve, 500));

                SUT.abort();

            });

            await new Promise(resolve => setTimeout(resolve, 500));

            SUT.abort();

        });

    });

    describe('has method fetchForms that ', () => {

        it('exists', () => {

            expect(SUT.fetchForms).toBeDefined();

        });

    });

});

function buildSuccessResponse(body: string, isJson?: boolean) {
    return {
        status: 200,
        headers: {'content-type': isJson ? 'application/json' : 'text/html'},
        body
    };
}