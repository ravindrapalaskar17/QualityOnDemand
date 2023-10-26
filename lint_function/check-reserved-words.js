export default function (apiDefinition) {
  const errors = [];

  // List of reserved words
  const reservedWords = [
    // Add your list of reserved words here
    'reservedWord1',
    'reservedWord2',
    'reservedWord3',
  ];

  // Function to check if a string contains a reserved word
  function containsReservedWord(str) {
    return reservedWords.some(word => str.includes(word));
  }

  // Check reserved words in path and operation names
  for (const pathKey in apiDefinition.paths) {
    if (containsReservedWord(pathKey)) {
      errors.push({
        message: `Reserved word found in path name: '${pathKey}'`,
        path: `paths.${pathKey}`,
      });
    }

    const path = apiDefinition.paths[pathKey];
    for (const method in path) {
      if (containsReservedWord(method)) {
        errors.push({
          message: `Reserved word found in operation name: '${method}'`,
          path: `paths.${pathKey}.${method}`,
        });
      }
    }
  }

  // Add more checks for other parts of the specification (e.g., parameter names, response body property names, security schemes, component names, operationIds) as needed

  return errors;
}
