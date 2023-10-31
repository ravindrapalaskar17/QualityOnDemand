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

export default async function (input) {
  const errors = [];
  const suggestions = [];

  // Function to check reserved words and log them
  function checkAndLogReservedWords(text, location) {
    for (const word of reservedWords) {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      if (regex.test(text)) {
        errors.push(word);
        suggestions.push(`Consider avoiding the use of reserved word '${word}' in ${location}.`);
      }
    }
  }

  // Check and log reserved words in the specified locations
  checkAndLogReservedWords(input.path, 'Path');
  checkAndLogReservedWords(input.operation, 'Operation');

  if (input.parameters) {
    for (const param of input.parameters) {
      checkAndLogReservedWords(param.name, `Parameter '${param.name}'`);
    }

    if (input.requestBody) {
      checkAndLogReservedWords(Object.keys(input.requestBody).join(', '), 'Request Body');
    }
  }

  if (input.responses) {
    for (const response of Object.values(input.responses)) {
      checkAndLogReservedWords(Object.keys(response).join(', '), 'Response Body');
    }
  }

  if (input.securitySchemes) {
    checkAndLogReservedWords(Object.keys(input.securitySchemes).join(', '), 'Security Schemes');
  }

  if (input.components) {
    checkAndLogReservedWords(Object.keys(input.components).join(', '), 'Components');
  }

  if (input.operationIds) {
    checkAndLogReservedWords(input.operationIds.join(', '), 'Operation IDs');
  }

  // Check if any reserved words are found and log them
  if (errors.length > 0) {
    console.log('Reserved words found:');
    for (const suggestion of suggestions) {
      console.log(suggestion);
    }
  }
}
