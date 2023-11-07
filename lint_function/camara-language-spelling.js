// Import the 'dictionary-en' module if not already imported
const dictionary = require('dictionary-en');
const nspell = require('nspell');

// Function to check for spelling errors
export default async function (input) {
  // Load the dictionary
  const dict = dictionary('en_US');
  const spell = nspell(dict);

  // Split the input text into words
  const words = input.split(/\s+/);

  // Array to store spelling mistakes
  const mistakes = [];

  for (const word of words) {
    // Check if the word is empty or contains only digits
    if (/^\d*$/.test(word) || word.trim() === '') {
      continue;
    }

    // Check if the word is not in the dictionary
    if (!spell.correct(word)) {
      mistakes.push(word);
    }
  }

  // If mistakes are found, print a warning
  if (mistakes.length > 0) {
    console.log('Spelling mistakes found: ' + mistakes.join(', '));
  }
}
