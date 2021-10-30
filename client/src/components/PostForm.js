import React from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION } from "../utils/graphqlQuery/createPost";
import { FETCH_POST_QUERY } from "../utils/graphqlQuery/getPost";

function PostForm(props) {
  const { onChange, onSubmit, values } = useForm(createPostCallBack, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    onError(err) {
      console.log(err);
    },
  });

  function createPostCallBack() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <TextArea
            focus
            placeholder="Enter your message"
            onChange={onChange}
            name="body"
            value={values.body}
            error={!!error}
          />
          <Button
            type="submit"
            color="teal"
            fluid
            size="large"
            style={{ marginTop: 20 }}
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PostForm;
