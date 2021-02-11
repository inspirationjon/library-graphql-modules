const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Response

    extend type Query {
        user(userId: Int!): User!
        users: [User!]!
    }

    extend type Mutation {
        registerUser(userName: String!, age: Int!, password: String!): Response!
    }

    type User {
        userId: Int!
        userName: String!
        age: Int!
        books: [Book!]!
    }
`;

module.exports = {
    typeDefs,
};
