import action_Navigation_SelectForm, {TYPE} from '.';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

describe('action navigation path change should', () => {

    describe('run', () => {
        it('resolves true to be true ', () => {
            expect(true).toBe(true);
        });
    });

    describe('dispatch action that ', async () => {
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        it('resolves with correct path', () => {

            // Arrange
            const expected = '123';
            const expectedActions = [
                {
                    type: TYPE,
                    payload: expected
                }];
            const store = mockStore({});

            // Act
            store.dispatch(action_Navigation_SelectForm(expected)).then(() => {
                const actual = store.getActions();
                // Assert
                expect(actual.length).toBe(1);
                expect(actual).toEqual(expectedActions);
            });
        });
    });

});
