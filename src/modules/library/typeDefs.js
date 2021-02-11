const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    library(libraryId: Int!): Library!
    libraries: [Library]!
  }

  extend type Mutation {
    addLibrary(libraryName: String!): Response!
  }

  type Library {
    libraryId: Int!
    libraryName: String!
    books: [Book!]!
  }
`;

module.exports = { typeDefs };
