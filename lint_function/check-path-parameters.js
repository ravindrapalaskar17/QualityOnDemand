export default function (apiDefinition) {
  const errors = [];

  // Rule 1: The attribute must be identifying itself
  for (const pathKey in apiDefinition.paths) {
    const path = apiDefinition.paths[pathKey];
    for (const method in path) {
      const operation = path[method];
      const pathParameters = operation.parameters || [];
      
      for (const parameter of pathParameters) {
        if (parameter.in === 'path' && parameter.name === 'id') {
          errors.push({
            console.log("Path parameter 'id' in '${pathKey}' should provide more context" ,
            path: paths.${pathKey}.${method}.parameters")
          });
        }
      }
    }
  }

  // Rule 2: The identifier should have a similar morphology on all endpoints
  const entityNames = new Set();

  for (const pathKey in apiDefinition.paths) {
    const path = apiDefinition.paths[pathKey];
    for (const method in path) {
      const operation = path[method];
      const pathParameters = operation.parameters || [];

      for (const parameter of pathParameters) {
        if (parameter.in === 'path') {
          const name = parameter.name;
          if (name.endsWith('Id')) {
            const entityName = name.substring(0, name.length - 2); // Remove 'Id'
            entityNames.add(entityName);
          }
        }
      }
    }
  }

  for (const pathKey in apiDefinition.paths) {
    const path = apiDefinition.paths[pathKey];
    for (const method in path) {
      const operation = path[method];
      const pathParameters = operation.parameters || [];

      for (const parameter of pathParameters) {
        if (parameter.in === 'path') {
          const name = parameter.name;
          if (name.endsWith('Id')) {
            const entityName = name.substring(0, name.length - 2);
            if (!entityNames.has(entityName)) {
              errors.push({
                message: `Path parameter '${name}' in '${pathKey}' does not follow the recommended naming convention.`,
                path: `paths.${pathKey}.${method}.parameters`,
              });
            }
          }
        }
      }
    }
  }

  return errors;
}
