import dictionary from 'dictionary-en';
import nspell from 'nspell';

async function checkSpelling(input) {
  try {
    const dict = await dictionary();
    const spell = nspell(dict);
    const noSpecialCharacters = input.replace(/[^\w\s]/gi, '');
    const words = noSpecialCharacters.split(/\s/);
    const errors = words
      .filter((word) => !exceptions.includes(word))
      .filter((word) => !spell.correct(word))
      .filter((word) => word !== '')
      .filter((word) => !includesNumber(word));

    if (errors.length > 0 && mistakes[mistakes.length - 1] !== errors[errors.length - 1]) {
      mistakes.push(errors);
      errors = [];
      console.log('\nWarn: There was a spelling mistake: ' + mistakes);
    }
  } catch (err) {
    throw err;
  }
}

export default checkSpelling;
