import gql from "graphql-tag";

export const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        username
        createdAt
      }
      createdAt
      likeCount
      commentCount
    }
  }
`;
