/**
 * Utility Class used by controller
 */
class Utility {
  /**
   * Static Method that checks if file contents is JSON format
   * @param {String} term
   * @return {Boolean} e
   */
  static isJson(term) {
    try {
      JSON.parse(term);
    } catch (e) {
      return false;
    }
    return true;
  }
}
