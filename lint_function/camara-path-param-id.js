module.exports = {
  'camara-path-param-id': async (targetVal) => {
    if (!Array.isArray(targetVal)) {
      return [];
    }

    const results = [];
    const sensitiveData = ['id', 'Id', 'ID', 'iD'];

    // Iterate over each parameter
    for (const [index, param] of targetVal.entries()) {
      if (param && param.in === 'path' && param.name) {
        for (const word of sensitiveData) {
          const regex = new RegExp(`^${word}$`, 'i'); // Match exact word case-insensitively

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
  }
};
