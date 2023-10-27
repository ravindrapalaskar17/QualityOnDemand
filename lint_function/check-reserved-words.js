export default function (apiDefinition) {
  // Define a list of reserved keywords
  const reservedKeywords = [
    // Add your list of reserved keywords here
    'reservedKeyword1',
     'import',
    'reservedKeyword2',
    // Add more keywords as needed
  ];

  // Create an array to store messages
  const messages = [];

  // Iterate through the OpenAPI specification
  for (const pathKey in apiDefinition.paths) {
    const path = apiDefinition.paths[pathKey];
    for (const method in path) {
      const operation = path[method];
      const pathParameters = operation.parameters || [];
      
      // Check path and operation names
      if (reservedKeywords.includes(pathKey)) {
        messages.push(`Reserved keyword '${pathKey}' used in path name.`);
      }

      // Check path or query parameter names
      for (const parameter of pathParameters) {
        if (parameter.in === 'path' || parameter.in === 'query') {
          if (reservedKeywords.includes(parameter.name)) {
            messages.push(`Reserved keyword '${parameter.name}' used in parameter name.`);
          }
        }
      }

      // Check request and response body property names
      // Add your checks for request and response body properties here

      // Check security schemes
      // Add your checks for security schemes here

      // Check component names
      // Add your checks for component names here

      // Check OperationIds
      // Add your checks for OperationIds here
    }
  }

  // Print messages with console.log
  if (messages.length > 0) {
    console.log('Hint: Avoid using reserved keywords in your OpenAPI specification:');
    messages.forEach(message => console.log(message));
  }
}
