'use strict';
const book = require('../books');

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
    
    beforeEach(() => {
        this.indexInstance = new Index();
    });

    it("should have get index property", () => {
        expect(typeof this.indexInstance.getIndex ==='function').toBeTruthy();
    });

    it("should have create index property", () => {
        expect(typeof this.indexInstance.createIndex ==='function').toBeTruthy();
    });
    it("should have search property", () => {
        expect(typeof this.indexInstance.searchIndex ==='function').toBeTruthy();
    });
});

describe("Populate Index", () => {
    beforeEach(() => {
    this.indexInstance = new Index();
  });

    it("should create an index of documents as an object", () => {
        let details = {
            name:'book.json',
            docs:book
        };
        let indexArray = this.indexInstance;
        expect(typeof indexArray.getIndex(details)).toBe('object');
    });

    it("should create index and return a valid result", () =>{
        let creates = this.indexInstance;
        let result = {
            a:[0,1],
            alice:[0],
            alliance:[1],
            an:[1],
            and:[0,1],
            destroy:[1],
            dwarf:[1],
            elf:[1],
            enters:[0],
            falls:[0],
            full:[0],
            hobbit:[1],
            hole:[0],
            imagination:[0],
            into:[0],
            man:[1],
            of:[0,1],
            oobit:[1],
            powerful:[1],
            rabbit:[0],
            ring:[1],
            seek:[1],
            shit:[0],
            to:[1],
            unusual:[1],
            wizard:[1],
            world:[0]
        };
        expect(creates.createIndex(book)).toEqual(result);
    });

});

describe('Search Index', () => {
    
    beforeEach(() => {
        this.indexInstance = new Index();
    });

    it('should search and return an object that contains result', () => {
        const term = 'We are very unusual in alliance';
        expect(typeof this.indexInstance.searchIndex(term,this.indexInstance.createIndex(book))).toBe('object');
    });

    it('should return accurate search result', () => {
        const term = 'We are very unusual in alliance';
        const searchResult = {
            unusual:[1],
            alliance:[1]
        };
        expect(this.indexInstance.searchIndex(term,this.indexInstance.createIndex(book))).toEqual(searchResult);
    });

});