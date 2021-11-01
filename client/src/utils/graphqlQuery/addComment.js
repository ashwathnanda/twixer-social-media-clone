import gql from "graphql-tag";

export const ADD_COMMENT_MUTATION = gql`
  mutation addComment($postId: ID!, $body: String!) {
    addComment(body: $body, postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        id
        body
        createdAt
        username
      }
      likes {
        id
        username
      }
      likeCount
      commentCount
    }
  }
`;
