import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/client";
import logo from "../images/logo.jpg";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../utils/graphqlQuery/loginUser";

function Login(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.error);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} /> Log-in to your account
          </Header>
          <Form
            size="large"
            onSubmit={onSubmit}
            className={loading ? "loading" : ""}
          >
            <Segment raised>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                type="text"
                value={values.username}
                error={!!errors.username}
                onChange={onChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                value={values.password}
                error={!!errors.password}
                onChange={onChange}
              />
              <Button type="submit" color="teal" fluid size="large">
                Login
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
          <Message>
            New to Twixer? <Link to="/register">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Login;
