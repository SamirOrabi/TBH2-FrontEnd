// Libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navb from '../src/components/layout/Navb';
import Login from '../src/components/pages/Login';
import store from './globalState/store';
import jwt_decode from 'jwt-decode';
import Home from './components/pages/Home';
import UserBoard from './components/user/UserBoard';
import Space from './components/pages/Space';
import Booking from './components/pages/Booking';
import Contact from './components/pages/Contact';
// Styling
import './App.css';
import setAuthToken from './helpers/setAuthToken';
import { setCurrentUser } from './globalState/actions/authActions';
// import SignInUp from './components/forms/SignInUp';
// Components

if (localStorage.userToken) {
  setAuthToken(localStorage.userToken);
  const decodedToken = jwt_decode(localStorage.userToken);
  store.dispatch(setCurrentUser(decodedToken));
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navb />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/UserBoard/Account-Settings"
            component={UserBoard}
          />
          <Route exact path="/UserBoard/Profile" component={UserBoard} />
          <Route exact path="/UserBoard/Booking" component={UserBoard} />
          <Route exact path="/UserBoard/Purchase" component={UserBoard} />{' '}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(App);
