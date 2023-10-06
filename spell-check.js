const fs = require('fs');
const spellChecker = require('spellchecker');

function findSpellingMistakesInYamlFile(filePath) {
  // Read the content of the YAML file
  const yamlContent = fs.readFileSync(filePath, 'utf8');

  // Split the content into words (split by spaces, newlines, etc.)
  const words = yamlContent.split(/\s+/);

  // Filter out any words that should be excluded from spell checking
  const exceptions = ["bic", "datetime", "gt", "gte", "icontains", "iban", "idempotency", "isnull", "lt", "lte", "md5", "mimetype", "oid", "userpic"];
  const filteredWords = words.filter((word) => !exceptions.includes(word.toLowerCase()));

  // Find spelling mistakes
  const mistakes = filteredWords.filter((word) => spellChecker.isMisspelled(word));

  return mistakes;
}

// Example usage:
const filePath = 'code/API_definitions/qod-api2.yaml';
const spellingMistakes = findSpellingMistakesInYamlFile(filePath);

if (spellingMistakes.length > 0) {
  console.log('Spelling mistakes found:');
  console.log(spellingMistakes);
} else {
  console.log('No spelling mistakes found.');
}
