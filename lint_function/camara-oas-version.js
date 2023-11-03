export default async function (input) {
  const value ="3.0.3";
  if (!input===value) {
    console.log(`There is OpenAPI version not allowed '${input}'.`);
  } 
}
