import gql from "graphql-tag";

export const LIKE_POST_MUTATION = gql`
  mutation likePosts($postID: ID!) {
    likePosts(postId: $postID) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
