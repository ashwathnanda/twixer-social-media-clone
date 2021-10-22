const gql = require("graphql-tag");

const typeDefs = gql`
  type Posts {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Users {
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
    token: String!
    createdAt: String!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Posts]
  }

  type Mutation {
    register(registerInput: RegisterInput): Users!
  }
`;

module.exports = typeDefs;
