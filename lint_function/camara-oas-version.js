export default async function (input) {
  const value ="3.0.3";
  if (!input===value) {
    console.log(`Thhis is valid openAPI version '${input}'.`);
  } else {
     console.log(`There is OpenAPI version not allowed '${input}'.`);
  }
}
