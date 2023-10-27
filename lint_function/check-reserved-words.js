export default function (apiDefinition) {
  // Define a list of reserved keywords in lowercase
  const reservedKeywords = [
    // Add your list of reserved keywords here, all in lowercase
    'import',
    'reservedkeyword2',
    // Add more keywords as needed
  ];

  // Create an array to store messages
  const messages = [];

  // Iterate through the OpenAPI specification
  for (const pathKey in apiDefinition.paths) {
    const path = apiDefinition.paths[pathKey];

    // Convert pathKey to lowercase for case-insensitive comparison
    const lowercasePathKey = pathKey.toLowerCase();

    if (reservedKeywords.includes(lowercasePathKey)) {
      messages.push(`Reserved keyword '${pathKey}' used in path name.`);
    }
  }

  // Print messages with console.log
  if (messages.length > 0) {
    console.log('Hint: Avoid using reserved keywords in your OpenAPI specification:');
    messages.forEach(message => console.log(message));
  }
}
