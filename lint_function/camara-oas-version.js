export default async function (input) {
  const value = "3.0.3";
  const inputAsString = input.toString(); // Convert input to a string
 
  if (inputAsString !== value) {
    console.error(`Error:'${inputAsString}' :This OpenAPI version not allowed, Pleae use '${value}'.`);
  }
}
