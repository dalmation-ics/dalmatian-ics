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

        it('can find updateable forms', async () => {

            // Arrange
            const stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
            stub_fetchIndex.resolves(SERVER_INDEX);

            const m_Local_Index = _.cloneDeep(LOCAL_INDEX);
            m_Local_Index['bcics_ICS206'].lastModified = '2018-05-11T12:37:21-07:00';

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index.json').resolves(JSON.stringify(m_Local_Index));

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
            stub_read.withArgs(DIRECTORY, 'index.json').resolves(JSON.stringify(m_Local_Index));

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
            stub_read.withArgs(DIRECTORY, 'index.json').resolves(JSON.stringify(LOCAL_INDEX));

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
            stub_read.withArgs(DIRECTORY, 'index.json').rejects(error);

            // Act & Assert
            await expect(SUT.checkForFormUpdates()).rejects.toBe(error);

        });

        it('only allows one process at a time', async (done) => {

            // Arrange
            const stub_fetchIndex = sandbox.stub(FormFetcher, 'fetchIndex');
            stub_fetchIndex.resolves(new Promise(resolve => setTimeout(resolve, 1000)).then(() => SERVER_INDEX));

            const stub_read = sandbox.stub(StorageManager, 'read');
            stub_read.withArgs(DIRECTORY, 'index.json').resolves(JSON.stringify(LOCAL_INDEX));

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
            stub_read.withArgs(DIRECTORY, 'index.json').resolves(JSON.stringify(LOCAL_INDEX));

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


    });

});