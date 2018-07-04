import action_Forms_UpdateForms, {TYPE} from '.';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ipcRWrapper from 'src/_core/electron/ipcWrapper/index';
import sinon from 'sinon';
import {ACT_UPDATE_FORMS} from 'src/_core/contract/formsBridge';
import actionStatus from 'src/_core/redux/types/actionStatus';
import * as actionCreator_GetFormsIndex from '../action_FormTemplate_GetFormsIndex';

describe('action_FormTemplate_UpdateForms should ', () => {

    describe('Basics', () => {

        it('resolves true to be true ', () => {
            expect(true).toBe(true);
        });
    });

    describe('dispatch action that ', () => {

        let mockStore, middlewares, sandbox, stub_action_GetFormsIndex;
        let store;

        beforeEach(() => {
            middlewares = [thunk];
            mockStore = configureMockStore(middlewares);
            store = mockStore({});
            sandbox = sinon.sandbox.create();
            stub_action_GetFormsIndex = sandbox.stub(
                actionCreator_GetFormsIndex, 'default');
            stub_action_GetFormsIndex.callsFake(
                () => (dispatch) => new Promise(resolve => {
                    // done because thunk flips a lid
                    // if this isn't defined as a promise
                }));
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
            store.dispatch(action_Forms_UpdateForms()).
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
                expect(actionName).toBe(ACT_UPDATE_FORMS);
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipcWrapper function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Forms_UpdateForms());
        });

        describe('has happy path event chain that ', () => {
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
            beforeEach(() => {
                const fakePrompt = (actionName, callback) => {
                    callback(expected.ERROR, expected.RESULT);
                };
                //stub out the prompt ipcWrapper function
                sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            });

            it('resolves with correct name', async () => {

                // Arrange

                // Act
                store.dispatch(action_Forms_UpdateForms()).
                    then(() => {
                        const actual = store.getActions();
                        // Assert
                        expect(actual.length).toBe(expectedActions.length);
                        expect(actual).toEqual(expectedActions);
                    });
            });

            it('calls action_GetFormsIndex once', async () => {

                // Arrange
                const store = mockStore({});

                // Act
                store.dispatch(action_Forms_UpdateForms()).
                    then(() => {
                        // Assert
                        expect(stub_action_GetFormsIndex.called).toBeTruthy();
                    });
            });
        });

        describe('has error handlers that ', async () => {

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
                const fakePrompt = (actionName, callback) => {
                    callback(expected.ERROR, expected.RESULT);
                };
                //stub out the prompt ipcWrapper function
                sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

                // Act
                store.dispatch(action_Forms_UpdateForms()).
                    then(() => {
                        const actual = store.getActions();
                        // Assert
                        expect(actual.length).toBe(expectedActions.length);
                        expect(actual).toEqual(expectedActions);
                    });
            });
        });
    });
});
