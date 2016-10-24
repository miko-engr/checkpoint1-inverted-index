"use strict";
class Index {

    getIndex(data){
        let fileIndex = [];
        for(let i=0;i<data.docs.length;i++) {
            fileIndex.push(i);
        }
        return fileIndex;
    }
    createIndex(file){
            let wordOccurrence = {};
            let merge = [];
            let keywords =[];
            let mySet;
            for (let i=0; i <file.length; i++){
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
    searchIndex(terms,reff){
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

    function tokenize(tokens) {
        var newToken = tokens.replace(/[^a-z0-9]+/gi, ' ').trim().toLowerCase();
        //send out the new token
        return newToken;
    }