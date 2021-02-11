const { users } = require('./model');
const { books } = require('../book/model');
const { sign } = require('../../lib/jwt');
const { middleware } = require('../../utils/utils');

const resolvers = {
    Query: {
        //   User
        user: (_, { userId }, { token }) => {
            const foundUser = users.find((user) => user.userId === userId);

            return middleware(token, foundUser);
        },

        users: async (_, args, { token }) => {
            return middleware(token, users);
        },
    },

    Mutation: {
        registerUser: (_, { userName, age, password }) => {
            const newUser = {
                userId: users.length + 1,
                userName,
                age,
                books: [],
                password,
                role: 1,
            };

            users.push(newUser);

            const clientUser = {
                userId: users.length + 1,
                role: 1,
            };

            return {
                token: sign(clientUser),
            };
        },
    },

    User: {
        books: (global) => {
            const filteredBooks = [];

            for (let book of books) {
                for (let userBook of global.books) {
                    if (book.bookId === userBook) {
                        filteredBooks.push(book);
                    }
                }
            }

            return filteredBooks;
        },
    },
};

module.exports = { resolvers };
