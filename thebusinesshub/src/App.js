// Libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navb from '../src/components/layout/Navb';
import Login from '../src/components/pages/Login';
import Home from './components/pages/Home';
import Space from './components/pages/Space';
import Booking from './components/pages/Booking';
import Contact from './components/pages/Contact';

// Styling
import './App.css';
// import SignInUp from './components/forms/SignInUp';
// Components


import { connect } from 'react-redux';
import store from './globalState/store';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navb />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}
