const FormsBridge = require('.');
const formManager = require('../../storage/index').formTemplateManager;
const {IncorrectTypeError, MissingArgumentError} = require(
    '../../../_core/error');
const sinon = require('sinon');

const {
    FileNotFoundError,
} = require('../../../_core/error');

const {
    ACT_CHECK_FOR_UPDATES,
    ACT_GET_FORM,
    ACT_GET_FORMS_INDEX,
    ACT_UPDATE_FORMS,
} = require('../../../_core/contract/formTemplateBridge');

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

describe('Forms bridge should ', () => {

    describe('', () => {

        it('resolve true to be true', () => {
            expect(true).toBe(true);
        });

    });

    describe('register ACT_CHECK_FOR_UPDATES that ', () => {

        it('resolves true to be true', () => {
            expect(true).toBe(true);
        });

        it('resolves with correct name', () => {

            // Arrange
            const mockIPCw = buildMockIPCW();

            // Act
            FormsBridge(mockIPCw);

            // Assert
            expect(mockIPCw[ACT_CHECK_FOR_UPDATES]).toBeDefined();

        });

        it('returns true if updates Available', async () => {

            expect.assertions(3);

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            // Stub checkForUpdates
            const stub = sinon.stub(formManager, 'checkForUpdates');

            // Since checkForUpdates returns a promise that resolves when complete
            // Return a promise that resolves immediately and simulates updates available
            stub.withArgs().resolves({
                actionRequired: true,
            });

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_CHECK_FOR_UPDATES, null,
                    (err, hasUpdates) => {

                        // Assert
                        expect(err).toBeNull();
                        expect(stub.calledOnce).toBeTruthy();
                        expect(hasUpdates).toEqual(true);

                        stub.restore();

                        resolve();

                    });

            });

        });

        it('returns false if updates not Available', async () => {

            expect.assertions(3);

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            // Stub checkForUpdates
            const stub = sinon.stub(formManager, 'checkForUpdates');

            // Since checkForUpdates returns a promise that resolves when complete
            // Return a promise that resolves immediately and simulates updates not available
            stub.withArgs().resolves({
                actionRequired: false,
            });

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_CHECK_FOR_UPDATES, null,
                    (err, hasUpdates) => {

                        // Assert
                        expect(err).toBeNull();
                        expect(stub.calledOnce).toBeTruthy();
                        expect(hasUpdates).toEqual(false);

                        stub.restore();

                        resolve();

                    });

            });

        });

        it('handles errors correctly', async () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            // Stub checkForUpdates
            const stub = sinon.stub(formManager, 'checkForUpdates');
            // Stub rejects error
            stub.withArgs().rejects(new Error());

            return new Promise(resolve => {

                mockIPCw.dispatch(ACT_CHECK_FOR_UPDATES, undefined, (err) => {

                    expect(err).toBeTruthy();
                    expect(stub.calledOnce).toBeTruthy();

                    stub.restore();

                    resolve();

                });

            });

        });

    });

    // describe('register ACT_CANCEL_CHECK_FOR_UPDATES that ', () => {
    //
    //     it('resolves true to be true', () => {
    //         expect(true).toBe(true);
    //     });
    //
    //     it('resolves with correct name', () => {
    //
    //         // Arrange
    //         const mockIPCw = buildMockIPCW();
    //
    //         // Act
    //         FormsBridge(mockIPCw);
    //
    //         // Assert
    //         expect(mockIPCw[ACT_CANCEL_CHECK_FOR_UPDATES]).toBeDefined();
    //
    //     });
    //
    // });

    describe('register ACT_GET_FORM that ', () => {

        it('resolves true to be true', () => {
            expect(true).toBe(true);
        });

        it('resolves with correct name', () => {

            // Arrange
            const mockIPCw = buildMockIPCW();

            // Act
            FormsBridge(mockIPCw);

            // Assert
            expect(mockIPCw[ACT_GET_FORM]).toBeDefined();

        });

        it('throws MissingArgumentError if no fileName is passed', async () => {

            expect.assertions(1);

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_GET_FORM, '', (err) => {

                    // Assert
                    expect(err).toBeInstanceOf(MissingArgumentError);
                    resolve();

                });

            });

        });

        it('throws IncorrectTypeError if non string is passed', async () => {

            expect.assertions(1);

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_GET_FORM, 1, (err) => {

                    // Assert
                    expect(err).toBeInstanceOf(IncorrectTypeError);
                    resolve();

                });

            });

        });

        it('calls getFormByFileName', async () => {

            expect.assertions(3);

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            // Stub getFormByFileName
            const stub = sinon.stub(formManager, 'getFormByFileName');
            // Stub resolves "content" for file
            stub.withArgs('test.html').resolves('123');

            await new Promise(resolve => {

                mockIPCw.dispatch(ACT_GET_FORM, 'test.html', (err, result) => {

                    expect(err).toBeNull();
                    expect(stub.calledOnce).toBeTruthy();
                    expect(result).toEqual('123');

                    stub.restore();
                    resolve();

                });

            });

        });

        it('handles errors correctly', async () => {

            expect.assertions(2);

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            // Stub getFormByFileName
            const stub = sinon.stub(formManager, 'getFormByFileName');
            // Stub resolves "content" for file
            stub.withArgs('test.html').rejects();

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_GET_FORM, 'test.html', (err) => {

                    // Assert
                    expect(err).toBeTruthy();
                    expect(stub.calledOnce).toBeTruthy();

                    stub.restore();
                    resolve();

                });

            });

        });

    });

    describe('register ACT_GET_FORMS_INDEX that ', () => {

        it('resolves true to be true', () => {
            expect(true).toBe(true);
        });

        it('resolves with correct name', () => {

            // Arrange
            const mockIPCw = buildMockIPCW();

            // Act
            FormsBridge(mockIPCw);

            // Assert
            expect(mockIPCw[ACT_GET_FORMS_INDEX]).toBeDefined();
        });

        it('returns flattened result from getFormsData', async () => {

            expect.assertions(3);

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            // Stub getFormsData
            const stub = sinon.stub(formManager, 'getFormsData');
            // Stub resolves an object
            stub.withArgs().resolves({
                a: 'one',
                b: 'two',
            });

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_GET_FORMS_INDEX, undefined,
                    (err, result) => {

                        // Assert
                        expect(err).toBeNull();
                        expect(stub.calledOnce).toBeTruthy();
                        expect(result).toEqual(['one', 'two']);

                        stub.restore();

                        resolve();

                    });

            });

        });

        it('handles FileNotFoundError by resolving null', async () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            // Stub getFormsData
            const stub = sinon.stub(formManager, 'getFormsData');
            // Stub resolves a file not found error
            stub.withArgs().rejects(new FileNotFoundError('test.html'));

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_GET_FORMS_INDEX, 'test.html',
                    (err, result) => {

                        // Assert
                        expect(err).toBeNull();
                        expect(stub.calledOnce).toBeTruthy();
                        expect(result).toBeNull();

                        stub.restore();
                        resolve();

                    });

            });

        });

        it('handles errors correctly', async () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            // Stub getFormsData
            const stub = sinon.stub(formManager, 'getFormsData');
            // Stub resolves a file not found error
            stub.withArgs().rejects(new Error());

            await new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_GET_FORMS_INDEX, 'test.html',
                    (err, result) => {

                        // Assert
                        expect(err).toBeTruthy();
                        expect(stub.calledOnce).toBeTruthy();

                        stub.restore();
                        resolve();

                    });

            });

        });

    });

    describe('register ACT_UPDATE_FORMS that ', () => {

        it('resolves true to be true', () => {
            expect(true).toBe(true);
        });

        it('resolves with correct name', () => {

            // Arrange
            const mockIPCw = buildMockIPCW();

            // Act
            FormsBridge(mockIPCw);

            // Assert
            expect(mockIPCw[ACT_UPDATE_FORMS]).toBeDefined();
        });

        it('calls downloadForms then resolves', async () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            // Stub download forms to resolve
            const stubDownloadForms = sinon.stub(formManager, 'downloadForms');
            stubDownloadForms.resolves();

            return new Promise(resolve => {

                mockIPCw.dispatch(ACT_UPDATE_FORMS, undefined,
                    (err) => {

                        expect(err).toBeNull();
                        expect(stubDownloadForms.callCount).toBe(1);

                        stubDownloadForms.restore();
                        resolve();

                    },
                );

            });

        });

        it('rejects errors', async () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            FormsBridge(mockIPCw);

            // Stub download forms to resolve
            const stubDownloadForms = sinon.stub(formManager, 'downloadForms');
            stubDownloadForms.rejects(new Error());

            return new Promise(resolve => {

                mockIPCw.dispatch(ACT_UPDATE_FORMS, undefined,
                    (err) => {

                        expect(err).toBeTruthy();
                        expect(stubDownloadForms.callCount).toBe(1);

                        stubDownloadForms.restore();
                        resolve();

                    },
                );

            });

        });

    });
});
