import React from "react";
import { useQuery } from "@apollo/client";
import { Grid, GridRow, Transition } from "semantic-ui-react";
import Postcard from "../components/Postcard";
import { FETCH_POST_QUERY } from "../utils/graphqlQuery/getPosts";

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
          <Transition.Group>
            {data &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <Postcard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
