/**
 * Function that regularizes input
 * @param {String} tokens
 * @return {Array} newToken
 */
const tokenize = (tokens) => {
  const newToken = tokens.replace(/[^a-z0-9]+/gi, ' ')
    .trim().toLowerCase();
  // send out the new token
  return newToken;
};

/**
 * Inverted Index Class declaration
 */
class Index {
  /**
   * Get Index method that indexes JSON file
   * @param {Object} data
   * @return {Array} fileIndex
   */
  getIndex(data) {
    const fileIndex = {};
    for (let count = 0; count < data.docs.length; count += 1) {
      fileIndex[data.name] = [count];
    }

    return fileIndex;
  }

  /**
   * Create Index method that indexes text content of uploaded file
   * @param {Array} file
   * @return {Object} wordOccurrence
   */
  createIndex(file) {
    const wordOccurrence = {};
    const merge = [];
    let keywords = [];
    let uniqueWords;
    if (file.length === 0) {
      return false;
    }
    for (let count = 0; count < file.length; count += 1) {
      const clean = tokenize(file[count].text);
      merge.push(clean.split(' '));
      keywords = [].concat(...merge);
      uniqueWords = new Set(keywords);
      uniqueWords.forEach((key) => {
        if (clean.includes(key)) {
          if (!{}.hasOwnProperty.call(wordOccurrence, key)) {
            wordOccurrence[key] = [];
          }

          wordOccurrence[key].push(count);
        }
      });
    }

    return wordOccurrence;
  }

  /**
   * Search Index Method that searches uploaded file with
   * the aid of the created index
   * @param {String} terms
   * @param {Array} occurrence
   * @return {Object} result
   */
  searchIndex(terms, occurrence) {
    const result = {};
    if (typeof terms !== 'string' || terms === '' || (terms.trim()) === '') {
      return false;
    }
    const token = tokenize(terms);
    const words = token.split(' ');
    for (let count = 0; count < words.length; count += 1) {
      if (occurrence[words[count]] === undefined) {
        result[words[count]] = 'Not Found';
      } else {
        const key = words[count];
        const value = occurrence[words[count]];
        result[key] = value;
      }
    }

    return result;
  }
}
