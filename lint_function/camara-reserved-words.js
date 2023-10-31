const reservedWords = [
  'switch',
  // Add other reserved words
];

export default async function (input) {
  const errors = [];
  const suggestions = [];

  function checkReservedWordsInPathKeys(path) {
    if (typeof path === 'string') {
      for (const word of reservedWords) {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        if (regex.test(path)) {
          errors.push(word);
          suggestions.push(`Consider avoiding the use of reserved word '${word}' in path key.`);
        }
      }
    }
  }

  // Iterate over properties of the input object
  for (const path in input) {
    const value = input[path];

    // Check if the value is a string
    if (typeof value === 'string') {
      for (const word of reservedWords) {
        const regex = new RegExp(`\\b${word}\\b`, 'g');

        if (regex.test(value)) {
          errors.push(word);
          suggestions.push(`Consider avoiding the use of reserved word '${word}'.`);
        }
      }
    }

    // Check path for reserved words
    checkReservedWordsInPathKeys(path);
  }

  // Check if any reserved words are in the suggestions
  if (errors.length > 0) {
    console.log('Hint: Reserved words found in input: ' + suggestions.join(', '));
  }
}
