import React, { useContext, useState } from "react";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks";
import logo from "../images/logo.jpg";
import { AuthContext } from "../context/auth";
import { REGISTER_USER } from "../utils/graphqlQuery/registerUser";

function Register(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.error);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div>
      <Grid centered style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} /> Register a new account
          </Header>
          <Form
            size="large"
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <Segment raised>
              {/*Firstname*/}
              <Form.Input
                fluid
                label="Firstname"
                placeholder="Firstname"
                name="firstName"
                type="text"
                value={values.firstName}
                error={!!errors.firstName}
                onChange={onChange}
              />
              {/*Lastname*/}
              <Form.Input
                label="Lastname"
                placeholder="Nanda"
                name="lastName"
                type="text"
                value={values.lastName}
                error={!!errors.lastName}
                onChange={onChange}
              />
              {/*Email*/}
              <Form.Input
                label="Email"
                placeholder="example@email.com"
                name="email"
                type="email"
                value={values.email}
                error={!!errors.email}
                onChange={onChange}
              />
              {/*Username*/}
              <Form.Input
                label="Username"
                placeholder="ashwath5897"
                name="username"
                type="text"
                value={values.username}
                error={!!errors.username}
                onChange={onChange}
              />
              {/*password*/}
              <Form.Input
                label="Password"
                placeholder="password"
                name="password"
                type="password"
                value={values.password}
                error={!!errors.password}
                onChange={onChange}
              />
              {/*Confirm Password*/}
              <Form.Input
                label="Confirm Password"
                placeholder="confirm password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                error={!!errors.password}
                onChange={onChange}
              />
              <Button type="submit" color="teal" fluid size="large">
                Register
              </Button>
            </Segment>
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
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Register;
