const { libraries } = require('./model');
const { books } = require('../book/model');

const resolvers = {
  Query: {
    // Library
    library: (_, { libraryId }) => {
      return libraries.find((library) => library.libraryId === libraryId);
    },
    libraries: () => libraries,
  },

  Mutation: {
    addLibrary: (_, { libraryName }) => {
      const newLibrary = {
        libraryId: libraries.length + 1,
        libraryName,
        books,
      };

      libraries.push(newLibrary);

      return {
        status: 200,
        message: 'A new library has been added succesfully!',
      };
    },
  },

  Library: {
    books: (global) => {
      let filteredBooks = [];

      for (let book of books) {
        for (let libBookId of global.books) {
          if (book.bookId === libBookId) {
            filteredBooks.push(book);
          }
        }
      }

      return filteredBooks;
    },
  },
};

module.exports = { resolvers };
