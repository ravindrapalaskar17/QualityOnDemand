export default async function (input) {
  if (input.openapi && input.openapi === '3.0.3') {
    console.log(`Thhis is valid openAPI version '${input}'.`);
  } else {
     console.log(`There is OpenAPI version not allowed '${input}'.`);
  }
}
