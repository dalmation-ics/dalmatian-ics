const ExportBridge = require('.');
const exportManager = require('../../storage').exportManager;
const {MissingArgumentError, IncorrectTypeError} = require(
    '../../../_core/error/');
const sinon = require('sinon');

const {
    ACT_IMPORT_FORM,
    ACT_SAVE_ARCHIVE,
    ACT_OPEN_ARCHIVE,
    ACT_CHECK_PASSED_FILE,
    ACT_SHOW_PATH_IN_FOLDER,
} = require('../../../_core/contract/exportBridge');

const buildMockIPCW = () => {

    return {
        register: function(name, action) {
            this[name] = action;
        },
        dispatch: function(name, args, callback) {
            this[name](callback, args);
        },
    };

};

describe('Export bridge should ', () => {

    describe('', () => {

        it('resolves true to be true ', () => {
            expect(true).toBe(true);
        });

    });

    describe('register ACT_SAVE_ARCHIVE that ', () => {

        it('resolves true to be true', () => {
            expect(true).toBe(true);
        });

        it('resolves with correct name', () => {

            // Arrange
            const mockIPCw = buildMockIPCW();

            // Act
            ExportBridge(mockIPCw);

            // Assert
            expect(mockIPCw[ACT_SAVE_ARCHIVE]).toBeDefined();

        });

        it('throws MissingArgumentError when fileList not passed', async () => {

            expect.assertions(1);

            // Arrange
            const mockIPCw = buildMockIPCW();
            ExportBridge(mockIPCw);

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_SAVE_ARCHIVE, undefined,
                    (err) => {

                        // Assert
                        expect(err).toBeInstanceOf(MissingArgumentError);
                        resolve();

                    });

            });

        });

        it('throws IncorrectTypeError when fileList is not of correct type',
            async () => {

                expect.assertions(1);

                // Arrange
                const mockIPCw = buildMockIPCW();
                ExportBridge(mockIPCw);

                await new Promise(resolve => {

                    // Act
                    mockIPCw.dispatch(ACT_SAVE_ARCHIVE, 'test',
                        (err) => {

                            // Assert
                            expect(err).toBeInstanceOf(IncorrectTypeError);
                            resolve();
                        });
                });
            });

        it('saves fileList', async () => {

            expect.assertions(2);

            // Arrange
            const mockIPCw = buildMockIPCW();
            ExportBridge(mockIPCw);

            // Stub "Save"
            const stub = sinon.stub(exportManager, 'save');

            // Normally save returns a promise that resolves when save is complete
            // Since we are not actually saving, return a promise that resolves immediately
            stub.withArgs([]).resolves();

            await new Promise(resolve => {

                // Act

                // Dispatch ACT_SAVE_ARCHIVE with an "archive"
                mockIPCw.dispatch(ACT_SAVE_ARCHIVE, [], (err) => {

                    // Assert

                    // Expect "Save" to be called
                    expect(stub.callCount).toBe(1);

                    // Expect the program to try to save our passed array []
                    // [0](First call)[0](First argument)
                    expect(stub.args[0][0]).toEqual([]);

                    // Restore the stub
                    stub.restore();

                    // Test complete
                    resolve();

                });

            });

        });

        it('rejects errors', async () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            ExportBridge(mockIPCw);

            // Stub save
            const stub = sinon.stub(exportManager, 'save');
            // Stub should reject with error
            stub.withArgs().rejects(new Error());

            return new Promise(resolve => {

                mockIPCw.dispatch(ACT_SAVE_ARCHIVE, [], (err) => {

                    expect(err).toBeTruthy();
                    expect(stub.callCount).toBe(1);

                    stub.restore();
                    resolve();

                });

            });

        });

    });

    describe('register ACT_OPEN_ARCHIVE that ', () => {

        it('resolves true to be true', () => {
            expect(true).toBe(true);
        });

        it('resolves with correct name', () => {

            // Arrange
            const mockIPCw = buildMockIPCW();

            // Act
            ExportBridge(mockIPCw);

            // Assert
            expect(mockIPCw[ACT_OPEN_ARCHIVE]).toBeDefined();

        });

        it('opens filePath', async () => {

            expect.assertions(3);

            // Arrange
            const mockIPCw = buildMockIPCW();
            ExportBridge(mockIPCw);

            // Stub load
            const stub = sinon.stub(exportManager, 'load');

            // Since load returns a promise that resolves when load complete
            // Return a promise that resolves immediately
            stub.withArgs('./test/.').resolves({
                result: 1,
                filePath: './test/.',
            });

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_OPEN_ARCHIVE, './test/.', (err) => {

                    // Assert
                    expect(err).toBeNull();
                    expect(stub.callCount).toBe(1);
                    expect(stub.args[0][0]).toBe('./test/.');

                    stub.restore();

                    resolve();

                });

            });
        });

        it('rejects errors', async () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            ExportBridge(mockIPCw);

            // Stub load
            const stub = sinon.stub(exportManager, 'load');
            // Stub should reject with error
            stub.withArgs('.').rejects(new Error());

            return new Promise(resolve => {

                mockIPCw.dispatch(ACT_OPEN_ARCHIVE, '.', (err) => {

                    expect(err).toBeTruthy();
                    expect(stub.callCount).toBe(1);

                    stub.restore();
                    resolve();

                });

            });

        });

    });

    describe('register ACT_CHECK_PASSED_FILE that ', () => {

        it('resolves true to be true', () => {
            expect(true).toBe(true);
        });

        it('resolves with correct name', () => {

            // Arrange
            const mockIPCw = buildMockIPCW();

            // Act
            ExportBridge(mockIPCw);

            // Assert
            expect(mockIPCw[ACT_CHECK_PASSED_FILE]).toBeDefined();

        });

        it('loads file in process.argv[1] if exists', async () => {

            expect.assertions(3);

            // Arrange
            process.argv[1] = '../.';
            const mockIPCw = buildMockIPCW();
            ExportBridge(mockIPCw);

            // Stub load
            const stub = sinon.stub(exportManager, 'load');

            // Since load returns promise that resolves when load complete
            // Return a promise that resolves immediately
            stub.withArgs('../.').resolves();

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_CHECK_PASSED_FILE, undefined,
                    (err) => {

                        // Assert
                        expect(err).toBeNull();
                        expect(stub.callCount).toBe(1);
                        expect(stub.args[0][0]).toEqual('../.');

                        stub.restore();

                        resolve();

                    });

            });

        });

        it('returns null of process.argv[1] does not exist', async () => {

            expect.assertions(3);

            // Arrange
            process.argv[1] = undefined;
            const mockIPCw = buildMockIPCW();
            ExportBridge(mockIPCw);

            // Stub load
            const stub = sinon.stub(exportManager, 'load');

            // Since load returns promise that resolves when load complete
            // Return a promise that resolves immediately
            stub.withArgs('../.').resolves();

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_CHECK_PASSED_FILE, undefined,
                    (err, result) => {

                        // Assert
                        expect(err).toBeNull();
                        expect(stub.calledOnce).toBeFalsy();
                        expect(result).toBe(null);

                        stub.restore();

                        resolve();

                    });

            });

        });

        it('handles errors correctly', async () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            ExportBridge(mockIPCw);

            process.argv[1] = 'test';

            // Stub load
            const stub = sinon.stub(exportManager, 'load');
            // Stub should reject with error
            stub.rejects(new Error('test'));

            return new Promise(resolve => {

                mockIPCw.dispatch(ACT_CHECK_PASSED_FILE, undefined, (err) => {

                    expect(err).toBeTruthy();
                    expect(stub.callCount).toBe(1);

                    stub.restore();
                    resolve();

                });

            });

        });

    });

    describe('register ACT_SHOW_PATH_IN_FOLDER that ', () => {

        it('resolves that true is true ', () => {

            expect(true).toBe(true);

        });

        it('calls show in folder', async () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            ExportBridge(mockIPCw);

            // Stub showInFolder
            const stub = sinon.stub(exportManager, 'showInFolder');
            stub.returns(true);

            return new Promise(resolve => {

                mockIPCw.dispatch(ACT_SHOW_PATH_IN_FOLDER, undefined,
                    (err) => {

                        expect(err).toBeNull();

                        stub.restore();
                        resolve();

                    },
                );

            });

        });

    });

    describe('register ACT_IMPORT_FORM that ', () => {

        it('resolves true to be true', () => {
            expect(true).toBe(true);
        });

        it('resolves with correct name', ()=>{

            // Arrange
            const mockIPCw = buildMockIPCW();

            // Act
            FormsBridge(mockIPCw);

            // Assert
            expect(mockIPCw[ACT_IMPORT_FORM]).toBeDefined();

        });

    });
});
