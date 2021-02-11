const { books } = require('./model');
const { users } = require('../user/model');
const pubsub = require('../../lib/pubsub');

const resolvers = {
    Query: {
        // Book
        book: (_, { bookId }) => {
            return books.find((book) => book.bookId === bookId);
        },
        books: () => books,
    },

    Mutation: {
        addBook: (_, { userId, bookName }) => {
            const newBook = {
                bookId: books.length + 1,
                bookName,
                author: userId,
            };

            books.push(newBook);

            pubsub.publish('NEW_BOOK', newBook);

            return {
                status: 200,
                message: 'A new book has been added succesfully!',
            };
        },
    },

    Subscription: {
        newBook: {
            subscribe: () => pubsub.asyncIterator(['NEW_BOOK']),
            resolve: (payload) => payload,
        },
    },

    Book: {
        author: (global) => {
            let foundUser = {};

            for (let user of users) {
                if (user.userId === global.author) {
                    foundUser = user;
                }
            }

            return foundUser;
        },
    },
};

module.exports = { resolvers };
