const replacements = [
  { original: 'UE', recommended: 'device' },
  { original: 'MSISDN', recommended: 'phone number' },
  { original: 'mobile network', recommended: 'network' }
];

function includesNumber(value) {
  return /\d/.test(value);
}

export default async function (input) {
  const errors = [];
  const suggestions = [];

  // Iterate over properties of the input object
  for (const path in input) {
    const value = input[path];

    // Check if the value is a string
    if (typeof value === 'string') {
      for (const replacement of replacements) {
        const original = replacement.original;
        const recommended = replacement.recommended;

        // Use a regular expression to match 'UE' as a standalone word
        const regex = new RegExp(`\\b${original}\\b`, 'g');

        // Check if the original word exists in the value
        if (regex.test(value)) {
          errors.push(replacement);
          suggestions.push(`Consider replacing '${original}' with '${recommended}'.`);
        }
      }
    }
  }

  // Check if 'mobile network' is in the suggestions
  const foundMobileNetwork = suggestions.some((suggestion) => suggestion.includes('mobile network'));

  if (foundMobileNetwork) {
    console.log('Hint: Telco-specific terminology found in input: ' + suggestions.join(', '));
  }
};
