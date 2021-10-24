const gql = require("graphql-tag");

const typeDefs = gql`
  type Posts {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Users {
    id: String!
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
    getPost(postId: ID!): Posts!
  }

  # Define Mutation Types
  type Mutation {
    register(registerInput: RegisterInput): Users!
    login(username: String!, password: String!): Users!
    createPost(body: String!): Posts!
    deletePost(postId: ID!): String!
    addComment(postId: ID!, body: String!): Posts!
    deleteComment(postId: ID!, commentId: ID!): Posts!
    addLike(postId: ID!): Posts!
  }
`;

module.exports = typeDefs;
