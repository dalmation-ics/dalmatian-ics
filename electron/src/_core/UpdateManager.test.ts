import * as sinon from 'sinon'; // http://sinonjs.org/releases/v2.0.0/
import * as ServerMock from 'mock-http-server'; // https://www.npmjs.com/package/mock-http-server
import SUT, {UserCancelledError} from './UpdateManager';
import StorageManager from './StorageManager';
import * as getIt from 'get-it';

import * as gi_base from 'get-it/lib/middleware/base';
import * as gi_promise from 'get-it/lib/middleware/promise';

const server = new ServerMock({host: 'localhost', port: 30025});
const request = getIt([
    gi_base('http://localhost:30025'),
    gi_promise({onlyBody: true})
]);

let sandbox;

describe('UpdateManager should ', () => {

    beforeAll(() => {
        SUT.setGetItRequest(request);
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        SUT.setGetItRequest(request);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('resolve true to be true', () => {

        expect(true).toBe(true);

    });

    describe('has method checkForUpdates that ', () => {

        beforeEach((done) => {
            server.start(done);
        });

        afterEach((done) => {
            server.stop(done);
        });

        it('exists', () => {

            expect(SUT.checkForUpdates).toBeDefined();

        });

        it('loads local index, downloads server index, and compares the two, resolving empty array', async () => {

            // Arrange
            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({
                bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS213: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS217A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS309: {lastModified: '2018-05-18T12:37:21-07:00'}
            }));

            server.on({
                method: 'GET',
                path: '/index.json',
                reply: {
                    status: 200,
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS213: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS214: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS214A: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS217A: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS309: {lastModified: '2018-05-18T12:37:21-07:00'}
                    })
                }
            });

            // Act
            const result = await SUT.checkForUpdates().catch(e => console.log(e));

            // Assert
            expect(result).toEqual([]);

        });

        it('loads local index, downloads server index, and compares the two, resolving updates needed due to new version', async () => {

            // Arrange
            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({
                bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS213: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS217A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS309: {lastModified: '2018-05-18T12:37:21-07:00'}
            }));

            server.on({
                method: 'GET',
                path: '/index.json',
                reply: {
                    status: 200,
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS206: {lastModified: '2018-06-18T12:37:21-07:00'}, // New Version
                        bcics_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS213: {lastModified: '2018-06-18T12:37:21-07:00'}, // New version
                        bcics_ICS214: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS214A: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS217A: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS309: {lastModified: '2018-05-18T12:37:21-07:00'}
                    })
                }
            });

            // Act
            const result = await SUT.checkForUpdates();

            // Assert
            expect(result).toEqual(['bcics_ICS206', 'bcics_ICS213']);

        });

        it('loads local index, downloads server index, and compares the two, resolving updates needed due to new file', async () => {

            // Arrange
            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({
                bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS213: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS309: {lastModified: '2018-05-18T12:37:21-07:00'}
            }));

            server.on({
                method: 'GET',
                path: '/index.json',
                reply: {
                    status: 200,
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'}, // New File
                        bcics_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS213: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS214: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS214A: {lastModified: '2018-05-18T12:37:21-07:00'},
                        bcics_ICS217A: {lastModified: '2018-05-18T12:37:21-07:00'}, // New File
                        bcics_ICS309: {lastModified: '2018-05-18T12:37:21-07:00'}
                    })
                }
            });

            // Act
            const result = await SUT.checkForUpdates();

            // Assert
            expect(result).toEqual(['bcics_ICS205A', 'bcics_ICS217A']);

        });

        it('handles errors from read appropriately', async () => {

            // Arrange
            const error = new Error('Oh no');

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.rejects(error);

            // Act
            await expect(SUT.checkForUpdates()).rejects.toBe(error);

        });

        it('handles errors from request appropriately', async () => {

            // Arrange
            const error = new Error('oh no');

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({}));

            const stub_request = sandbox.stub();
            stub_request.rejects(error);
            SUT.setGetItRequest(stub_request);

            // Act
            await expect(SUT.checkForUpdates()).rejects.toBe(error);

        });

        it('handles invalid local json appropriately', async () => {

            // Arrange
            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs('/forms', 'index.json').resolves('1 0+1');

            // Act Assert
            await expect(SUT.checkForUpdates()).rejects.toBeInstanceOf(SyntaxError);

        });

        it('handles invalid server json appropriately', async () => {

            // Arrange
            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({}));

            const stub_request = sandbox.stub();
            stub_request.resolves('falsee');
            SUT.setGetItRequest(stub_request);

            // Act Assert
            await expect(SUT.checkForUpdates()).rejects.toBeInstanceOf(SyntaxError);

        });

        it('handles server timeout appropriately', (done) => {

            // Arrange
            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({}));

            SUT.setTimeout(1000);

            server.on({
                method: 'GET',
                path: '/index.json',
                reply: {
                    status: 200,
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        hello: 'is it me you\'re looking for?'
                    })
                },
                delay: 2000
            });

            // Act Assert
            SUT.checkForUpdates().catch(e => {
                expect(e.message).toContain('Socket timed out');
                done();
            });

        });

        it('can be aborted when requesting', async (done) => {

            // Arrange
            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({}));

            SUT.setTimeout(5000);

            server.on({
                method: 'GET',
                path: '/index.json',
                reply: {
                    status: 200,
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        hello: 'is it me you\'re looking for?'
                    })
                },
                delay: 5000
            });

            // Act Assert
            SUT.checkForUpdates().catch(e => {
                expect(e).toBeInstanceOf(UserCancelledError);
                done();
            });

            await new Promise(resolve => setTimeout(resolve, 1000));

            SUT.abort();

        });

        it('can be aborted when reading', async (done) => {

            // Arrange
            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs('/forms', 'index.json').resolves(JSON.stringify({}));

            SUT.setTimeout(5000);

            server.on({
                method: 'GET',
                path: '/index.json',
                reply: {
                    status: 200,
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        hello: 'is it me you\'re looking for?'
                    })
                },
                delay: 5000
            });

            // Act Assert
            SUT.checkForUpdates().catch(e => {
                console.log(e);
                expect(e).toBeInstanceOf(UserCancelledError);
                done();
            });

            SUT.abort();

        });
    });

    // describe('has method downloadNewForms that', () => {
    //
    //     beforeEach((done) => {
    //         server.start(done);
    //     });
    //
    //     afterEach((done) => {
    //         server.stop(done);
    //     });
    //
    //     it('exists', () => {
    //
    //         expect(SUT.checkForUpdates).toBeDefined();
    //
    //     });
    //
    // });
    //
    // describe('has method abort that ', () => {
    //
    //     it('exists', () => {
    //
    //         expect(SUT.abort).toBeDefined();
    //
    //     });
    //
    //     it('works', async () => {
    //
    //         // jest.setTimeout(5000);
    //         //
    //         // await StorageManager.initialize('/home/spectre/.config/dalmatian-ics-electron/storage/forms').then(async () => {
    //         //     await SUT.downloadNewForms().catch(e => console.log(e));
    //         // }).catch(e => console.log(e));
    //
    //     });
    //
    // });

});