const fs = require('fs');
const markdownSpellcheck = require('markdown-spellcheck');

function findSpellingMistakesInMarkdownFile(filePath) {
  // Read the content of the Markdown file
  const markdownContent = fs.readFileSync(filePath, 'utf8');

  // Perform spell check on the content
  const mistakes = markdownSpellcheck.spellcheck(markdownContent);

  return mistakes;
}

// Example usage:
const filePath = 'code/API_definitions/qod-api2.yaml';
const spellingMistakes = findSpellingMistakesInMarkdownFile(filePath);

if (spellingMistakes.length > 0) {
  console.log('Spelling mistakes found:');
  console.log(spellingMistakes);
} else {
  console.log('No spelling mistakes found.');
}
