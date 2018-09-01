const stateBridge = require('.');
const stateManager = require('../../storage').stateManager;
const sinon = require('sinon');
const FileNotFoundError = require('../../../_core/error').FileNotFoundError;

const {
    ACT_LOAD_STATE,
    ACT_SAVE_STATE,
    ACT_APP_VERSION,
} = require('../../../_core/contract/stateBridge');

const buildMockIPCW = () => {

    return {
        register: function(name, action) {
            this[name] = action;
        },
        registerSync: function(name, action) {
            this[name] = action;
        },
        dispatch: function(name, args, callback) {
            this[name](callback, args);
        },
        window: {
            once: (...a) => {

            },
        },
    };

};

describe('StateBridge should ', () => {

    describe('', () => {

        it('resolves true to be true', () => {

            expect(true).toBe(true);

        });

    });

    describe('have ACT_LOAD_STATE that ', () => {

        it('is registered correctly', () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            stateBridge(mockIPCw);

            // Act
            // Assert
            expect(mockIPCw[ACT_LOAD_STATE]).toBeDefined();

        });

        it('returns loaded state', async () => {

            expect.assertions(3);

            // Arrange
            const mockIPCw = buildMockIPCW();
            stateBridge(mockIPCw);

            // Stub load methods
            const stub = sinon.stub(stateManager, 'load');
            // Stub should reject err
            stub.withArgs().resolves('hello');

            return new Promise(resolve => {

                mockIPCw.dispatch(ACT_LOAD_STATE, undefined, (err, result) => {

                    expect(err).toBeNull();
                    expect(stub.callCount).toEqual(1);
                    expect(result).toEqual('hello');

                    stub.restore();

                    resolve();

                });

            });

        });

        it('rejects errors correctly', async () => {

            expect.assertions(2);

            // Arrange
            const mockIPCw = buildMockIPCW();
            stateBridge(mockIPCw);

            // Stub load methods
            const stub = sinon.stub(stateManager, 'load');
            // Stub should reject err
            stub.withArgs().rejects(new Error());

            return new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_LOAD_STATE, undefined, (err) => {

                    // Assert
                    expect(err).toBeTruthy();
                    expect(stub.callCount).toBe(1);

                    stub.restore();

                    resolve();

                });

            });

        });

        it('returns false if state file does not exist', async () => {

            expect.assertions(3);

            // Arrange
            const mockIPCw = buildMockIPCW();
            stateBridge(mockIPCw);

            // Stub load methods
            const stub = sinon.stub(stateManager, 'load');
            // Stub should reject err
            stub.withArgs().rejects(new FileNotFoundError('state'));

            return new Promise(resolve => {

                mockIPCw.dispatch(ACT_LOAD_STATE, undefined, (err, result) => {

                    expect(err).toBeNull();
                    expect(stub.callCount).toEqual(1);
                    expect(result).toBe(false);

                    stub.restore();

                    resolve();

                });

            });

        });

    });

    describe('have ACT_APP_VERSION that', () => {

        it('is registered correctly', () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            stateBridge(mockIPCw);

            // Act
            // Assert
            expect(mockIPCw[ACT_APP_VERSION]).toBeDefined();

        });

        it('resolves appVersion', async () => {

            // Arrange
            const mockIPCw = buildMockIPCW();
            stateBridge(mockIPCw);

            // Stub appVersion
            const stub = sinon.stub(stateManager, 'appVersion');
            // appVersion returns 1.0.0
            stub.withArgs().returns('1.0.0');

            return new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_APP_VERSION, undefined, (err, result) => {

                    expect(err).toBeNull();
                    expect(result).toEqual('1.0.0');

                    stub.restore();

                    resolve();

                });

            });

        });

    });

});