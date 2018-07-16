import * as sinon from 'sinon';
import * as SUT from './UpdateManager';
import * as FormFetcher from './FormFetcher';
import * as StorageManager from './StorageManager';
import FormDetails from './class/FormDetails';
import {I_FetchFormResult, I_ServerIndex} from './FormFetcher';
import {I_LocalIndex} from './UpdateManager';
import * as _ from 'lodash';

const SERVER_INDEX: I_ServerIndex = {
    bcics_ICS205: {lastModified: '2018-05-18T12:37:21-07:00'},
    bcics_ICS206: {lastModified: '2018-05-18T12:37:21-07:00'},
    bcics_ICS205A: {lastModified: '2018-05-18T12:37:21-07:00'},
};

const ICS205_Details = new FormDetails({
    fileName: 'bcics_ICS205',
    name: 'ICS205 A Land Before Time',
    id: 'ICS205',
    detail: 'ICS205 Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});

const ICS206_Details = new FormDetails({
    fileName: 'bcics_ICS206',
    name: 'ICS206 Electric Boogaloo',
    id: 'ICS206',
    detail: 'ICS206 Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});

const ICS205A_Details = new FormDetails({
    fileName: 'bcics_ICS205A',
    name: 'ICS205A This time its different',
    id: 'ICS205A',
    detail: 'ICS205A Details',
    lastModified: '2018-05-18T12:37:21-07:00'
});

const LOCAL_INDEX: I_LocalIndex = {
    'bcics_ICS205': ICS205_Details,
    'bcics_ICS206': ICS206_Details,
    'bcics_ICS205A': ICS205A_Details
};

const ICS205_ServerResponse: I_FetchFormResult = {
    fileName: 'bcics_ICS205',
    content: 'ICS205 Content',
    details: ICS205_Details,
    error: null,
    failure: false
};

const ICS206_ServerResponse: I_FetchFormResult = {
    fileName: 'bcics_ICS206',
    content: 'ICS206 Content',
    details: ICS206_Details,
    error: null,
    failure: false
};

const ICS205A_ServerResponse: I_FetchFormResult = {
    fileName: 'bcics_ICS205A',
    content: 'ICS205A Content',
    details: ICS205A_Details,
    error: null,
    failure: false
};

let sandbox;
const DIRECTORY = '/forms';

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

    describe('have method checkForFormUpdates that', () => {

        it('exists', () => {

            expect(SUT.checkForFormUpdates).toBeDefined();

        });

        it('finds all forms when reading index returns null', async () => {

            // Arrange
            const stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
            stub_fetchIndex.resolves(SERVER_INDEX);

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(null);

            // Act
            const result = await SUT.checkForFormUpdates();

            // Assert
            expect(result).toEqual(['bcics_ICS205', 'bcics_ICS206', 'bcics_ICS205A']);

        });

        it('can find updateable forms', async () => {

            // Arrange
            const stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
            stub_fetchIndex.resolves(SERVER_INDEX);

            const m_Local_Index = _.cloneDeep(LOCAL_INDEX);
            m_Local_Index['bcics_ICS206'].lastModified = '2018-05-11T12:37:21-07:00';

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));

            // Act
            const result = await SUT.checkForFormUpdates();

            // Assert
            expect(result).toEqual(['bcics_ICS206']);

        });

        it('can find multiple updateable forms', async () => {

            // Arrange
            const stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
            stub_fetchIndex.resolves(SERVER_INDEX);

            const m_Local_Index = _.cloneDeep(LOCAL_INDEX);
            m_Local_Index['bcics_ICS206'].lastModified = '2018-05-11T12:37:21-07:00';
            m_Local_Index['bcics_ICS205A'].lastModified = '2018-05-11T12:37:21-07:00';

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));

            // Act
            const result = await SUT.checkForFormUpdates();

            // Assert
            expect(result).toEqual(['bcics_ICS206', 'bcics_ICS205A']);

        });

        it('can find zero updateable forms', async () => {

            // Arrange
            const stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
            stub_fetchIndex.resolves(SERVER_INDEX);

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(LOCAL_INDEX));

            // Act
            const result = await SUT.checkForFormUpdates();

            // Assert
            expect(result).toEqual([]);

        });

        it('can handle rejection from fetchIndex', async () => {

            // Arrange
            const error = new Error('oh no');

            const stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
            stub_fetchIndex.rejects(error);

            // Act & Assert
            await expect(SUT.checkForFormUpdates()).rejects.toBe(error);

        });

        it('can handle rejection from read', async () => {

            // Arrange
            const error = new Error('oh no');

            const stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
            stub_fetchIndex.resolves(SERVER_INDEX);

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').rejects(error);

            // Act & Assert
            await expect(SUT.checkForFormUpdates()).rejects.toBe(error);

        });

        it('only allows one process at a time', async (done) => {

            // Arrange
            const stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
            stub_fetchIndex.resolves(new Promise(resolve => setTimeout(resolve, 1000)).then(() => SERVER_INDEX));

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(LOCAL_INDEX));

            // Act
            SUT.checkForFormUpdates().then(() => {
                done();
            });

            await expect(SUT.checkForFormUpdates()).rejects.toEqual('A checkForUpdates operation is already underway');

        });

        it('can be run twice', async () => {

            // Arrange
            const stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
            stub_fetchIndex.resolves(SERVER_INDEX);

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(LOCAL_INDEX));

            // Act
            const result = await SUT.checkForFormUpdates();

            // Assert
            expect(result).toEqual([]);

            // Act
            const result2 = await SUT.checkForFormUpdates();

            // Assert
            expect(result2).toEqual([]);

        });

    });

    describe('have method downloadFormUpdates that', () => {

        it('exists', () => {

            expect(SUT.downloadFormUpdates).toBeDefined();

        });

        it('can update multiple forms', async () => {

            // Arrange
            const stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
            stub_checkForFormUpdates.resolves(['bcics_ICS205A', 'bcics_ICS205']);

            const stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
            stub_FetchForms.withArgs(['bcics_ICS205A', 'bcics_ICS205']).resolves([
                ICS205A_ServerResponse,
                ICS205_ServerResponse
            ]);

            const m_Local_Index = _.cloneDeep(LOCAL_INDEX);
            m_Local_Index['bcics_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Up to date
            m_Local_Index['bcics_ICS205'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
            m_Local_Index['bcics_ICS205A'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));

            const stub_write = sandbox.stub(StorageManager, 'write');
            stub_write.resolves();

            // Act
            await SUT.downloadFormUpdates();

            // Assert
            const m_Local_Index_Expected = _.cloneDeep(LOCAL_INDEX);
            m_Local_Index_Expected['bcics_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Untouched
            m_Local_Index_Expected['bcics_ICS205'].lastModified = '2018-05-18T12:37:21-07:00'; // Now matches server
            m_Local_Index_Expected['bcics_ICS205A'].lastModified = '2018-05-18T12:37:21-07:00'; // Now matches server

            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === 'index' &&
                    args[2] === JSON.stringify(m_Local_Index_Expected);
            }).length).toBe(1);

            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === ICS205_ServerResponse.fileName &&
                    args[2] === ICS205_ServerResponse.content;
            }).length).toBe(1);

            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === ICS205A_ServerResponse.fileName &&
                    args[2] === ICS205A_ServerResponse.content;
            }).length).toBe(1);

        });

        it('can handle rejection from checkForFormUpdates ', async () => {

            // Arrange
            const error = new Error('oh no');

            const stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
            stub_checkForFormUpdates.rejects(error);

            // Act & Assert
            await expect(SUT.downloadFormUpdates()).rejects.toBe(error);

        });

        it('can handle rejection from checkForFormUpdates ', async () => {

            // Arrange
            const error = new Error('oh no');

            const stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
            stub_checkForFormUpdates.resolves(['bcics_ICS205A', 'bcics_ICS205']);

            const stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
            stub_FetchForms.withArgs(['bcics_ICS205A', 'bcics_ICS205']).rejects(error);

            // Act & Assert
            await expect(SUT.downloadFormUpdates()).rejects.toBe(error);

        });

        it('can handle rejection from read ', async () => {

            // Arrange
            const error = new Error('oh no');

            const stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
            stub_checkForFormUpdates.resolves(['bcics_ICS205A', 'bcics_ICS205']);

            const stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
            stub_FetchForms.withArgs(['bcics_ICS205A', 'bcics_ICS205']).resolves([
                ICS205A_ServerResponse,
                ICS205_ServerResponse
            ]);

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').rejects(error);

            // Act & Assert
            await expect(SUT.downloadFormUpdates()).rejects.toBe(error);

        });

        it('can handle invalid JSON from read ', async () => {

            // Arrange
            const error = new Error('oh no');

            const stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
            stub_checkForFormUpdates.resolves(['bcics_ICS205A', 'bcics_ICS205']);

            const stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
            stub_FetchForms.withArgs(['bcics_ICS205A', 'bcics_ICS205']).resolves([
                ICS205A_ServerResponse,
                ICS205_ServerResponse
            ]);

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves('.0');

            // Act & Assert
            await expect(SUT.downloadFormUpdates()).rejects.toBeInstanceOf(SyntaxError);

        });

        it('can handle rejection from write: forms ', async () => {

            // Arrange
            const error = new Error('oh no');

            const stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
            stub_checkForFormUpdates.resolves(['bcics_ICS205A', 'bcics_ICS205']);

            const stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
            stub_FetchForms.withArgs(['bcics_ICS205A', 'bcics_ICS205']).resolves([
                ICS205A_ServerResponse,
                ICS205_ServerResponse
            ]);

            const m_Local_Index = _.cloneDeep(LOCAL_INDEX);
            m_Local_Index['bcics_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Up to date
            m_Local_Index['bcics_ICS205'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
            m_Local_Index['bcics_ICS205A'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));

            const stub_write = sandbox.stub(StorageManager, 'write');
            stub_write.onCall(0).rejects(error);

            // Act & Assert
            await expect(SUT.downloadFormUpdates()).rejects.toBe(error);

        });

        it('can handle rejection from write: index', async () => {

            // Arrange
            const error = new Error('oh no');

            const stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
            stub_checkForFormUpdates.resolves(['bcics_ICS205A', 'bcics_ICS205']);

            const stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
            stub_FetchForms.withArgs(['bcics_ICS205A', 'bcics_ICS205']).resolves([
                ICS205A_ServerResponse,
                ICS205_ServerResponse
            ]);

            const m_Local_Index = _.cloneDeep(LOCAL_INDEX);
            m_Local_Index['bcics_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Up to date
            m_Local_Index['bcics_ICS205'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
            m_Local_Index['bcics_ICS205A'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));

            const stub_write = sandbox.stub(StorageManager, 'write');
            stub_write.withArgs().resolves();
            stub_write.withArgs(DIRECTORY, 'index', sinon.match.any).rejects(error);

            // Act & Assert
            await expect(SUT.downloadFormUpdates()).rejects.toBe(error);

        });

        it('can be run twice', async () => {

            // Arrange
            const stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
            stub_checkForFormUpdates.resolves(['bcics_ICS205A', 'bcics_ICS205']);

            const stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
            stub_FetchForms.withArgs(['bcics_ICS205A', 'bcics_ICS205']).resolves([
                ICS205A_ServerResponse,
                ICS205_ServerResponse
            ]);

            const m_Local_Index = _.cloneDeep(LOCAL_INDEX);
            m_Local_Index['bcics_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Up to date
            m_Local_Index['bcics_ICS205'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date
            m_Local_Index['bcics_ICS205A'].lastModified = '2018-05-11T12:37:21-07:00'; // Out of date

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(JSON.stringify(m_Local_Index));

            const stub_write = sandbox.stub(StorageManager, 'write');
            stub_write.resolves();

            // Act
            await SUT.downloadFormUpdates();

            // Assert
            const m_Local_Index_Expected = _.cloneDeep(LOCAL_INDEX);
            m_Local_Index_Expected['bcics_ICS206'].lastModified = '2018-05-19T12:37:21-07:00'; // Untouched
            m_Local_Index_Expected['bcics_ICS205'].lastModified = '2018-05-18T12:37:21-07:00'; // Now matches server
            m_Local_Index_Expected['bcics_ICS205A'].lastModified = '2018-05-18T12:37:21-07:00'; // Now matches server

            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === 'index' &&
                    args[2] === JSON.stringify(m_Local_Index_Expected);
            }).length).toBe(1);

            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === ICS205_ServerResponse.fileName &&
                    args[2] === ICS205_ServerResponse.content;
            }).length).toBe(1);

            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === ICS205A_ServerResponse.fileName &&
                    args[2] === ICS205A_ServerResponse.content;
            }).length).toBe(1);

            stub_write.resetHistory();

            // Act
            await SUT.downloadFormUpdates();

            // Assert
            expect(stub_write.getCalls().length).toBe(3);
            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === 'index' &&
                    args[2] === JSON.stringify(m_Local_Index_Expected);
            }).length).toBe(1);

            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === ICS205_ServerResponse.fileName &&
                    args[2] === ICS205_ServerResponse.content;
            }).length).toBe(1);

            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === ICS205A_ServerResponse.fileName &&
                    args[2] === ICS205A_ServerResponse.content;
            }).length).toBe(1);

        });

        it('can update multiple forms with no local', async () => {

            // Arrange
            const stub_checkForFormUpdates = sandbox.stub(SUT, 'checkForFormUpdates');
            stub_checkForFormUpdates.resolves(['bcics_ICS205A', 'bcics_ICS205']);

            const stub_FetchForms = sandbox.stub(FormFetcher, 'fetchForms');
            stub_FetchForms.withArgs(['bcics_ICS205A', 'bcics_ICS205']).resolves([
                ICS205A_ServerResponse,
                ICS205_ServerResponse
            ]);

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index').resolves(null);

            const stub_write = sandbox.stub(StorageManager, 'write');
            stub_write.resolves();

            // Act
            await SUT.downloadFormUpdates();

            // Assert
            const m_Local_Index_Expected = _.cloneDeep(LOCAL_INDEX);
            m_Local_Index_Expected['bcics_ICS205'].lastModified = '2018-05-18T12:37:21-07:00';
            m_Local_Index_Expected['bcics_ICS205A'].lastModified = '2018-05-18T12:37:21-07:00';


            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === 'index' &&
                    JSON.stringify(JSON.parse(args[2]).bcics_ICS205) === JSON.stringify(m_Local_Index_Expected.bcics_ICS205) &&
                    JSON.stringify(JSON.parse(args[2]).bcics_ICS205A) === JSON.stringify(m_Local_Index_Expected.bcics_ICS205A);
            }).length).toBe(1);

            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === ICS205_ServerResponse.fileName &&
                    args[2] === ICS205_ServerResponse.content;
            }).length).toBe(1);

            expect(stub_write.getCalls().filter(c => {
                const args = c.args;
                return args[0] === DIRECTORY &&
                    args[1] === ICS205A_ServerResponse.fileName &&
                    args[2] === ICS205A_ServerResponse.content;
            }).length).toBe(1);

        });


    });

});