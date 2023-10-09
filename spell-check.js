const fs = require('fs');
const spellCheck = require('spell-check');

function findSpellingMistakesInYamlFile(filePath) {
  // Read the content of the YAML file
  const yamlContent = fs.readFileSync(filePath, 'utf8');
  console.log("YAML " + yamlContent);

  // Split the content into words (split by spaces, newlines, etc.)
  const words = yamlContent.split(/\s+/);
  console.log("Words " + words);

  // Find spelling mistakes
  const mistakes = words.filter((word) => !spellCheck.isCorrect(word));
  console.log("Mistakes " + mistakes);

  return mistakes;
}

// Example usage:
const filePath = 'code/API_definitions/qod-api2.yaml';
const spellingMistakes = findSpellingMistakesInYamlFile(filePath);

if (spellingMistakes.length > 0) {
  console.log('Spelling mistakes found:');
  console.log("Spelling Mistakes " + spellingMistakes);
} else {
  console.log('No spelling mistakes found.');
}
