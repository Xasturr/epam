import React, { Component } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './components/navbar.component';
import Login from './components/login.component';
import Dashboard from './components/dashboard.component';

export default class App extends Component {

  render() {
    return (
      <Router>
        <div>
          {/* <Navbar /> */}
          <br />
          <Switch>
            <Route exaxt path="/dashboard" component={Dashboard} />
            <Route exaxt path="/" component={Login} />
          </Switch>
        </div>
      </Router >
    );
  }
}