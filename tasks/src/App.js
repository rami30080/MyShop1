import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from "./view/pages/Login/Login";
import ForgetPassword from "./view/pages/ForgetPassword/ForgetPassword";
import SignUp from "./view/pages/SignUp/SignUp";
import Admin from "./view/pages/Admin/Admin";
import CheckKey from "./view/pages/CheckKey/CheckKey";
import resetPassword from "./view/pages/ResetPassword/ResetPassword";

import './App.css';

function App() {
  return (
       <Router>
      <div className="app">
        <div className="mainPage">
          <Switch>
            <Route exact={true} path="/">
              <Login />
            </Route>
            <Route path="/forgetPassword">
              <ForgetPassword/>
            </Route>
            <Route path="/SignUp">
              <SignUp/>
            </Route>
            <Route path="/Admin">
              <Admin/>
            </Route>
            <Route path="/CheckKey">
              <CheckKey/>
            </Route>
            <Route path="/resetPassword">
              <resetPassword/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
