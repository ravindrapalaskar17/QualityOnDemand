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

const exceptions = [
  // Add your exceptions here
];

const separatorsRegex = /\s/;
const mistakes = [];

function includesNumber(value) {
  return /\d/.test(value);
}

export default async function (input) {
  const no_special_characters = input.replace(/[^\w\s]/gi, '');
  const words = no_special_characters.split(separatorsRegex);

  const errors = words
    .filter((word) => !exceptions.includes(word))
    .filter((word) => reservedWords.includes(word))
    .filter((word) => !includesNumber(word));

  if (errors.length > 0 && mistakes[mistakes.length - 1] !== errors[errors.length - 1]) {
    mistakes.push(errors);
    errors = [];
    console.log("\nReserved words found: " + mistakes);
  }
}
