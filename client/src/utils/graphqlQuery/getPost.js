import gql from "graphql-tag";

export const FETCH_SINGLE_POST_QUERY = gql`
  query getSinglePost($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      createdAt
      body
      likes {
        id
        username
        createdAt
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
      likeCount
    }
  }
`;
