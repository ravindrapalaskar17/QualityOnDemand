import * as spellchecker from 'spellchecker'; // Import the spellchecker package

const exceptions = ['eventId', 'eventType', 'eventTime', 'eventSubscriptionId', /* ...other exceptions... */];
const separatorsRegex = /\s/;
const mistakes = [];

function includesNumber(value) {
    return /\d/.test(value);
}

export default function (input) {
    // Load and use the dictionary
    spellchecker.load('en-US');

    var no_special_characters = input.replace(/[^\w\s]/gi, '');
    const words = no_special_characters.split(separatorsRegex);

    var errors = words
        .filter((word) => !exceptions.includes(word))
        .filter((word) => !spellchecker.isMisspelled(word)) // Use the spellchecker package for spelling check
        .filter((word) => word !== '') // Correct the condition here
        .filter((word) => !includesNumber(word));

    if (errors.length > 0 && mistakes[mistakes.length - 1] !== errors[errors.length - 1]) {
        mistakes.push(errors);
        errors = [];
        console.log('\nWarn: There was a spelling mistake: ' + mistakes);
    }
}
