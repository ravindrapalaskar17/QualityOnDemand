// customFunctions.js
module.exports = {
  pathParamIdCheck: (targetVal) => {
    if (!Array.isArray(targetVal)) {
      return [];
    }

    const results = [];

    targetVal.forEach((param, index) => {
      // Check if 'param' is an object and has the 'in' property with the value 'path'
      if (param && param.in === 'path' && param.name) {
        // Check if the name contains 'id', ignoring case
        if (/^(id|Id|ID|iD)$/.test(param.name)) {
          results.push({
            message: "Path Parameter Naming Warning: Use 'resource_id' instead of 'id' in path parameters.",
            path: [`parameters[${index}].name`]
          });
        }
      }
    });

    return results;
  }
};
