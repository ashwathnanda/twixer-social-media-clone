import React, { useState } from "react";
import { Menu, Modal } from "semantic-ui-react";
import PostForm from "./PostForm";

function CreatePostModal(props) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Menu.Item name="Create Post" />}
    >
      <Modal.Header>Create Post</Modal.Header>
      <Modal.Content>
        <PostForm />
      </Modal.Content>
    </Modal>
  );
}

export default CreatePostModal;
