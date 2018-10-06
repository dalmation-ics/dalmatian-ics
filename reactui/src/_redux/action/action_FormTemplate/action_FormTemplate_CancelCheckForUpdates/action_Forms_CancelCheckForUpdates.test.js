import action_Forms_CancelCheckForUpdates, {TYPE} from '.';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
import sinon from 'sinon';
import {ACT_CANCEL_CHECK_FOR_UPDATES} from 'src/_core/contract/formsBridge';

describe('Action archive suite update should ', () => {

    describe('Basics', () => {

        it('resolves true to be true ', () => {
            expect(true).toBe(true);
        });
    });

    describe('dispatch action that ', () => {

        let mockStore, middlewares, sandbox;

        beforeEach(() => {
            middlewares = [thunk];
            mockStore = configureMockStore(middlewares);
            sandbox = sinon.sandbox.create();
        });
        afterEach(() => {
            sandbox.restore();
        });

        it('calls prompt on IPC with correct parameters', async () => {

            // Arrange
            const store = mockStore({});
            const fakePrompt = (actionName, callback) => {
                callback('test', 'test');
            };
            //stub out prompt
            let stub = sandbox.stub(ipcRWrapper, 'prompt').
                callsFake(fakePrompt);

            // Act
            store.dispatch(action_Forms_CancelCheckForUpdates()).
                then((err, res) => {
                    // Assert
                    expect(stub.called).toBeTruthy();
                });
        });

        it('creates correct action', async () => {

            // Arrange
            const expected = {
                ERROR: 'ERROR',
                RESULT: 'RESULT',
            };
            const store = mockStore({});
            const fakePrompt = (actionName, callback) => {
                // Assert
                expect(actionName).toBe(ACT_CANCEL_CHECK_FOR_UPDATES);
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipcWrapper function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Forms_CancelCheckForUpdates());
        });

        it('resolves with correct name', async () => {

            // Arrange
            const expected = {
                ERROR: 'ERROR',
                RESULT: 'RESULT',
            };
            const expectedActions = [
                {
                    type: TYPE,
                    err: expected.ERROR,
                    result: expected.RESULT,
                }];
            const store = mockStore({});
            const fakePrompt = (actionName, callback) => {
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipcWrapper function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Forms_CancelCheckForUpdates()).
                then(() => {
                    const actual = store.getActions();
                    // Assert
                    expect(actual.length).toBe(1);
                    expect(actual).toEqual(expectedActions);
                });
        });
    });
});
