import action_Forms_CancelUpdateForms, {TYPE} from '.';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
import sinon from 'sinon';
import {ACT_GET_FORMS_INDEX} from 'src/_core/contract/formsBridge';
import actionStatus from 'src/_core/redux/types/actionStatus';

describe('action_FormTemplate_GetFormsIndex should ', () => {

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
            store.dispatch(action_Forms_CancelUpdateForms()).
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
                expect(actionName).toBe(ACT_GET_FORMS_INDEX);
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipcWrapper function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Forms_CancelUpdateForms());
        });

        it('resolves with correct name', async () => {

            // Arrange
            const expected = {
                ERROR: undefined,
                RESULT: 'RESULT',
            };
            const expectedActions = [
                {
                    type: TYPE,
                    status: actionStatus.STARTED,
                }, {
                    type: TYPE,
                    status: actionStatus.COMPLETE,
                    payload: expected.RESULT,
                },
            ];
            const store = mockStore({});
            const fakePrompt = (actionName, callback) => {
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipcWrapper function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Forms_CancelUpdateForms()).
                then(() => {
                    const actual = store.getActions();
                    // Assert
                    expect(actual.length).toBe(expectedActions.length);
                    expect(actual).toEqual(expectedActions);
                });
        });

        it('resolves err from IPC correctly', async () => {

            // Arrange
            const expected = {
                ERROR: 'ERROR TEST',
                RESULT: 'RESULT',
            };
            const expectedActions = [
                {
                    type: TYPE,
                    status: actionStatus.STARTED,
                }, {
                    type: TYPE,
                    status: actionStatus.ERROR,
                    payload: expected.ERROR,
                },
            ];
            const store = mockStore({});
            const fakePrompt = (actionName, callback) => {
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipcWrapper function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Forms_CancelUpdateForms()).
                then(() => {
                    const actual = store.getActions();
                    // Assert
                    expect(actual.length).toBe(expectedActions.length);
                    expect(actual).toEqual(expectedActions);
                });
        });
    });
});
