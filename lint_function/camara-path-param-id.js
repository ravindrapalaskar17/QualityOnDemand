const sensitiveData = ['id', 'Id', 'ID', 'iD'];

export default function(targetVal) {
  if (!Array.isArray(targetVal)) {
    return []; // Handle non-array input gracefully by returning an empty array
  }

  const results = [];
  const warningRuleName = 'camara-path-param-id';
  const description = `Path Parameter Naming Warning: Use 'resource_id' instead of 'id' in path parameters.`;

  // Iterate over each parameter
  for (const [index, param] of targetVal.entries()) {
    if (param && param.in === 'path' && param.name) {
      for (const word of sensitiveData) {
        const regex = new RegExp(`^${word}$`, 'i');

        if (regex.test(param.name)) {
          // Log the warning with details
          const location = `parameters[${index}].name`;
          console.log(`warning  ${warningRuleName}  ${description}  ${location}`);

          // Add result to be returned
          results.push({
            message: `Path Parameter Naming Warning: Use 'resource_id' instead of '${word}' in path parameters.`,
            path: [location],
          });
        }
      }
    }
  }

  return results;
};
