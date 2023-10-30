const reservedWords = [
  'class',
  'const',
  'let',
  'function',
  'var',
  'if',
  'else',
  'while',
  'for',
  'switch',
  'case',
  'break',
  'return',
  'true',
  'false',
  'null',
  'undefined',
  'import',
];

export default async function (input) {
  const errors = [];
  const suggestions = [];

  // Iterate over properties of the input object
  for (const path in input) {
    const value = input[path];

    // Check if the value is a string
    if (typeof value === 'string') {
      for (const word of reservedWords) {
        // Use a regular expression to match 'word' as a standalone word
        const regex = new RegExp(`\\b${word}\\b`, 'g');

        // Check if 'word' exists in the value
        if (regex.test(value)) {
          errors.push(word);
          suggestions.push(`Consider avoiding the use of reserved word '${word}'.`);
        }
      }
    }
  }

  // Check if any reserved words are in the suggestions
  if (errors.length > 0) {
    console.log('Hint: Reserved words found in input: ' + suggestions.join(', '));
  }
}
