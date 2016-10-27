"use strict";
var mockFiles = [{
            "title": "Alice of in Wonderland",
            "text": "Alice falls into a rabbit shit hole and enters a world full of imagination."
        },

        {
            "title": "The Lord of the zip Rings: The Fellowship of the Ring.",
            "text": "An unusual alliance of man, elf, dwarf, oobit wizard and hobbit seek to destroy a powerful ring."
        }
];

//write test to read book data
describe("Read book data", function () {
    it("should verify that the files are not empty", function () {
        expect(mockFiles.length > 0).toBeTruthy();
    });

    it("should check if all properties in the file are strings", function () {
        mockFiles.forEach(function (document) {
            expect(typeof document.title === "string").toBeTruthy();
            expect(typeof document.text === "string").toBeTruthy();
        });
    });

    it("should verify that the file content is a JSON array", function () {
        expect(Array.isArray(mockFiles)).toBeTruthy();
    });
});

describe("Check Class properties", function () {
beforeEach(function() {
    this.indexInstance = new Index();
  });

    it("should have get index property", function () {
        let get = this.indexInstance;
        expect(typeof get.getIndex ==='function').toBeTruthy();
    });

    it("should have create index property", function () {
        let create = this.indexInstance;
        expect(typeof create.createIndex ==='function').toBeTruthy();
    });
    it("should have search property", function () {
        let search = this.indexInstance;
        expect(typeof search.searchIndex ==='function').toBeTruthy();
    });
});

describe("Populate Index", function () {
    beforeEach(function() {
    this.indexInstance = new Index();
  });

    it("should create an index of documents as an object", function () {
        let data = {
            name:'book.json',
            docs:mockFiles
        };
        let indexArray = this.indexInstance;
        expect(typeof indexArray.getIndex(data)).toBe('object');
    });

    it("should create index and return a valid result", function(){
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
        expect(creates.createIndex(mockFiles)).toEqual(result);
    });

});