import {convertFromXML} from './XMLToForm';
import * as StorageManager from './StorageManager';
import * as sinon from 'sinon';
import * as fs from 'fs-extra';

let sandbox;

describe('XMLToForm should ', () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('resolve true to be true', () => {

        expect(true).toBe(true);

    });

    it('works with ICS210A', async () => {

        const HTML = (await fs.readFile('__test__/dalmatian_ICS210.html')).toString();
        const XML = (await fs.readFile('__test__/RMS_Express_Form_ICS210_Viewer.xml')).toString();
        const EXPECTED = (await fs.readFile('__test__/expected_ICS210.html')).toString();

        // Arrange
        const stub_read = sandbox.stub(StorageManager, 'read');
        stub_read.withArgs('/forms', 'dalmatian_ICS210').resolves(HTML);

        await convertFromXML(XML).then(result => {

            expect(result).toEqual(EXPECTED);

        });

    });

});