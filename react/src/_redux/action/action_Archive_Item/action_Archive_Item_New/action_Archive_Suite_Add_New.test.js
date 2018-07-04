import action_Archive_Suite_Add_New, {TYPE} from '../../../../../../electron/src/main';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ipcRWrapper from 'src/_core/electron/IpcRWrapper';
import sinon from 'sinon';
import {ACT_GET_FORM} from 'src/_core/contract/formsBridge';
import * as actionStatus from 'src/_core/redux/types';
import mock_formIndexResponse from 'src/_core/test/mock/mock_formIndexIPCResponse';
import uuid from 'uuid';
import _ from 'lodash';

describe('action_Archive_Suite_Add_New should ', () => {

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
            store = mockStore({
                formsStore: {
                    formIndex: mock_formIndexResponse.formIndexTest,
                },
            });
            sandbox = sinon.sandbox.create();
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
            store.dispatch(action_Archive_Suite_Add_New(
                mock_formIndexResponse.formIndexTest[0].id)).
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
            const fakePrompt = (actionName, callback) => {
                // Assert
                expect(actionName).toBe(ACT_GET_FORM);
                callback(expected.ERROR, expected.RESULT);
            };
            //stub out the prompt ipc function
            sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

            // Act
            store.dispatch(action_Archive_Suite_Add_New(
                mock_formIndexResponse.formIndexTest[0].id));
        });

        describe('has happy path event chain that ', () => {
            const expected = {
                ERROR: undefined,
                RESULT: 'IPC PROMPT RESULT',
            };
            beforeEach(() => {
                const fakePrompt = (actionName, callback) => {
                    callback(expected.ERROR, expected.RESULT);
                };
                //stub out the prompt ipc function
                sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);
                sandbox.stub(uuid, 'v4').
                    returns(() => 'cf4bf184-1383-45cc-abee-82d39aa3' +
                        '2dc4');
            });

            it('resolves with correct name', async () => {

                // Arrange
                let dummyForm = mock_formIndexResponse.formIndexTest[0];
                const expectedActions = [
                    {
                        type: TYPE,
                        status: actionStatus.STARTED,
                    }, {
                        type: TYPE,
                        status: actionStatus.COMPLETE,
                        payload: {
                            content: expected.RESULT,
                            uuid: uuid.v4(),
                            ...dummyForm,
                        },
                    },
                ];

                // Act
                store.dispatch(action_Archive_Suite_Add_New(
                    dummyForm.id)).
                    then(() => {
                        const actual = store.getActions();
                        // Assert
                        expect(actual.length).toBe(expectedActions.length);
                        expect(actual).toEqual(expectedActions);
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
                const dummyForm = mock_formIndexResponse.formIndexTest[0];
                const expectedActions = [
                    {
                        type: TYPE,
                        status: actionStatus.STARTED,
                    }, {
                        type: TYPE,
                        status: actionStatus.ERROR,
                        payload: expected.RESULT,
                    },
                ];
                const fakePrompt = (actionName, callback) => {
                    callback(expected.ERROR, expected.RESULT);
                };
                //stub out the prompt ipc function
                sandbox.stub(ipcRWrapper, 'prompt').callsFake(fakePrompt);

                // Act
                store.dispatch(action_Archive_Suite_Add_New(
                    dummyForm.id)).
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
