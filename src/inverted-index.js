class Index {
    constructor(){
        this.files = {};
    }
    readFile(fileDetails,callback){
        let fileName = fileDetails.name;
        let _this = this;
        let fs = new FileReader();
        fs.readAsText(fileDetails,'UTF-8');
        fs.onload = function(files){
            let result = JSON.parse(files.target.result);
            _this.files ={
                name: fileName,
                docs:result
            };
            callback();
        };
    }

    getIndex(data){
        let fileIndex = [];
        for(let i=0;i<data.docs.length;i++) {
            fileIndex.push(i);
        }
        return fileIndex.length;
    }
    createIndex(document){
        let details = [];
        if (typeof document !=='object') {
            return false;
        }
        else{
            for(let i=0;i<Object.keys(document);i++){
                details.push('Document '+(i+1));
            }
            return details;
        }
    }
    searchIndex(terms){
        let reff = new showOccurences();
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

var showOccurences = function () {
    var merge = [];
    var wordOccurrence = {};

    for (var i = 0; i < Object.keys(file); i++) {
        merge.push(file[i].text.split(' '));
        var keywords = [].concat.apply([], merge);
        var mySet = new Set(keywords);
        for (let key of mySet.keys()) {
            if (!wordOccurrence.hasOwnProperty(key)) {
                wordOccurrence[key] = [];
                }
                wordOccurrence[key].push('Document ' + (1 + i));
            }
        }
        return wordOccurrence;
    };