export default async function (input) {
  if (input.openapi) {
    if (input.openapi === '3.0.3') {
      console.log("OpenAPI version is 3.0.3");
    } else {
      console.log("Message: Please use OpenAPI version 3.0.3");
    }
  } else {
    console.log("Message: OpenAPI version is missing. Please specify OpenAPI version 3.0.3.");
  }
}
