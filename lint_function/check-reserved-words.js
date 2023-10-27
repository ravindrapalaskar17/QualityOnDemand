export default function (apiDefinition) {
  // Define a list of reserved keywords in lowercase
  const reservedKeywords = [
    // Add your list of reserved keywords here, all in lowercase
    'import',
    'switch',
    'reservedkeyword2',
    // Add more keywords as needed
  ];

  // Create an array to store messages
  const messages = [];

  // Check reserved keywords in path keys
  for (const pathKey in apiDefinition.paths) {
    const lowercasePathKey = pathKey.toLowerCase();
    if (reservedKeywords.includes(lowercasePathKey)) {
      messages.push(`Reserved keyword '${pathKey}' used in path name.`);
    }
  }

  // Check reserved keywords in parameter names
  for (const pathKey in apiDefinition.paths) {
    const path = apiDefinition.paths[pathKey];
    for (const method in path) {
      const operation = path[method];
      const parameters = operation.parameters || [];

      for (const parameter of parameters) {
        const paramName = parameter.name;
        const lowercaseParamName = paramName.toLowerCase();

        if (reservedKeywords.includes(lowercaseParamName)) {
          messages.push(`Reserved keyword '${paramName}' used in parameter name in '${pathKey}' for method '${method}'.`);
        }
      }
    }
  }

  // Check reserved keywords in request and response body property names
  for (const pathKey in apiDefinition.paths) {
    const path = apiDefinition.paths[pathKey];
    for (const method in path) {
      const operation = path[method];
      const requestBody = operation.requestBody;
      const responses = operation.responses;

      // Check request body
      if (requestBody && requestBody.content) {
        const content = requestBody.content;
        for (const mediaType in content) {
          const schema = content[mediaType].schema;
          if (schema && schema.properties) {
            for (const propertyName in schema.properties) {
              const lowercasePropertyName = propertyName.toLowerCase();
              if (reservedKeywords.includes(lowercasePropertyName)) {
                messages.push(`Reserved keyword '${propertyName}' used in request body property name in '${pathKey}' for method '${method}'.`);
              }
            }
          }
        }
      }

      // Check response bodies
      for (const responseKey in responses) {
        const response = responses[responseKey];
        const content = response.content;
        for (const mediaType in content) {
          const schema = content[mediaType].schema;
          if (schema && schema.properties) {
            for (const propertyName in schema.properties) {
              const lowercasePropertyName = propertyName.toLowerCase();
              if (reservedKeywords.includes(lowercasePropertyName)) {
                messages.push(`Reserved keyword '${propertyName}' used in response body property name in '${pathKey}' for method '${method}' and response '${responseKey}'.`);
              }
            }
          }
        }
      }
    }
  }

  // Print messages with console.log
  if (messages.length > 0) {
    console.log('Hint: Avoid using reserved keywords in your OpenAPI specification:');
    messages.forEach(message => console.log(message));
  }
}
