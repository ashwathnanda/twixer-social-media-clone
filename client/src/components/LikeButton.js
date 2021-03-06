import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LIKE_POST_MUTATION } from "../utils/graphqlQuery/likePosts";

function LikeButton({ user, postInfo: { likes, likeCount, id } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postID: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Popup
      content={liked ? "Unlike" : "Like"}
      inverted
      trigger={
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likeButton}
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
}

export default LikeButton;
