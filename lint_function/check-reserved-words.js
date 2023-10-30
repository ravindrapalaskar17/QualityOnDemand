export default async function (apiDefinition) {
  const reservedWords = [
    // Add your list of reserved words here
    'import',
    'switch',
    // Add more reserved words as needed
  ];

  const errors = [];
  const suggestions = [];

  for (const pathKey in apiDefinition.paths) {
    // Check reserved words in path keys
    if (reservedWords.includes(pathKey.toLowerCase())) {
      errors.push(pathKey);
    }

    const path = apiDefinition.paths[pathKey];
    for (const method in path) {
      const parameters = path[method].parameters || [];

      for (const parameter of parameters) {
        // Check reserved words in path parameters
        if (parameter.in === 'path' && reservedWords.includes(parameter.name.toLowerCase())) {
          errors.push(parameter.name);
        }
      }
    }
  }

  if (errors.length > 0) {
    for (const error of errors) {
      suggestions.push(`Avoid using reserved word '${error}'.`);
    }
    console.log('Hint: Reserved words found in input: ' + suggestions.join(', '));
  }
}
