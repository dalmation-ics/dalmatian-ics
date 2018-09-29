import * as ServerMock from 'mock-http-server'; // https://www.npmjs.com/package/mock-http-server
import * as SUT from './FormFetcher';
import * as getIt from 'get-it';
import * as sinon from 'sinon';
import FormDetails from './class/form/index';
import * as _FormDetails from './class/form/index';

import * as gi_base from 'get-it/lib/middleware/base';
import * as gi_promise from 'get-it/lib/middleware/promise';
import {BadServerResponseError, UserCancelledError} from './FormFetcher';

let sandbox;
const server = new ServerMock({host: 'localhost', port: 30025});
const mock_getIt_instance = getIt([
    gi_base('http://localhost:30025'),
    gi_promise({onlyBody: true})
]);

const SERVER_INDEX = {
    dalmatian_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
    dalmatian_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
    dalmatian_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'},
};

const ICS205_Content = 'ICS205 Content';
const ICS205_Details = new FormDetails({
    fileName: 'dalmatian_ICS205',
    name: 'ICS205 A Land Before Time',
    id: 'ICS205',
    detail: 'ICS205 Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});

const ICS206_Content = 'ICS206 Content';
const ICS206_Details = new FormDetails({
    fileName: 'dalmatian_ICS206',
    name: 'ICS206 Electric Boogaloo',
    id: 'ICS206',
    detail: 'ICS206 Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});

const ICS205A_Content = 'ICS205A Content';
const ICS205A_Details = new FormDetails({
    fileName: 'dalmatian_ICS205A',
    name: 'ICS205A This time its different',
    id: 'ICS205A',
    detail: 'ICS205A Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});

describe('FormFetcher should ', () => {

    beforeEach((done) => {
        sandbox = sinon.createSandbox();
        SUT.setGetItInstance(mock_getIt_instance);
        SUT.setTimeout(10000);
        server.start(done);
    });

    afterEach((done) => {
        sandbox.restore();
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

        it('can download forms', async () => {

            // Arrange
            sandbox.stub(SUT, 'fetchIndex').resolves(SERVER_INDEX);

            server.on({
                path: '/dalmatian_ICS205.html',
                reply: buildSuccessResponse(ICS205_Content)
            });

            server.on({
                path: '/dalmatian_ICS206.html',
                reply: buildSuccessResponse(ICS206_Content)
            });

            server.on({
                path: '/dalmatian_ICS205A.html',
                reply: buildSuccessResponse(ICS205A_Content)
            });

            const stub_parseForm = sandbox.stub(_FormDetails, 'parseFormTemplate');
            stub_parseForm.withArgs(ICS205_Content).returns(ICS205_Details);
            stub_parseForm.withArgs(ICS206_Content).returns(ICS206_Details);
            stub_parseForm.withArgs(ICS205A_Content).returns(ICS205A_Details);

            // Act
            const result = await SUT.fetchForms(['dalmatian_ICS205', 'dalmatian_ICS206', 'dalmatian_ICS205A']);

            // Assert
            expect(result).toContainEqual({
                fileName: 'dalmatian_ICS205',
                content: ICS205_Content,
                details: ICS205_Details,
                failure: false,
                error: null
            });

            expect(result).toContainEqual({
                fileName: 'dalmatian_ICS206',
                content: ICS206_Content,
                details: ICS206_Details,
                failure: false,
                error: null
            });

            expect(result).toContainEqual({
                fileName: 'dalmatian_ICS205A',
                content: ICS205A_Content,
                details: ICS205A_Details,
                failure: false,
                error: null
            });

        });

        it('can handle single file empty response', async () => {

            // Arrange
            sandbox.stub(SUT, 'fetchIndex').resolves(SERVER_INDEX);

            server.on({
                path: '/dalmatian_ICS205.html',
                reply: buildSuccessResponse(ICS205_Content)
            });

            server.on({
                path: '/dalmatian_ICS206.html',
                reply: buildSuccessResponse('')
            });

            server.on({
                path: '/dalmatian_ICS205A.html',
                reply: buildSuccessResponse(ICS205A_Content)
            });

            const stub_parseForm = sandbox.stub(_FormDetails, 'parseFormTemplate');
            stub_parseForm.withArgs(ICS205_Content).returns(ICS205_Details);
            stub_parseForm.withArgs(ICS206_Content).returns(ICS206_Details);
            stub_parseForm.withArgs(ICS205A_Content).returns(ICS205A_Details);

            // Act
            const result = await SUT.fetchForms(['dalmatian_ICS205', 'dalmatian_ICS206', 'dalmatian_ICS205A']);

            // Assert
            expect(result).toContainEqual({
                fileName: 'dalmatian_ICS205',
                content: ICS205_Content,
                details: ICS205_Details,
                failure: false,
                error: null
            });

            expect(result).toContainEqual({
                fileName: 'dalmatian_ICS206',
                content: null,
                details: null,
                failure: true,
                error: new BadServerResponseError('Server provided empty response')
            });

            expect(result).toContainEqual({
                fileName: 'dalmatian_ICS205A',
                content: ICS205A_Content,
                details: ICS205A_Details,
                failure: false,
                error: null
            });

        });

        it('can handle multiple file timeout', async () => {

            // Arrange
            sandbox.stub(SUT, 'fetchIndex').resolves(SERVER_INDEX);

            SUT.setTimeout(300);

            server.on({
                path: '/dalmatian_ICS205.html',
                reply: buildSuccessResponse(ICS205_Content),
                delay: 3000
            });

            server.on({
                path: '/dalmatian_ICS206.html',
                reply: buildSuccessResponse(ICS206_Content)
            });

            server.on({
                path: '/dalmatian_ICS205A.html',
                reply: buildSuccessResponse(ICS205A_Content),
                delay: 3000
            });

            const stub_parseForm = sandbox.stub(_FormDetails, 'parseFormTemplate');
            stub_parseForm.withArgs(ICS205_Content).returns(ICS205_Details);
            stub_parseForm.withArgs(ICS206_Content).returns(ICS206_Details);
            stub_parseForm.withArgs(ICS205A_Content).returns(ICS205A_Details);

            // Act
            const result = await SUT.fetchForms(['dalmatian_ICS205', 'dalmatian_ICS206', 'dalmatian_ICS205A']);

            // Assert
            expect(result).toContainEqual({
                fileName: 'dalmatian_ICS205',
                content: null,
                details: null,
                failure: true,
                error: new Error('Socket timed out on request')
            });

            expect(result).toContainEqual({
                fileName: 'dalmatian_ICS206',
                content: ICS206_Content,
                details: ICS206_Details,
                failure: false,
                error: null
            });

            expect(result).toContainEqual({
                fileName: 'dalmatian_ICS205A',
                content: null,
                details: null,
                failure: true,
                error: new Error('Socket timed out on request')
            });

        });

        it('can handle rejection from getIndex', async () => {

            // Arrange
            const stub_fetchIndex = sandbox.stub(SUT,'fetchIndex');
            stub_fetchIndex.rejects(new UserCancelledError());

            // Act & Assert
            await expect(SUT.fetchForms(['dalmatian_ICS205', 'dalmatian_ICS206', 'dalmatian_ICS205A'])).rejects.toBeInstanceOf(UserCancelledError);

        });

        it('can be aborted', async (done) => {

            // Arrange
            sandbox.stub(SUT, 'fetchIndex').resolves(SERVER_INDEX);

            server.on({
                path: '/dalmatian_ICS205.html',
                reply: buildSuccessResponse(ICS205_Content),
                delay: 2000
            });

            server.on({
                path: '/dalmatian_ICS206.html',
                reply: buildSuccessResponse(ICS206_Content)
            });

            server.on({
                path: '/dalmatian_ICS205A.html',
                reply: buildSuccessResponse(ICS205A_Content),
                delay: 2000
            });

            const stub_parseForm = sandbox.stub(_FormDetails, 'parseFormTemplate');
            stub_parseForm.withArgs(ICS205_Content).returns(ICS205_Details);
            stub_parseForm.withArgs(ICS206_Content).returns(ICS206_Details);
            stub_parseForm.withArgs(ICS205A_Content).returns(ICS205A_Details);

            // Act
            SUT.fetchForms(['dalmatian_ICS205', 'dalmatian_ICS206', 'dalmatian_ICS205A']).then(result => {

                // Assert
                expect(result).toContainEqual({
                    fileName: 'dalmatian_ICS205',
                    content: null,
                    details: null,
                    failure: true,
                    error: new UserCancelledError()
                });

                expect(result).toContainEqual({
                    fileName: 'dalmatian_ICS206',
                    content: ICS206_Content,
                    details: ICS206_Details,
                    failure: false,
                    error: null
                });

                expect(result).toContainEqual({
                    fileName: 'dalmatian_ICS205A',
                    content: null,
                    details: null,
                    failure: true,
                    error: new UserCancelledError()
                });

                done();

            });

            await new Promise(resolve => setTimeout(resolve, 1000));

            SUT.abort();

        });

        it('can be aborted twice', async (done) => {

            // Arrange
            sandbox.stub(SUT, 'fetchIndex').resolves(SERVER_INDEX);

            server.on({
                path: '/dalmatian_ICS205.html',
                reply: buildSuccessResponse(ICS205_Content),
                delay: 2000
            });

            server.on({
                path: '/dalmatian_ICS206.html',
                reply: buildSuccessResponse(ICS206_Content)
            });

            server.on({
                path: '/dalmatian_ICS205A.html',
                reply: buildSuccessResponse(ICS205A_Content),
                delay: 2000
            });

            const stub_parseForm = sandbox.stub(_FormDetails, 'parseFormTemplate');
            stub_parseForm.withArgs(ICS205_Content).returns(ICS205_Details);
            stub_parseForm.withArgs(ICS206_Content).returns(ICS206_Details);
            stub_parseForm.withArgs(ICS205A_Content).returns(ICS205A_Details);

            // Act
            SUT.fetchForms(['dalmatian_ICS205', 'dalmatian_ICS206', 'dalmatian_ICS205A']).then(async _result => {

                // Assert
                expect(_result).toContainEqual({
                    fileName: 'dalmatian_ICS205',
                    content: null,
                    details: null,
                    failure: true,
                    error: new UserCancelledError()
                });

                expect(_result).toContainEqual({
                    fileName: 'dalmatian_ICS206',
                    content: ICS206_Content,
                    details: ICS206_Details,
                    failure: false,
                    error: null
                });

                expect(_result).toContainEqual({
                    fileName: 'dalmatian_ICS205A',
                    content: null,
                    details: null,
                    failure: true,
                    error: new UserCancelledError()
                });

                SUT.fetchForms(['dalmatian_ICS205', 'dalmatian_ICS206', 'dalmatian_ICS205A']).then(async result => {

                    // Assert
                    expect(_result).toContainEqual({
                        fileName: 'dalmatian_ICS205',
                        content: null,
                        details: null,
                        failure: true,
                        error: new UserCancelledError()
                    });

                    expect(_result).toContainEqual({
                        fileName: 'dalmatian_ICS206',
                        content: ICS206_Content,
                        details: ICS206_Details,
                        failure: false,
                        error: null
                    });

                    expect(_result).toContainEqual({
                        fileName: 'dalmatian_ICS205A',
                        content: null,
                        details: null,
                        failure: true,
                        error: new UserCancelledError()
                    });

                    const final_result = await SUT.fetchForms(['dalmatian_ICS205', 'dalmatian_ICS206', 'dalmatian_ICS205A']);

                    // Assert
                    expect(final_result).toContainEqual({
                        fileName: 'dalmatian_ICS205',
                        content: ICS205_Content,
                        details: ICS205_Details,
                        failure: false,
                        error: null
                    });

                    expect(final_result).toContainEqual({
                        fileName: 'dalmatian_ICS206',
                        content: ICS206_Content,
                        details: ICS206_Details,
                        failure: false,
                        error: null
                    });

                    expect(final_result).toContainEqual({
                        fileName: 'dalmatian_ICS205A',
                        content: ICS205A_Content,
                        details: ICS205A_Details,
                        failure: false,
                        error: null
                    });

                    done();

                });

                await new Promise(resolve => setTimeout(resolve, 1000));

                SUT.abort();

            });

            await new Promise(resolve => setTimeout(resolve, 1000));

            SUT.abort();

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
