export default async function (input) {
  const value = "3.0.3";
  const inputAsString = input.toString(); // Convert input to a string
 
  if (inputAsString !== value) {
    console.log(` '${inputAsString}' :This OpenAPI version not allowed, Pleae use '${value}'.`);
  }
}
