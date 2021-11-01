import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT_MUTATION } from "../utils/graphqlQuery/addComment";

function AddCommentButton({ postId }) {
  const [comment, setComment] = useState("");

  const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: {
      postId: postId,
      body: comment,
    },
  });

  return (
    <Segment raised>
      <Form reply>
        <Form.TextArea
          name="comment"
          placeholder="Add your comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <Button
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          disabled={comment.trim() === ""}
          primary
          onClick={addComment}
        />
      </Form>
    </Segment>
  );
}

export default AddCommentButton;
