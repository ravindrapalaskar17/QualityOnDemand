const sensitiveData = ['id', 'Id', 'ID', 'iD'];

export default async function(input) {
  const results = [];
  const warningRuleName = 'camara-path-param-id';
  const description = `Path Parameter Naming Warning: Use 'resource_id' instead of sensitive data in path parameters.`;

  // Iterate over properties of the input object
  for (const [path, params] of Object.entries(input)) {
    // Check if params is an array and iterate over each parameter
    if (Array.isArray(params)) {
      params.forEach((param, index) => {
        if (param && param.in === 'path' && param.name) {
          for (const word of sensitiveData) {
            const regex = new RegExp(`^${word}$`, 'i');
            
            if (regex.test(param.name)) {
              // Define location for logging
              const location = `parameters[${index}].name`;
              console.log(`warning  ${warningRuleName}  ${description}  ${location}`);

              // Add the warning message to results
              results.push({
                message: `Path Parameter Naming Warning: Use 'resource_id' instead of '${word}' in path parameters.`,
                path: [location],
              });
            }
          }
        }
      });
    }
  }

  return results;
};
