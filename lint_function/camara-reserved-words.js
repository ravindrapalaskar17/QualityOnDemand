const reservedWords = [
  'abstract',
  'apiclient',
  'apiexception',
  'apiresponse',
  'assert',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'configuration',
  'const',
  'continue',
  'default',
  'do',
  'double',
  'else',
  'enum',
  'extends',
  'file',
  'final',
  'finally',
  'float',
  'for',
  'goto',
  'if',
  'implements',
  'import',
  'instanceof',
  'int',
  'interface',
  'list',
  'localdate',
  'localreturntype',
  'localtime',
  'localvaraccept',
  'localvaraccepts',
  'localvarauthnames',
  'localvarcollectionqueryparams',
  'localvarcontenttype',
  'localvarcontenttypes',
  'localvarcookieparams',
  'localvarformparams',
  'localvarheaderparams',
  'localvarpath',
  'localvarpostbody',
  'localvarqueryparams',
  'long',
  'native',
  'new',
  'null',
  'object',
  'offsetdatetime',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'strictfp',
  'stringutil',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'try',
  'void',
  'volatile',
  'while'
];

export default async function (doc) {
  const results = [];

  // Function to check for reserved words
  function checkForReservedWords(value, path) {
    for (const word of reservedWords) {
      // Use a regular expression to match 'word' as a standalone word
      const regex = new RegExp(`\\b${word}\\b`, 'g');

      // Check if 'word' exists in the value
      if (regex.test(value)) {
        results.push({
          message: `Reserved word '${word}' found in ${path}`,
          path,
          severity: 'warn',
        });
      }
    }
  }

  // Iterate over paths, schemas, and responses
  for (const path in doc.paths) {
    const operations = doc.paths[path];
    for (const operationName in operations) {
      const operation = operations[operationName];
      
      // Check the operation summary and description for reserved words
      checkForReservedWords(operation.summary, `${path}.${operationName}.summary`);
      checkForReservedWords(operation.description, `${path}.${operationName}.description`);

      // Check request and response schemas
      const requestSchema = operation.requestBody?.content?.['application/json']?.schema;
      if (requestSchema) {
        checkForReservedWords(requestSchema.$ref, `${path}.${operationName}.requestBody.schema.$ref`);
      }

      for (const responseName in operation.responses) {
        const response = operation.responses[responseName];
        const responseSchema = response.content?.['application/json']?.schema;
        if (responseSchema) {
          checkForReservedWords(responseSchema.$ref, `${path}.${operationName}.responses.${responseName}.schema.$ref`);
        }
      }
    }
  }

  // Iterate over schemas
  for (const schemaName in doc.components?.schemas) {
    const schema = doc.components.schemas[schemaName];
    for (const propertyName in schema.properties) {
      const property = schema.properties[propertyName];
      if (property.description) {
        checkForReservedWords(property.description, `components.schemas.${schemaName}.properties.${propertyName}.description`);
      }
    }
  }

  return results;
  console.log("This is reserved word" + results);
}
