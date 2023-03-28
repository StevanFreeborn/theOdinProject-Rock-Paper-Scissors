import { capitalize } from '../scripts/utils.js';

describe('utils', () => {
  test('capitalize_WhenCalled_ItShouldReturnTheWordGivenCapitalized', () => {
    const testCases = {
      hello: 'Hello',
      Hello: 'Hello',
      heLLO: 'Hello',
      WoRld: 'World',
    };

    for (const [word, expectedResult] of Object.entries(testCases)) {
      const result = capitalize(word);
      expect(result).toBe(expectedResult);
    }
  });
});
