import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid, GridRow, Image } from "semantic-ui-react";
import Postcard from "../components/Postcard";

function Home(props) {
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  return (
    <Grid columns={3}>
      <GridRow className="page-title">
        <h1>Recent Posts</h1>
      </GridRow>
      <Grid.Row>
        {loading ? (
          <h1>Loading Posts..</h1>
        ) : (
          data &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <Postcard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POST_QUERY = gql`
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

export default Home;
