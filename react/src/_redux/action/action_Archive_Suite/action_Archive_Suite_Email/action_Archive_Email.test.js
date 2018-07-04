import action_Archive_Suite_Email, {TYPE} from '.';
import * as actionCreator_Archive_Save from '../action_Archive_Suite_Save';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ipcRWrapper from 'src/_core/electron/IpcRWrapper';
import sinon from 'sinon';
import {
    ACT_ARCHIVE_SEND_EMAIL,
    ACT_SAVE_ARCHIVE,
} from 'src/_core/contract/exportBridge';
import {COMPLETE, STARTED} from 'src/_core/redux/actionStatus';

describe('Action archive email should ', () => {

    describe('Basics', () => {

        it('resolves true to be true ', () => {
            expect(true).toBe(true);
        });
    });

    describe('dispatch action that ', () => {

        let mockStore, middlewares, sandbox, store;

        beforeEach(() => {
            middlewares = [thunk];
            mockStore = configureMockStore(middlewares);
            sandbox = sinon.sandbox.create();
            store = mockStore(
                {archiveStore: {archive: [{fileName: 'some file'}]}});
        });
        afterEach(() => {
            sandbox.restore();
        });

        it('calls prompt on IPC with correct parameters', async () => {

            // Arrange
            const fakePrompt = (actionName, callback) => {
                callback('test', 'test');
            };
            //stub out prompt
            let stub = sandbox.stub(ipcRWrapper, 'prompt').
                callsFake(fakePrompt);

            // Act
            store.dispatch(action_Archive_Suite_Email()).
                then((err, res) => {
                    // Assert
                    sinon.assert.calledWith(stub, ACT_ARCHIVE_SEND_EMAIL);
                    sinon.assert.calledWith(stub, ACT_SAVE_ARCHIVE);
                });
        });

        it('creates correct action', async () => {

            // Arrange
            const expected = {
                ERROR: 'ERROR',
            };
            const fakePrompt = (actionName, callback) => {
                if (actionName === ACT_SAVE_ARCHIVE) {
                    callback(undefined, 'Mock Success');
                }
                // Assert
                expect(actionName).toBe(ACT_ARCHIVE_SEND_EMAIL);
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipc function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Archive_Suite_Email());
        });

        it('resolves with correct name', async () => {

            // Arrange
            const expected = {
                DUMMY: undefined,
                ERROR: undefined,
            };
            const expectedActions = [
                {
                    type: TYPE,
                    status: STARTED,
                },
                {
                    type: actionCreator_Archive_Save.TYPE,
                    status: STARTED,
                },
                {
                    payload: null,
                    type: actionCreator_Archive_Save.TYPE,
                },
                {
                    type: TYPE,
                    status: COMPLETE,
                }];
            const fakePrompt = (actionName, callback) => {
                if (actionName === actionCreator_Archive_Save.TYPE)
                    callback(expected.ERROR, expected.DUMMY);
            };
            //stub out the prompt ipc function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Archive_Suite_Email()).
                then(() => {
                    const actual = store.getActions();
                    // Assert
                    expect(actual.length).toBe(4);
                    expect(actual).toEqual(expectedActions);
                });
        });
    });
});
