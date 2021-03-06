import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function Postcard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <hr />
      <Card.Content extra>
        <LikeButton user={user} postInfo={{ id, likeCount, likes }} />
        <Popup
          content="Comment on this post"
          inverted
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label as="a" basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />
        {user && user.username === username ? <DeleteButton postId={id} /> : ""}
      </Card.Content>
    </Card>
  );
}

export default Postcard;
