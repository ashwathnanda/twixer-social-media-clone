import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_SINGLE_POST_QUERY } from "../utils/graphqlQuery/getPost";
import {
  Button,
  Card,
  Grid,
  GridRow,
  Header,
  Icon,
  Image,
  Label,
  Comment,
  Segment,
  Form,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import DeleteCommentButton from "../components/DeleteCommentButton";
import AddCommentButton from "../components/addCommentButton";

function SinglePagePost(props) {
  const [deleteButton, showDeleteButton] = useState(false);
  const postId = props.match.params.postId;

  const { user } = useContext(AuthContext);

  const { data: getPost } = useQuery(FETCH_SINGLE_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const deletePostCallback = () => {
    props.history.push(`/posts/${postId}`);
  };

  let postMarkUp;
  if (!getPost) {
    postMarkUp = <p>Loading!!</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost.getPost;
    postMarkUp = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />{" "}
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} postInfo={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("Comment")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username ? (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                ) : (
                  ""
                )}
              </Card.Content>
            </Card>
            <Header as="h3" dividing>
              Comments
            </Header>
            {comments && comments.length > 0 ? (
              <Segment raised>
                <Comment.Group>
                  {comments.map((comment) => (
                    <Comment key={comment.id}>
                      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                      <Comment.Content>
                        <Comment.Author as="a">
                          {comment.username}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>{moment(createdAt).fromNow()}</div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.body}</Comment.Text>
                        {user && user.username === comment.username && (
                          <DeleteCommentButton
                            commentId={comment.id}
                            postId={id}
                            callback={deletePostCallback}
                          />
                        )}
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
              </Segment>
            ) : (
              ""
            )}
            {user && <AddCommentButton postId={postId} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkUp;
}

export default SinglePagePost;
