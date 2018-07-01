import * as sinon from 'sinon';
import * as fs from 'fs-extra';
import * as path from 'path';
import SUT from './StorageManager';

const operational_directory = '../../__TestArea__';

describe('StorageManager should ', () => {

    it('resolves true to be true ', () => {

        expect(true).toBe(true);

    });

    describe('have method initialize that ', () => {

        it('exists', () => {
            expect(SUT.initialize).toBeDefined();
        });

        it('Check operational_directory validity and create storage folder', async () => {

            // Arrange
            const stub_exists = sinon.stub(fs, 'exists');
            stub_exists.withArgs(operational_directory).resolves(true);
            stub_exists.withArgs(path.join(operational_directory, 'storage')).resolves(false);

            const stub_stat = sinon.stub(fs, 'stat');
            stub_stat.withArgs(operational_directory).resolves({
                isDirectory: () => {
                    return true;
                }
            });

            const stub_mkdir = sinon.stub(fs, 'mkdir');
            stub_mkdir.withArgs(path.join(operational_directory, 'storage')).resolves();

            // Act
            await SUT.initialize(operational_directory);

            // Assert
            // - operational_directory should be checked to see if it exists
            expect(stub_exists.getCall(0).args[0]).toBe(operational_directory);

            // - operational_directory should be checked to see if it is a directory
            expect(stub_stat.getCall(0).args[0]).toBe(operational_directory);

            // - storage folder should be checked to see if it exists
            expect(stub_exists.getCall(1).args[0]).toBe(path.join(operational_directory, 'storage'));

            // - storage folder should be created because it does not exist
            expect(stub_mkdir.getCall(0).args[0]).toBe(path.join(operational_directory, 'storage'));

            // Restore
            stub_mkdir.restore();
            stub_stat.restore();
            stub_exists.restore();

        });

        it('Check operational_directory validity and not create storage folder as it already exists', async () => {

            // Arrange
            const stub_exists = sinon.stub(fs, 'exists');
            stub_exists.withArgs(operational_directory).resolves(true);
            stub_exists.withArgs(path.join(operational_directory, 'storage')).resolves(true);

            const stub_stat = sinon.stub(fs, 'stat');
            stub_stat.withArgs(operational_directory).resolves({
                isDirectory: () => {
                    return true;
                }
            });

            const stub_mkdir = sinon.stub(fs, 'mkdir');
            stub_mkdir.withArgs(path.join(operational_directory, 'storage')).resolves();

            // Act
            await SUT.initialize(operational_directory);

            // Assert
            // - operational_directory should be checked to see if it exists
            expect(stub_exists.getCall(0).args[0]).toBe(operational_directory);

            // - operational_directory should be checked to see if it is a directory
            expect(stub_stat.getCall(0).args[0]).toBe(operational_directory);

            // - storage folder should be checked to see if it exists
            expect(stub_exists.getCall(1).args[0]).toBe(path.join(operational_directory, 'storage'));

            // - storage folder should not be created because it already exists
            expect(stub_mkdir.calledOnce).toBe(false);

            // Restore
            stub_mkdir.restore();
            stub_stat.restore();
            stub_exists.restore();

        });

        it('Rejects if operational_directory does not exist', async () => {

            // Arrange
            const stub_exists = sinon.stub(fs, 'exists');
            stub_exists.withArgs(operational_directory).resolves(false);

            // Act Assert
            await expect(SUT.initialize(operational_directory)).rejects.toBeTruthy();

            // Restore
            stub_exists.restore();

        });

        it('Rejects if operational_directory is not a directory', async ()=> {

            // Arrange
            const stub_exists = sinon.stub(fs, 'exists');
            stub_exists.withArgs(operational_directory).resolves(false);

            const stub_stat = sinon.stub(fs, 'stat');
            stub_stat.withArgs(operational_directory).resolves({
                isDirectory: ()=>{
                    return false;
                }
            });

            // Act Assert
            await expect(SUT.initialize(operational_directory)).rejects.toBeTruthy();

            // Restore
            stub_exists.restore();

        });

    });

});