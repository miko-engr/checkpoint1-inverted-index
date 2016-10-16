"use strict";
var mockFiles = [
    [{
            "title": "Alice of in Wonderland",
            "text": "Alice falls into a rabbit shit hole and enters a world full of imagination."
        },

        {
            "title": "The Lord of the zip Rings: The Fellowship of the Ring.",
            "text": "An unusual alliance of man, elf, dwarf, oobit wizard and hobbit seek to destroy a powerful ring."
        }
    ],

    [{
            "title": "keep of of of in Wonderland king",
            "text": "Alice falls into a rabbit sleep it all today hole and enters a world full of imagination."
        },

        {
            "title": "The sheep: The Fellowship sleep of the Ring.",
            "text": "elf, dwarf, wizard and hobbit seek to destroy a king powerful ring."
        }
    ]
];


//write test to read book data
describe("Read book data", function () {
    it("should verify that the files are not empty", function () {
        expect(mockFiles.length > 0).toBeTruthy();
    });

    it("should check if all properties in the file are strings", function () {
        mockFiles[0].forEach(function (document) {
            expect(typeof document.title === "string").toBeTruthy();
            expect(typeof document.text === "string").toBeTruthy();
        });
    });

    it("should verify that the file content is a JSON array", function () {
        expect(Array.isArray(mockFiles)).toBeTruthy();
    });
});