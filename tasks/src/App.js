import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from "./view/pages/Login/Login";
import forgetPassword from "./view/pages/ForgetPassword/ForgetPassword";
import SignUp from "./view/pages/SignUp/SignUp";

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
            <Route path="/forgotPassword">
              <forgetPassword/>
            </Route>
            <Route path="/SignUp">
              <SignUp/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
