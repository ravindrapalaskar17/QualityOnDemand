const fs = require('fs');
const dictionary = require('dictionary-en');
const nspell = require('nspell');

// List of exceptions (words that should not be considered as spelling mistakes)
const exceptions = [
  'API','MACE'
];

// Regular expression to split text into words (space, newline, etc.)
const separatorsRegex = /\s+/;

// Function to check if a word includes a number
function includesNumber(word) {
  return /\d/.test(word);
}

// Function to find spelling mistakes in a file
function findSpellingMistakesInFile(filePath) {
  try {
    // Read the content of the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Initialize the dictionary
    dictionary((err, dict) => {
      if (err) {
        throw err;
      }

      // Initialize the spell checker
      const spell = nspell(dict);

      // Split the content into words
      const words = fileContent.split(separatorsRegex);

      // Filter out exceptions and spelling mistakes
      const mistakes = words
        .filter((word) => !exceptions.includes(word.toLowerCase()))
        .filter((word) => !spell.correct(word))
        .filter((word) => word !== '')
        .filter((word) => !includesNumber(word));

      if (mistakes.length > 0) {
        console.log('Spelling mistakes found:');
        console.log(mistakes);
      } else {
        console.log('No spelling mistakes found.');
      }
    });
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Example usage:
const filePath = 'code/API_definitions/qod-api2.yaml';
findSpellingMistakesInFile(filePath);
