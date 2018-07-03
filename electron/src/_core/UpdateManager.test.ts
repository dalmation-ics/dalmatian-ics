import * as sinon from 'sinon'; // http://sinonjs.org/releases/v2.0.0/
import SUT from './UpdateManager';
import StorageManager from './StorageManager';
import * as request from 'request-promise';

let sandbox;

describe('UpdateManager should ', () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('resolve true to be true', () => {

        expect(true).toBe(true);

    });

    describe('has method checkForUpdates that ', () => {

        it('exists', () => {

            expect(SUT.checkForUpdates).toBeDefined();

        });

        it('loads local index, downloads server index, and compares the two, resolving no updates needed', async () => {

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

            const stub_request = sandbox.stub(request, 'get');
            stub_request.withArgs(sinon.match.any).resolves(JSON.stringify({
                bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS213: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS217A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS309: {lastModified: '2018-05-18T12:37:21-07:00'}
            });

            // Act
            const result = await SUT.checkForUpdates();

            // Assert
            expect(result).toBe(false);

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

            const stub_request = sandbox.stub(request, 'get');
            stub_request.withArgs(sinon.match.any).resolves(JSON.stringify({
                bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS213: {lastModified: '2018-06-18T12:37:21-07:00'}, // New Version
                bcics_ICS214: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS217A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS309: {lastModified: '2018-05-18T12:37:21-07:00'}
            });

            // Act
            const result = await SUT.checkForUpdates();

            // Assert
            expect(result).toBe(true);

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
                bcics_ICS217A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS309: {lastModified: '2018-05-18T12:37:21-07:00'}
            }));

            const stub_request = sandbox.stub(request, 'get');
            stub_request.withArgs(sinon.match.any).resolves(JSON.stringify({
                bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'}, // New File
                bcics_ICS210: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS213: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS214A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS217A: {lastModified: '2018-05-18T12:37:21-07:00'},
                bcics_ICS309: {lastModified: '2018-05-18T12:37:21-07:00'}
            });

            // Act
            const result = await SUT.checkForUpdates();

            // Assert
            expect(result).toBe(true);

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

            const stub_request = sandbox.stub(request, 'get');
            stub_request.rejects(error);

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

            const stub_request = sandbox.stub(request, 'get');
            stub_request.resolves("1 0+1");

            // Act Assert
            await expect(SUT.checkForUpdates()).rejects.toBeInstanceOf(SyntaxError);

        });

    });

    describe('has method downloadNewForms that', () => {

        it('exists', () => {

            expect(SUT.checkForUpdates).toBeDefined();

        });

    });

    describe('has method abort that ', () => {

        it('exists', () => {

            expect(SUT.abort).toBeDefined();

        });

    });

});