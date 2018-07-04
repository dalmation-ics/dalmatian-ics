import action_Archive_Blank, {TYPE} from '.';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Action archive suite Delete should ', () => {

    describe('Basics', () => {

        it('resolves true to be true ', () => {
            expect(true).toBe(true);
        });
    });

    describe('dispatch action that ', async () => {
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        it('resolves with correct name', () => {

            // Arrange
            const expectedActions = [
                {
                    type: TYPE,
                }];
            const store = mockStore({});

            // Act
            store.dispatch(action_Archive_Blank()).then(() => {
                const actual = store.getActions();
                // Assert
                expect(actual.length).toBe(1);
                expect(actual).toEqual(expectedActions);
            });
        });
    });
});
