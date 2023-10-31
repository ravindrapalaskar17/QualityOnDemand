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

  // Function to check reserved words in an array of strings
  function checkReservedWordsInArray(arr) {
    for (const value of arr) {
      if (typeof value === 'string') {
        for (const word of reservedWords) {
          const regex = new RegExp(`\\b${word}\\b`, 'g');
          if (regex.test(value)) {
            errors.push(word);
            suggestions.push(`Consider avoiding the use of reserved word '${word}'.`);
          }
        }
      }
    }
  }

  // Check reserved words in the following locations:
  checkReservedWordsInArray([input.path, input.operation]);

  if (input.parameters) {
    for (const param of input.parameters) {
      checkReservedWordsInArray([param.name]);
    }

    if (input.requestBody) {
      checkReservedWordsInArray(Object.keys(input.requestBody));
    }
  }

  if (input.responses) {
    for (const response of Object.values(input.responses)) {
      checkReservedWordsInArray(Object.keys(response));
    }
  }

  if (input.securitySchemes) {
    checkReservedWordsInArray(Object.keys(input.securitySchemes));
  }

  if (input.components) {
    checkReservedWordsInArray(Object.keys(input.components));
  }

  if (input.operationIds) {
    checkReservedWordsInArray(input.operationIds);
  }

  if (errors.length > 0) {
    console.log('Hint: Reserved words found in input: ' + suggestions.join(', '));
  }
}
