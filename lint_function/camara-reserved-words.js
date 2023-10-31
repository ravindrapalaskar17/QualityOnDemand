const reservedWords = [
  'switch',
  // Add other reserved words
];

export default async function (input) {
  const errors = [];
  const suggestions = [];

  if (input.paths) {
    // Iterate over the paths
    for (const path in input.paths) {
      // Check for reserved words in the path key
      checkForReservedWords(path, errors, suggestions);

      const pathObject = input.paths[path];
      // Continue to check other elements within the pathObject as needed.
    }
  }

  // Check if any reserved words are in the suggestions
  if (errors.length > 0) {
    console.log('Hint: Reserved words found in input: ' + suggestions.join(', '));
  }
}

function checkForReservedWords(value, errors, suggestions) {
  if (typeof value === 'string') {
    for (const word of reservedWords) {
      const regex = new RegExp(`\\b${word}\\b`, 'g');

      if (regex.test(value)) {
        errors.push(word);
        suggestions.push(`Consider avoiding the use of reserved word '${word}'.`);
      }
    }
  }
}
