const replacements = [
  { original: 'UE', recommended: 'device' },
  { original: 'MSISDN', recommended: 'phone number' },
  { original: 'mobile network', recommended: 'network' }
];

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

        // Use a regular expression to match 'original' as a standalone word
        const regex = new RegExp(`\\b${original}\\b`, 'g');

        // Check if 'original' exists in the value
        if (regex.test(value)) {
          errors.push({
            path,
            original,
            recommended
          });
          suggestions.push(`Consider replacing '${original}' with '${recommended}'.`);
        }
      }
    }
  }

  // Check if any word from 'replacements' is in the suggestions
  if (errors.length > 0) {
    return errors.map((error) => ({
      message: `Telco-specific terminology found at ${error.path}: Consider replacing '${error.original}' with '${error.recommended}'.`,
      path: error.path
    }));
  }

  return null; // No errors found
};
