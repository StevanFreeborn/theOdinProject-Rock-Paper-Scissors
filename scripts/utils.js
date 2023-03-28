/**
 * Takes a word, capitalizes its first letter and lower cases the rest of the word.
 * @param {string} word - The word you want to capitalize.
 * @returns {string} The capitalized word.
 */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export { capitalize };
