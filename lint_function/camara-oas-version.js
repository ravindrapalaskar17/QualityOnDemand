export default async function (input) {
  if (input.openapi === '3.0.3') {
    console.log("OpenAPI version is 3.0.3");
  } else {
    console.log("Message: Please use OpenAPI version 3.0.3");
  }
}
