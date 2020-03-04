// Libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navb from '../src/components/layout/Navb';
import MyLogin from '../src/components/pages/MyLogin';
import store from './globalState/store';
import jwt_decode from 'jwt-decode';
import Home from './components/pages/Home';
import UserBoard from './components/user/UserBoard';
import Booking from './components/pages/Booking';
import Contact from './components/pages/Contact';
import BookDetails from './components/user/booking/BookDetails';
import SignUpGoogleInfo from './components/forms/SignUpGoogleInfo';
// import Payment from './components/user/booking/Payment';

// Styling
import './App.css';
import setAuthToken from './helpers/setAuthToken';
import { setCurrentUser, LogOut } from './globalState/actions/authActions';
import EditSlot from './components/user/booking/EditSlot';
// import {
//   clearCurrentProfile,
//   getProfile
// } from './globalState/actions/profileActions';
// import SignInUp from './components/forms/SignInUp';
// Components

if (localStorage.userToken) {
  setAuthToken(localStorage.userToken);
  const decodedToken = jwt_decode(localStorage.userToken);
  store.dispatch(setCurrentUser(decodedToken));
  // store.dispatch(getProfile());

  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    // store.dispatch(clearCurrentProfile);
    store.dispatch(LogOut);
    // window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navb />
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/googlesignup" component={SignUpGoogleInfo} />

          <Route exact path="/login" component={MyLogin} />
          <Route exact path="/booking" component={Booking} />
          <Route
            exact
            path="/UserBoard/Account-Settings"
            component={UserBoard}
          />

          <Route exact path="/UserBoard/Profile" component={UserBoard} />
          <Route exact path="/UserBoard/Booking" component={UserBoard} />
          <Route exact path="/UserBoard/Purchase" component={UserBoard} />

          {/* <DetailsPaymentHolder />
      <Receipt /> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(App);
