import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menubar from "./components/Menubar";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/authRoute";
import PrivateRoute from "./utils/privateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Menubar />
          <PrivateRoute exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
