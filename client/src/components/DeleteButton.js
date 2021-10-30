import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { DELETE_POST_MUTATION } from "../utils/graphqlQuery/deletePost";
import { FETCH_POST_QUERY } from "../utils/graphqlQuery/getPosts";

function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          getPosts: data.getPosts.filter((p) => p.id !== postId),
        },
      });
      if (callback) callback();
    },
    variables: { postId },
  });

  return (
    <>
      <Button
        floated="right"
        icon
        color="red"
        as="div"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" />
        <Confirm
          size="tiny"
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={deletePost}
        />
      </Button>
    </>
  );
}

export default DeleteButton;
