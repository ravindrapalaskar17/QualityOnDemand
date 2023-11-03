export default async function (input) {
  if (input.openapi && input.openapi === '3.0.3') {
    return null; // No issues, version is correct
  } else {
    return "Message: Please use OpenAPI version 3.0.3";
  }
}
