const sensitiveData = ['id', 'Id', 'ID', 'iD'];

export default function(targetVal) {
  if (!Array.isArray(targetVal)) {
    return []; // Handle non-array input gracefully by returning an empty array
  }

  const results = [];

  // Iterate over each parameter
  for (const [index, param] of targetVal.entries()) {
    if (param && param.in === 'path' && param.name) {
      for (const word of sensitiveData) {
        // Match 'id' in various case-insensitive forms
        const regex = new RegExp(`^${word}$`, 'i');

        if (regex.test(param.name)) {
          results.push({
            message: `Path Parameter Naming Warning: Use 'resource_id' instead of '${word}' in path parameters.`,
            path: [`parameters[${index}].name`],
          });
        }
      }
    }
  }

  return results;
};
