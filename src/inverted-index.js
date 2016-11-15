'use strict';
/**
 * Function that regularizes input
 * @param tokens
 * @return newToken
 */
const tokenize = (tokens) => {
  const newToken = tokens.replace(/[^a-z0-9]+/gi, ' ')
    .trim().toLowerCase();
  //send out the new token
  return newToken;
};

class Index {
  /**
   * Get Index method that indexes JSON file
   * @param data (key,value pair)
   * @return fileIndex
   */
  getIndex(data) {
    let fileIndex = {};
    for (let count = 0; count < data.docs.length; count++) {
      fileIndex[data.name] = [count];
    }

    return fileIndex;
  }

  /**
   * Create Index method that indexes text content of uploaded file
   * @param file
   * @return wordOccurrence
   */
  createIndex(file) {
    const wordOccurrence = {};
    const merge = [];
    let keywords = [];
    let uniqueWords;
    if (file.length === 0) {
      return false;
    }

    else {
      for (let count = 0; count < file.length; count++) {
        let clean = tokenize(file[count].text);
        merge.push(clean.split(' '));
        keywords = [].concat.apply([], merge);
        uniqueWords = new Set(keywords);
        for (let key of uniqueWords.keys()) {
          if (clean.includes(key)) {
            if (!wordOccurrence.hasOwnProperty(key)) {

              wordOccurrence[key] = [];
            }

            wordOccurrence[key].push(count);
          }
        }
      }
    }

    return wordOccurrence;
  }

  /**
   * Search Index Method that searches uploaded file with 
   * the aid of the created index
   * @param terms(words to be searched), occurrence
   * @return result
   */
  searchIndex(terms, occurrence) {
    let result = {};
    if (typeof terms !== 'string' || terms === '' || (terms.trim()) === '') {
      return false;
    }

    else {
      const token = tokenize(terms);
      const words = token.split(' ');
      for (let count = 0; count < words.length; count++) {
        if (occurrence[words[count]] === undefined) {

          result[words[count]] = 'Not Found';
        }

        else {
          const key = words[count];
          const value = occurrence[words[count]];
          result[key] = value;
        }
      }
    }

    return result;
  }
}
