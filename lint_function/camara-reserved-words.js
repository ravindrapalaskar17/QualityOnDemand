const reservedWords = [
  'switch',
  // Add other reserved words
];

export default async function (input) {
  const errors = [];
  const suggestions = [];

  // Function to check for reserved words
  function checkForReservedWords(value, context) {
    if (typeof value === 'string') {
      for (const word of reservedWords) {
        const regex = new RegExp(`\\b${word}\\b`, 'g');

        if (regex.test(value)) {
          errors.push(word);
          suggestions.push(`Consider avoiding the use of reserved word '${word}' in ${context}.`);
        }
      }
    }
  }

  // Iterate over paths in the input object
  if (input.paths) {
    for (const path in input.paths) {
      // Check path key for reserved words
      checkForReservedWords(path, 'path');

      const pathObject = input.paths[path];

      // Check path parameters
      if (pathObject.parameters) {
        for (const param of pathObject.parameters) {
          checkForReservedWords(param.name, 'path parameter');
        }
      }

      // Check operations in the path
      for (const method in pathObject) {
        if (method !== 'parameters') {
          const operation = pathObject[method];

          // Check summary and description for reserved words
          checkForReservedWords(operation.summary, 'summary');
          checkForReservedWords(operation.description, 'description');
        }
      }
    }
  }

  // Check if any reserved words are found
  if (errors.length > 0) {
    console.log('Hint: Reserved words found in input: ' + suggestions.join(', '));
  }
}
