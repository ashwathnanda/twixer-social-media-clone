import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

function Register(props) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      {/*Firstname*/}
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Firstname"
          placeholder="Ashwath"
          name="firstName"
          type="text"
          value={values.firstName}
          onChange={onChange}
        />
        {/*Lastname*/}
        <Form.Input
          label="Lastname"
          placeholder="Nanda"
          name="lastName"
          type="text"
          value={values.lastName}
          onChange={onChange}
        />
        {/*Email*/}
        <Form.Input
          label="Email"
          placeholder="example@email.com"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        {/*Username*/}
        <Form.Input
          label="Username"
          placeholder="ashwath5897"
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        {/*password*/}
        <Form.Input
          label="Password"
          placeholder="password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        {/*Confirm Password*/}
        <Form.Input
          label="Confirm Password"
          placeholder="confirm password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $firstName: String!
    $lastName: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      id
      email
      username
      token
      firstName
      lastName
      createdAt
    }
  }
`;
export default Register;
