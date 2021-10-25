import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Image } from "semantic-ui-react";
import moment from "moment";

Postcard.propTypes = {};

function Postcard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>Liek buttons</p>
      </Card.Content>
    </Card>
  );
}

export default Postcard;
