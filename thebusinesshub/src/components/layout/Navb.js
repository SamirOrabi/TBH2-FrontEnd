import React, { Component } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import logo from '../../Images/logo.png';
import '../stylesheets/NavCSS.css';
import { LogOut } from '../../globalState/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import store from '../../globalState/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../helpers/setAuthToken';
import { setCurrentUser } from '../../globalState/actions/authActions';
let currentTime = Date.now() / 1000;
let decodedToken;
if (localStorage.userToken) {
  setAuthToken(localStorage.userToken);
   decodedToken = jwt_decode(localStorage.userToken);
  store.dispatch(setCurrentUser(decodedToken));         
}

class Navb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profleDate: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/getprofile', {
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        // console.log('getprofile from nav', res);
        this.setState({ profleDate: res.data.profile });
      })
      .catch(err => console.log(err));
  }
  SignOut = e => {
    e.preventDefault();
    // this.props.clearCurrentProfile();
    this.props.LogOut(this.props.history);
  };

  render() {
    return (
      <Container>
        <Navbar
          variant="dark"
          collapseOnSelect
          fixed="top"
          expand="lg"
          className="navbar navbar-dark"
        >
          <Navbar.Brand href="/">
            {' '}
            <img
              src={logo}
              className="navLogo mx-auto"
              alt="Business-Hub-Logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <NavLink
                exact
                to="/"
                activeStyle={{
                  color: 'black',
                  textDecoration: 'none',
                  borderLeft: '5px solid red'
                }}
              >
                {' '}
                HOME
              </NavLink>

              <NavLink
                exact
                to="/space"
                activeStyle={{
                  color: 'black',
                  textDecoration: 'none',
                  borderLeft: '5px solid red'
                }}
              >
                {' '}
                SPACE
              </NavLink>

              <NavLink
                exact
                to="/booking"
                activeStyle={{
                  color: 'black',
                  textDecoration: 'none',
                  borderLeft: '5px solid red'
                }}
              >
                {' '}
                BOOKING
              </NavLink>

              <NavLink
                exact
                to="/contact"
                activeStyle={{
                  color: 'black',
                  textDecoration: 'none',
                  borderLeft: '5px solid red'
                }}
              >
                {' '}
                CONTACT
              </NavLink>
  {this.props.isAuth ?<Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.props.user.username.charAt(0).toUpperCase()}{' '}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="dropdownlink">
                      <Dropdown.Item href="/UserBoard/Account-Settings">
                        {' '}
                        ACCOUNT
                      </Dropdown.Item>
                    </div>
                    <div className="dropdownbookinglink">
                      {' '}
                      <Dropdown.Item href="/UserBoard/Booking">
                        {' '}
                        MY BOOKINGS
                      </Dropdown.Item>
                    </div>
                    <div className="dropdownsignoutlink">
                      {' '}
                      <Dropdown.Item onClick={this.SignOut}>
                        {' '}
                        <i className="fas fa-sign-out-alt"></i>SIGN OUT
                      </Dropdown.Item>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>  :  <NavLink
                  exact
                  to="/login"
                  activeStyle={{
                    color: 'black',
                    textDecoration: 'none',
                    borderLeft: '5px solid red'
                  }}
                >
                  SIGN IN / SIGN UP
                </NavLink> }
                
                           {/* //   <NavLink
                //                 exact
                //                 to=""
                //                 activeStyle={{
                //                   color: 'black',
                //                   textDecoration: 'none',
                //                 }}
                //                 onClick={this.SignOut}
                //               >

                // Logout              </NavLink> */}
              
           
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

Navb.propTypes = {
  LogOut: PropTypes.func.isRequired
};
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});
export default connect(mapStatetoProps, { LogOut })(withRouter(Navb));
