const ElectronBridge = require('.');
const {MissingArgumentError, IncorrectTypeError} = require(
    '../../../_core/error/');
const sinon = require('sinon');
const {version} = require('../../../../package.json');

const {
    ACT_SET_TITLE
} = require('../../../_core/contract/electronBridge');

const buildMockIPCW = () => {

    return {
        appTitle: 'BC ICS FormComplete Editor v' + version,
        register: function (name, action) {
            this[name] = action;
        },
        registerSync: function (name, action) {
            this[name] = action;
        },
        dispatch: function (name, args, callback) {
            this[name](callback, args);
        },
        window: {
            once: (...a) => {

            },
            setTitle: (title) => {

            }
        },
    };

};

describe('Electron bridge should ', () => {

    describe('', () => {

        it('resolve true to be true', () => {

            expect(true).toBe(true);

        });

    });

    describe('register ACT_SET_TITLE which ', () => {

        it('is registered correctly', () => {

            // Arrange
            const mockIPCw = buildMockIPCW();

            // Act
            ElectronBridge(mockIPCw);

            // Assert
            expect(mockIPCw[ACT_SET_TITLE]).toBeDefined();

        });

        it('returns MissingArgumentError if argument title not passed', async () => {

            expect.assertions(2);

            // Arrange
            const mockIPCw = buildMockIPCW();
            ElectronBridge(mockIPCw);

            const spy = sinon.spy(mockIPCw.window, 'setTitle');

            return new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_SET_TITLE, undefined, (err) => {

                    // Assert
                    expect(err).toBeInstanceOf(MissingArgumentError);
                    expect(spy.calledOnce).toBeFalsy();

                    spy.restore();

                    resolve();

                });

            });


        });

        it('returns IncorrectTypeError if argument type is not string', async () => {

            expect.assertions(2);

            // Arrange
            const mockIPCw = buildMockIPCW();
            ElectronBridge(mockIPCw);

            const spy = sinon.spy(mockIPCw.window, 'setTitle');

            return new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_SET_TITLE, 0, (err) => {

                    // Assert
                    expect(err).toBeInstanceOf(IncorrectTypeError);
                    expect(spy.calledOnce).toBeFalsy();

                    spy.restore();

                    resolve();

                });

            });

        });

        it('calls window.setTitle with title', async ()=>{

            // Arrange
            const mockIPCw = buildMockIPCW();
            ElectronBridge(mockIPCw);

            const stub = sinon.stub(mockIPCw.window,'setTitle');
            stub.returns(0);

            return new Promise(resolve => {

                // Act
                mockIPCw.dispatch(ACT_SET_TITLE, 'hello', (err) => {

                    expect(err).toBeNull();
                    expect(stub.callCount).toBe(1);
                    expect(stub.getCall(0).args[0]).toEqual(mockIPCw.appTitle + ' ~ hello');

                    stub.restore();

                    resolve();

                });

            });

        });

    });

});
