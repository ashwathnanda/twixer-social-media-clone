import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, GridRow, Image } from "semantic-ui-react";
import Postcard from "../components/Postcard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POST_QUERY } from "../utils/graphqlQuery/getPost";

function Home(props) {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POST_QUERY);
  return (
    <Grid columns={3}>
      <GridRow className="page-title">
        <h1>Recent Posts</h1>
      </GridRow>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}

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

export default Home;
