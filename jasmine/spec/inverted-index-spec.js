'use strict';
const book = require('../books');
const empty = require('../emptyBook');
const indexInstance = new Index();

//write test to read book data
describe("Read book data", () => {
  
  it("should verify that the files are not empty", () => {
    expect(book.length > 0).toBeTruthy();
  });

  it("should check if all properties in the file are strings", () => {
    
    book.forEach(function (document) {
      expect(typeof document.title === "string").toBeTruthy();
      expect(typeof document.text === "string").toBeTruthy();
    });

  });

  it("should verify that the file content is a JSON array", () => {
    expect(Array.isArray(book)).toBeTruthy();
  });

});

describe("Check Class properties", () => {

  it("should have get index property", () => {
    expect(typeof indexInstance.getIndex === 'function').toBeTruthy();
  });

  it("should have create index property", () => {
    expect(typeof indexInstance.createIndex === 'function').toBeTruthy();
  });

  it("should have search property", () => {
    expect(typeof indexInstance.searchIndex === 'function').toBeTruthy();
  });

});

describe("Populate Index", () => {

  it('should return false when empty book is passed', () => {
    const emptyFile = {
      name: 'emptyBook.json',
      docs: empty
    };

    expect(indexInstance.createIndex(empty)).toBeFalsy();
  });

  it("should create an index of documents as an object", () => {
    const details = {
      name: 'book.json',
      docs: book
    };

    expect(typeof indexInstance.getIndex(details)).toBe('object');
  });

  it("should create index and return a valid result", () => {
    const result = {
      a: [0, 1],
      alice: [0],
      alliance: [1],
      an: [1],
      and: [0, 1],
      destroy: [1],
      dwarf: [1],
      elf: [1],
      enters: [0],
      falls: [0],
      full: [0],
      hobbit: [1],
      hole: [0],
      imagination: [0],
      into: [0],
      man: [1],
      of: [0, 1],
      oobit: [1],
      powerful: [1],
      rabbit: [0],
      ring: [1],
      seek: [1],
      shit: [0],
      to: [1],
      unusual: [1],
      wizard: [1],
      world: [0]
    };

    expect(indexInstance.createIndex(book)).toEqual(result);
  });

});

describe('Search Index', () => {

  it('should search and return an object that contains result', () => {
    const term = 'We are very unusual in alliance';

    expect(typeof indexInstance.searchIndex(term, indexInstance
     .createIndex(book))).toBe('object');
  });

  it('should return accurate search result', () => {
    const term = 'We are very unusual in alliance';
    const searchResult = {
      we:'Not Found',
      are: 'Not Found',
      very: 'Not Found',
      unusual: [1],
      in: 'Not Found',
      alliance: [1]
    };

    expect(indexInstance.searchIndex(term, indexInstance
     .createIndex(book))).toEqual(searchResult);
  });

  it('should return false when term is not string', () => {
    const invalidTerm = 12;

    expect(indexInstance.searchIndex(invalidTerm, indexInstance
     .createIndex(book))).toBeFalsy();
  });

});