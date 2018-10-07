import moment from 'moment';
import * as SUT from '.';

describe('MomentUtil should ', () => {

	describe('', () => {

		it('resolve that true is true', () => {

			expect(true).toBe(true);

		});

	});

	describe('have method getEnglishTimeSince that ', () => {

		it('exists', () => {

			expect(SUT['getEnglishTimeSince']).toBeDefined();

		});

		it('returns "Today" when given today\'s date', () => {

			// Arrange
			const today = moment();

			// Act
			const result = SUT.getEnglishTimeSince(today);

			// Assert
			expect(result).toBe('Today');

		});

		it('returns "Yesterday" when given yesterday\' date', () => {

			// Arrange
			const yesterday = moment().subtract(1, 'day');

			// Act
			const result = SUT.getEnglishTimeSince(yesterday);

			// Assert
			expect(result).toBe('Yesterday');

		});

		it('returns "* Days Ago" when given *\'s date', () => {

			for (let i = 3; i < 7; i++) {

				// Arrange
				const date = moment().subtract(i, 'day');

				// Act
				const result = SUT.getEnglishTimeSince(date);

				// Assert
				expect(result).toBe(`${i} Days Ago`);

			}

		});

		it('returns "* Week[s] Ago" when given *\'s date', () => {

			for (let i = 1; i < 4; i++) {

				// Arrange
				const date = moment().subtract(i, 'week');

				// Act
				const result = SUT.getEnglishTimeSince(date);

				// Assert
				expect(result).toBe(`${i} Week${i === 1 ? '' : 's'} Ago`);

			}

		});

	});

});