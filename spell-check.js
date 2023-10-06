const spellChecker = require('spellchecker');
const exceptions = ["bic", "datetime"];

const codeStyleRegex = /[_]/; // snake_case

module.exports = (input) => {
  const words = input.split(codeStyleRegex);
  const mistakes = words
    .filter((word) => !exceptions.includes(word))
    .filter((word) => spellChecker.isMisspelled(word));

  if (mistakes.length > 0) {
    return [{
      message: `Spelling mistakes found: ${mistakes.join(', ')}`,
    }];
  }
  return [];
}
