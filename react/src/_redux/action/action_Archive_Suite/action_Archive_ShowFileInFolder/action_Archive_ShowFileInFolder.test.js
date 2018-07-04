import action_Archive_ShowFileInFolder, {TYPE} from '.';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ipcRWrapper from 'src/_core/electron/IpcRWrapper';
import sinon from 'sinon';
import {ACT_SHOW_PATH_IN_FOLDER} from 'src/_core/contract/exportBridge';

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
            store.dispatch(action_Archive_ShowFileInFolder()).
                then((err, res) => {
                    // Assert
                    expect(stub.called).toBeTruthy();
                });
        });

        it('creates correct action', async () => {

            // Arrange
            const expected = {
                ERROR: 'ERROR',
            };
            const store = mockStore({});
            const fakePrompt = (actionName, callback) => {
                // Assert
                expect(actionName).toBe(ACT_SHOW_PATH_IN_FOLDER);
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipc function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Archive_ShowFileInFolder());
        });

        it('resolves with correct name', async () => {

            // Arrange
            const expected = {
                ERROR: 'ERROR',
            };
            const expectedActions = [
                {
                    type: TYPE,
                    err: expected.ERROR,
                }];
            const store = mockStore({});
            const fakePrompt = (actionName, callback) => {
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipc function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Archive_ShowFileInFolder()).
                then(() => {
                    const actual = store.getActions();
                    // Assert
                    expect(actual.length).toBe(1);
                    expect(actual).toEqual(expectedActions);
                });
        });

        it('handles filePath parameter correctly', async () => {

            // Arrange
            const expected = {
                ERROR: 'ERROR',
                FILEPATH: 'C:/somefile.bcics',
            };
            const expectedActions = [
                {
                    type: TYPE,
                    err: expected.ERROR,
                    filePath: expected.FILEPATH,
                }];
            const store = mockStore({});
            const fakePrompt = (actionName, callback, filePath) => {
                expect(filePath).toEqual(expected.FILEPATH);
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipc function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Archive_ShowFileInFolder(expected.FILEPATH)).
                then(() => {
                    const actual = store.getActions();
                    // Assert
                    expect(actual.length).toBe(1);
                    expect(actual).toEqual(expectedActions);
                });
        });
    });
});
