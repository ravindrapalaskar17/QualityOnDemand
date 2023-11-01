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

  // Iterate over properties of the input object
  for (const path in input) {
   // const value = input[path];

    // Check if the value is a string
    if (typeof path === 'string') {
      for (const word of reservedWords) {
        console.log(path);
        // Use a regular expression to match 'word' as a standalone word
         const formatWord = word.replace(/[{}]/g, '');
         const regex = new RegExp(`\\b${formatWord}\\b`, 'g');
    

        // Check if 'word' exists in the value
        if (regex.test(path)) {
          errors.push(formatWord);
          suggestions.push(`Consider avoiding the use of reserved word '${formatWord}'in this path '${path}'.`);
        }
      }
    }
  }

  // Check if any reserved words are in the suggestions
  if (errors.length > 0) {
    console.log('Hint: Reserved words found in input: ' + suggestions.join(', '));
  }
}
