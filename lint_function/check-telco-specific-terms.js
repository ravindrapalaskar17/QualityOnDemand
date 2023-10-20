var replacements = [
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

  // Check the description text for specified terms
  for (const path in input) {
    const descriptions = JSON.stringify(input[path]).match(/description":\s*"(.*?)"/g) || [];

    descriptions.forEach((description) => {
      for (const replacement of replacements) {
        const original = replacement.original;
        const recommended = replacement.recommended;

        if (description.includes(original)) {
          errors.push(replacement);
        }
      }
    });
  }

  if (errors.length > 0) {
    errors.forEach((error) => {
      suggestions.push(`Consider replacing '${error.original}' with '${error.recommended}'.`);
    });

    return [
      {
        message: 'Telco-specific terminology found in descriptions: ' + suggestions.join(', '),
      },
    ];
  }

  return [];
}
