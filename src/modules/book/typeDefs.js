const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        book(bookId: Int!): Book!
        books: [Book!]!
    }

    extend type Mutation {
        addBook(userId: Int!, bookName: String!): Response!
    }

    extend type Subscription {
        newBook: Book!
    }
    type Book {
        bookId: Int!
        bookName: String!
        author: User!
    }
`;

module.exports = { typeDefs };
