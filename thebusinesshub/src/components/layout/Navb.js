import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../Images/logo.png';
import '../stylesheets/NavCSS.css';

export default class Navb extends Component {
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

              <NavLink
                exact
                to="/login"
                activeStyle={{
                  color: 'black',
                  textDecoration: 'none',
                  borderLeft: '5px solid red'
                }}
              >
                {' '}
                SIGN IN / SIGN UP
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}
