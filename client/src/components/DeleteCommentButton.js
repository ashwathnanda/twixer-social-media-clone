import React, { useState } from "react";
import { Comment, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT_MUTATION } from "../utils/graphqlQuery/deleteComment";

function DeleteCommentButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);

      if (callback) callback();
    },
    variables: {
      postId: postId,
      commentId: commentId,
    },
  });

  return (
    <>
      <Comment.Actions>
        <Comment.Action
          onClick={() => {
            setConfirmOpen(true);
          }}
        >
          Delete
        </Comment.Action>
      </Comment.Actions>
      <Confirm
        size="tiny"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteComment}
      />
    </>
  );
}

export default DeleteCommentButton;
