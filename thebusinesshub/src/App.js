// Libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignInForm from '../src/components/forms/SignInForm'
// Styling
import './App.css';
import SignInUp from './components/forms/SignInUp';
// Components

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <SignInUp />
        </div>
      </Router>
    );
  }
}
