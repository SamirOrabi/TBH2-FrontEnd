import React, { Component } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import logo from '../../Images/logo.png';
import '../stylesheets/NavCSS.css';
import { LogOut } from '../../globalState/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navb extends Component {
  SignOut = e => {
    e.preventDefault();
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
              {this.props.isAuth ? (
                //               <NavLink
                //                 exact
                //                 to=""
                //                 activeStyle={{
                //                   color: 'black',
                //                   textDecoration: 'none',
                //                 }}
                //                 onClick={this.SignOut}
                //               >

                // Logout              </NavLink>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    N
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/AccountSettings">
                      {' '}
                      Account
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2"> MY BOOKING</Dropdown.Item>
                    <Dropdown.Item onClick={this.SignOut}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <NavLink
                  exact
                  to="/login"
                  activeStyle={{
                    color: 'black',
                    textDecoration: 'none',
                    borderLeft: '5px solid red'
                  }}
                >
                  SIGN IN / SIGN UP
                </NavLink>
              )}
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
  isAuth: state.auth.isAuth
});
export default connect(mapStatetoProps, { LogOut })(withRouter(Navb));
