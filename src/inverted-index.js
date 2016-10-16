"use strict";
class Index {

    getIndex(data){
        let fileIndex = [];
        for(let i=0;i<data.docs.length;i++) {
            fileIndex.push(i);
        }
        return fileIndex.length;
    }
    createIndex(document){
        let contents = document.docs;
        if (typeof document !=='object') {
            console.log('Aww, Snap!!!');
            return false;
        }
        else{
            return contents;
        }
    }
    searchIndex(terms){
        let reff = new showOccurrences();
        terms.trim();
        if (typeof terms !== 'string' || terms === '' || (terms.trim()) === '') {
            console.log('We didn\'t forget to check though!!!');
        }
        else {
            let words = terms.split(' ');
            for (let i = 0; i < words.length; i++) {
                if (reff[words[i]] === undefined) {
                    return (words[i] + ' : ' + 'Not Found!!!!');
                }
                else {
                    return (words[i] + ' : ' + reff[words[i]]);
                }
            }
        }
    }

}

let showOccurrences = function (file) {
    let wordOccurrence = {};
	let merge = [];
	for (let i=0; i <file.length; i++){
        let clean = tokenize(file[i].text);
		merge.push(clean.split(' '));
		let keywords = [].concat.apply([], merge);
		let mySet = new Set(keywords);
		for (let key of mySet.keys()) {
			if (clean.includes(key)){
				if (!wordOccurrence.hasOwnProperty(key)){
					wordOccurrence[key] = [];
				}
				wordOccurrence[key].push('Document '+(1+i));
			}
		}
	}
	return wordOccurrence;
    };

    function tokenize(tokens) {
        var newToken = tokens.replace(/[^a-z0-9]+/gi, ' ').toLowerCase();
        //send out the new token
        return newToken;
    }