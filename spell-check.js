const { execSync } = require('child_process');
const fs = require('fs');

function findSpellingMistakesInYamlFile(filePath) {
  // Read the content of the YAML file
  const yamlContent = fs.readFileSync(filePath, 'utf8');

  // Write the content to a temporary file
  fs.writeFileSync('temp.yaml', yamlContent);

  // Run the markdown-spellcheck CLI on the temporary file
  try {
    const output = execSync('markdown-spellcheck temp.yaml', { encoding: 'utf-8' });
    // If there are spelling mistakes, the CLI will produce output
    // You can parse the output to extract the mistakes
    return output.split('\n');
  } catch (error) {
    // An error means no spelling mistakes were found
    return [];
  } finally {
    // Clean up the temporary file
    fs.unlinkSync('temp.yaml');
  }
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
