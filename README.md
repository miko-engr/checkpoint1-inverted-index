[![Build Status](https://travis-ci.org/andela-aatanda/checkpoint1-inverted-index.svg?branch=development)](https://travis-ci.org/andela-aatanda/checkpoint1-inverted-index.svg?branch=development)
# Inverted-index
This Application is an implementation of Elastic Search indexing algorithm which is designed to allow for fas full-text search.
An Inverted-index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.
## Features
- Upload of JSON file in the format below
```
[
    {
        "title": "This is a sample title",
        "text": "And this is a sample text"
    }
]
```
- Indexing of uploaded file
- Searching of each indexed file
## Usage
This can be accessed [here](https://aatanda-inverted-index.herokuapp.com).

It can be used locally with the following steps

- Clone this repository
``` git clone https://github.com/andela-aatanda/checkpoint1-inverted-index.git ```
- Move into the repository directory
``` cd checkpoint1-inverted-index ```
- Run npm install to install all dependencies ([Node](nodejs.org) must be installed on your local machine already)

### Dependencies
1. connect
1. gulp
1. gulp-connect
1. serve-static
```npm install```
- Start the application with ```npm start```

## More information
- [Inverted Index - Wikipedia] (https://en.wikipedia.org/wiki/Inverted_index)
- [Inverted Index](https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html)
