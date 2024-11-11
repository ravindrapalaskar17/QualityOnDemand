const sensitiveData = ['id', 'Id', 'ID', 'iD'];

module.exports = async function lintPathParamId(targetVal) {
  if (!Array.isArray(targetVal)) {
    return []; // Handle null or undefined input gracefully by returning an empty array
  }

  const results = [];

  // Iterate over each parameter
  for (const [index, param] of targetVal.entries()) {
    if (param && param.in === 'path' && param.name) {
      for (const word of sensitiveData) {
        // Updated regex: checks for 'id' anywhere in the string (as a substring)
        const regex = new RegExp(`(?:^|[^a-zA-Z0-9])${word}(?:$|[^a-zA-Z0-9])`, 'i'); // Match 'id' but allow for surrounding characters

        if (regex.test(param.name)) {
          results.push({
            message: `Path Parameter Naming Warning: Use 'resource_id' instead of '${word}' in path parameters.`,
            path: [`parameters[${index}].name`],
          });
          console.log(`Warning: Sensitive path parameter detected - "${word}" at parameters[${index}].name`);
        }
      }
    }
  }

  return results;
};
