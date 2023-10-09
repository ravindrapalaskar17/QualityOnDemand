const fs = require('fs');
const { check } = require('cspell');

function findSpellingMistakesInYamlFile(filePath) {
  // Read the content of the YAML file
  const yamlContent = fs.readFileSync(filePath, 'utf8');
  console.log("YAML " + yamlContent);

  // Check for spelling mistakes in the content
  const spellingMistakes = check(yamlContent);
  console.log("Spelling Mistakes " + JSON.stringify(spellingMistakes));

  // Filter out the words with spelling mistakes
  const mistakes = spellingMistakes.map((mistake) => mistake.text);
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

