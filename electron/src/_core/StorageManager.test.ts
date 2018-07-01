import * as sinon from 'sinon';
import * as fs from 'fs-extra';
import * as _path from 'path';
import * as aes256 from 'aes256';
import SUT from './StorageManager';

let sandbox;
const path = '../../__TestArea__';
const operational_directory = _path.join(path, 'storage');

describe('StorageManager should ', () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('resolves true to be true ', () => {

        expect(true).toBe(true);

    });

    describe('have method initialize that ', () => {

        it('exists', () => {
            expect(SUT.initialize).toBeDefined();
        });

        it('Check path validity and create storage folder', async () => {

            // Arrange
            const stub_exists = sandbox.stub(fs, 'exists');
            stub_exists.withArgs(path).resolves(true);
            stub_exists.withArgs(operational_directory).resolves(false);

            const stub_stat = sandbox.stub(fs, 'stat');
            stub_stat.withArgs(path).resolves({
                isDirectory: () => {
                    return true;
                }
            });

            const stub_mkdir = sandbox.stub(fs, 'mkdir');
            stub_mkdir.withArgs(operational_directory).resolves();

            // Act
            await SUT.initialize(path);

            // Assert
            // - operational_directory should be checked to see if it exists
            expect(stub_exists.getCall(0).args[0]).toBe(path);

            // - operational_directory should be checked to see if it is a directory
            expect(stub_stat.getCall(0).args[0]).toBe(path);

            // - storage folder should be checked to see if it exists
            expect(stub_exists.getCall(1).args[0]).toBe(operational_directory);

            // - storage folder should be created because it does not exist
            expect(stub_mkdir.getCall(0).args[0]).toBe(operational_directory);

        });

        it('Check path validity and not create storage folder as it already exists', async () => {

            // Arrange
            const stub_exists = sandbox.stub(fs, 'exists');
            stub_exists.withArgs(path).resolves(true);
            stub_exists.withArgs(operational_directory).resolves(true);

            const stub_stat = sandbox.stub(fs, 'stat');
            stub_stat.withArgs(path).resolves({
                isDirectory: () => {
                    return true;
                }
            });

            const stub_mkdir = sandbox.stub(fs, 'mkdir');
            stub_mkdir.withArgs(_path.join(path, 'storage')).resolves();

            // Act
            await SUT.initialize(path);

            // Assert
            // - operational_directory should be checked to see if it exists
            expect(stub_exists.getCall(0).args[0]).toBe(path);

            // - operational_directory should be checked to see if it is a directory
            expect(stub_stat.getCall(0).args[0]).toBe(path);

            // - storage folder should be checked to see if it exists
            expect(stub_exists.getCall(1).args[0]).toBe(operational_directory);

            // - storage folder should not be created because it already exists
            expect(stub_mkdir.calledOnce).toBe(false);

        });

        it('Rejects if path does not exist', async () => {

            // Arrange
            const stub_exists = sandbox.stub(fs, 'exists');
            stub_exists.withArgs(path).resolves(false);

            // Act Assert
            await expect(SUT.initialize(path)).rejects.toBeTruthy();

        });

        it('Rejects if path is not a directory', async () => {

            // Arrange
            const stub_exists = sandbox.stub(fs, 'exists');
            stub_exists.withArgs(path).resolves(false);

            const stub_stat = sandbox.stub(fs, 'stat');
            stub_stat.withArgs(path).resolves({
                isDirectory: () => {
                    return false;
                }
            });

            // Act Assert
            await expect(SUT.initialize(path)).rejects.toBeTruthy();

        });

    });

    describe('have method read that ', () => {

        it('exists', () => {

            expect(SUT.read).toBeDefined();

        });

        it('resolves null if directory does not exist', async () => {

            // Arrange
            const directory_path = _path.join(operational_directory, 'foo');

            sandbox.stub(SUT, 'getOperationalDirectory').returns(operational_directory);

            const stub_exists = sandbox.stub(fs, 'exists');
            stub_exists.withArgs(directory_path).resolves(false);

            // Act
            const result = await SUT.read('foo', 'bar');

            // Assert
            expect(result).toBeNull();

        });

        it('resolves null if the files does not exist', async () => {

            // Arrange
            const directory_path = _path.join(operational_directory, 'foo');
            const file_path = _path.join(operational_directory, 'foo', 'bar');

            sandbox.stub(SUT, 'getOperationalDirectory').returns(operational_directory);

            const stub_exists = sandbox.stub(fs, 'exists');
            stub_exists.withArgs(directory_path).resolves(true);
            stub_exists.withArgs(file_path).resolves(false);

            // Act
            const result = await SUT.read('foo', 'bar');

            // Assert
            expect(result).toBeNull();

        });

        it('reads file and returns decrypted value', async () => {

            // Arrange
            const directory_path = _path.join(operational_directory, 'foo');
            const file_path = _path.join(operational_directory, 'foo', 'bar');

            sandbox.stub(SUT, 'getOperationalDirectory').returns(operational_directory);

            const stub_exists = sandbox.stub(fs, 'exists');
            stub_exists.withArgs(directory_path).resolves(true);
            stub_exists.withArgs(file_path).resolves(true);

            const stub_readFile = sandbox.stub(fs, 'readFile');
            stub_readFile.withArgs(file_path).resolves('hello');

            const stub_decrypt = sandbox.stub(aes256, 'decrypt');
            stub_decrypt.withArgs(sinon.match.any, 'hello').resolves('world');

            // Act
            const result = await SUT.read('foo', 'bar');

            // Assert
            // - Directory foo should be checked for existence
            expect(stub_exists.getCall(0).args[0]).toBe(directory_path);

            // - File bar should be checked for existence
            expect(stub_exists.getCall(1).args[0]).toBe(file_path);

            // - readFile should be called on file_path
            expect(stub_readFile.getCall(0).args[0]).toBe(file_path);

            // - decrypt should be called on contents ('hello')
            expect(stub_decrypt.getCall(0).args[1]).toBe('hello');

            // - expect decrypted contents ('world') to be returned
            expect(result).toBe('world');

        });

        it('Handles exists error appropriately', async () => {

            // Arrange
            const directory_path = _path.join(operational_directory, 'foo');
            const file_path = _path.join(operational_directory, 'foo', 'bar');

            sandbox.stub(SUT, 'getOperationalDirectory').returns(operational_directory);

            const stub_exists = sandbox.stub(fs, 'exists');
            stub_exists.withArgs(directory_path).resolves(true);
            stub_exists.withArgs(file_path).rejects('oh no');

            // Act
            await expect(SUT.read('foo', 'bar')).rejects.toBeDefined();

        });

        it('Handles readFile error appropriately', async () => {

            // Arrange
            const directory_path = _path.join(operational_directory, 'foo');
            const file_path = _path.join(operational_directory, 'foo', 'bar');

            sandbox.stub(SUT, 'getOperationalDirectory').returns(operational_directory);

            const stub_exists = sandbox.stub(fs, 'exists');
            stub_exists.withArgs(directory_path).resolves(true);
            stub_exists.withArgs(file_path).resolves(true);

            const stub_readFile = sandbox.stub(fs, 'readFile');
            stub_readFile.withArgs(file_path).rejects('oh no');

            // Act
            await expect(SUT.read('foo', 'bar')).rejects.toBeDefined();

        });

        it('Handles decrypt error appropriately', async () => {

            // Arrange
            const directory_path = _path.join(operational_directory, 'foo');
            const file_path = _path.join(operational_directory, 'foo', 'bar');

            sandbox.stub(SUT, 'getOperationalDirectory').returns(operational_directory);

            const stub_exists = sandbox.stub(fs, 'exists');
            stub_exists.withArgs(directory_path).resolves(true);
            stub_exists.withArgs(file_path).resolves(true);

            const stub_readFile = sandbox.stub(fs, 'readFile');
            stub_readFile.withArgs(file_path).resolves('hello');

            const stub_decrypt = sandbox.stub(aes256, 'decrypt');
            stub_decrypt.withArgs(sinon.match.any, 'hello').rejects('oh no');

            // Act
            await expect(SUT.read('foo', 'bar')).rejects.toBeDefined();

        });

    });

});