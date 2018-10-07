import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import action_Navigation_RedirectUser, {TYPE} from '.';

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
			const expected = 'target';
			const expectedActions = [
				{
					type: TYPE,
					payload: expected
				}];
			const store = mockStore({});

			// Act
			store.dispatch(action_Navigation_RedirectUser(expected)).then(() => {
				const actual = store.getActions();
				// Assert
				expect(actual.length).toBe(1);
				expect(actual).toEqual(expectedActions);
			});
		});
	});

});
