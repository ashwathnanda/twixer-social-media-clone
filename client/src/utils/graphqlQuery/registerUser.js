import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $firstName: String!
    $lastName: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      id
      email
      username
      token
      firstName
      lastName
      createdAt
    }
  }
`;
