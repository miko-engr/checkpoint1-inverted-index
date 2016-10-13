function Index(){
    this.file = file;
    this.readFile = function(filePath){
       fs.readFile(filePath ,function read(data,err) {
           if(err){
               alert(err);
           }
           else{
               file = data;
               createIndex(file);
           }
       }); 
    };

    this.createIndex = function(file){
        var details = [];
        if(typeof file !=='object') {
            alert('Your file isn\'t JSON');
        }
        else{
            for(var i=0;i<Object.keys(file); i++) {
                details.push('Document '+(i+1));
            }
        }
        return details;
    };
    this.getIndex = function(details){
        var fileIndex = [];
        for(var i=0; i <details.length; i++){
            fileIndex.push(i);
        }
        return fileIndex;
    };
    this.searchIndex = function(){
        var reff = new showOccurences();
        terms.trim();
	if(typeof terms !== 'string' || terms ==='' || (terms.trim())==='') {
		return('We didn\'t forget to check though!!!')
	}
	else{
		var words = terms.split(' ');
		for(var i=0; i<words.length; i++){
			if(reff[words[i]]===undefined){
				return (words[i] +' : ' +'Not Found!!!!');
			}
			else{
				return (words[i] +' : ' +reff[words[i]]);
			}
		}
	}
    };
    var showOccurences = function(){
        var merge = [];
        var wordOccurrence ={};

        for(var i=0; i<Object.keys(file);i++){
            merge.push(file[i].text.split(' '));
            var keywords = [].concat.apply([], merge);
            var mySet = new Set(keywords);
            for (let key of mySet.keys()){
				if (!wordOccurrence.hasOwnProperty(key)){
					wordOccurrence[key] = [];
				}
				wordOccurrence[key].push('Document '+(1+i));
		}
        }
        return wordOccurrence;
    };
}