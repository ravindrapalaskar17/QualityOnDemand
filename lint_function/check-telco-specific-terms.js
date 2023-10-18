// Write java script function 
// spectral-functions.js
const { createSuggestion } = require("@stoplight/spectral-functions");

module.exports = {
  suggestInclusiveTerms: (target, inclusiveTerms, replacements) => {
    const messages = [];

    replacements.forEach((replacement) => {
      const original = replacement.original;
      const recommended = replacement.recommended;

      const regex = new RegExp(replaceAll(original, /[.*+?^${}()|[\]\\]/g, "\\$&"), "g");

      target.replace(regex, (match, offset) => {
        messages.push(
          createSuggestion(`Consider replacing '${original}' with '${recommended}'.`, {
            range: {
              start: offset,
              end: offset + original.length,
            },
          })
        );
      });
    });

    return messages;
  },
};

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}
