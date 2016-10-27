'use strict';
class Index {
/**
 * Get Index method that indexes JSON file
 * @param data (key,value pair)
 * @return fileIndex
 */
    getIndex(data) {
        let fileIndex = {};
        for(let i=0;i<data.docs.length;i++) {
            fileIndex[data.name] = [i];
        }
        return fileIndex;
    }
    /**
     * Create Index method that indexes text content of uploaded file
     * @param file
     * @return wordOccurrence
     */
    createIndex(file) {
            let wordOccurrence = {};
            let merge = [];
            let keywords =[];
            let mySet;
            for (let i=0; i < file.length; i++){
                let clean = tokenize(file[i].text);
                merge.push(clean.split(' '));
                keywords = [].concat.apply([], merge);
                mySet = new Set(keywords);
                for (let key of mySet.keys()) {
                    if (clean.includes(key)){
                        if (!wordOccurrence.hasOwnProperty(key)){
                            wordOccurrence[key] = [];
                        }
                        wordOccurrence[key].push(i);
                    }
                }
            }
            return wordOccurrence;
    }
    /**
     * Search Index Method that searches uploaded file with the aid of the created index
     * @param terms(words to be searched), reff
     * @return result
     */
    searchIndex(terms,reff) {
        let result = {};
        if (typeof terms !== 'string' || terms === '' || (terms.trim()) === '') {
            console.log('We didn\'t forget to check though!!!');
        }
        else {
            let words = terms.split(' ');
            for (let i = 0; i < words.length; i++) {
                if (reff[words[i]] === undefined) {
                    console.log(words[i] + ' : ' + 'Not Found!!!!');
                }
                else {
                    let key = words[i];
                    let value = reff[words[i]];
                    result[key] = value;
                }
            }
        }
        return result;
    }

}
/**
 * Function that regularizes input
 * @param tokens
 * @return newToken
 */
    function tokenize(tokens) {
        var newToken = tokens.replace(/[^a-z0-9]+/gi, ' ').trim().toLowerCase();
        //send out the new token
        return newToken;
    }