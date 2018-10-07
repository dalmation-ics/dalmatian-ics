import {mount} from 'enzyme';
import * as React from 'react';
import sinon from 'sinon';
import {createStore, wrapWithProvider} from 'src/_core/test/reduxTestUtils';
import FormSelector from '../';

describe('FormSelector should', () => {

	let store;

	// Create a new store before each test
	beforeEach(() => {
		store = createStore();
	});

	describe('', () => {

		it('resolve that true is true', () => {
			expect(true).toBe(true);
		});

		it('mount', () => {

			// Arrange
			sinon.spy(FormSelector.prototype, 'componentDidMount');

			// Act
			mount(wrapWithProvider(<FormSelector/>, store));

			// Assert
			expect(FormSelector.prototype.componentDidMount.calledOnce).
				toBe(true);

			// Restore
			FormSelector.prototype.componentDidMount.restore();

		});

	});

});
