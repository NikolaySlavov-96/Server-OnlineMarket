const badWords = require('./badWordsList');

function badWordCheck(text){
    let result = false;
    text = text.split(' ').filter(x => x != '');
    for (let word of text) {
        word = word.toLowerCase()
        if( badWords[word[0]] && badWords[word[0]].includes(word) ){
            result = true;
            break;
        };
    };
    return result;
};

module.exports = {
    badWordCheck
}