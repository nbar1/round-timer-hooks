import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';

/**
 * We're doing this to mock out console.error to get rid of
 * the useless act() error calls from jest. Once this is
 * resolved on their side, we should remove this.
 */

const consoleError = console.error;

beforeAll(() => {
	jest.spyOn(console, 'error').mockImplementation((...args) => {
		if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
			consoleError(...args);
		}
	});
});
