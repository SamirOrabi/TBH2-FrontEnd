import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
//Bootstrap
import { Button, Col } from 'react-bootstrap';

//css
import { connect } from 'react-redux';
class UserBoardSideNav extends Component {
  constructor(props) {
    super(props);
    this.state={
      
  }
  }

  render() {
    console.log(this.props.user);
    return (
      <div className="usersidenav">
        <h1 className="firstChardiv">
          {this.props.user.firstName.substring(0, 1)}
        </h1>
        <h3>{this.props.user.username}</h3>
        <p>{this.props.user.email}</p>
        <hr />
        <Col sm="12">
          {' '}
          <NavLink
            exact
            to="/UserBoard/Account-Settings"
            activeStyle={{
              color: 'white',
              textDecoration: 'none',
              backgroundColor: '#ed1c24'
            }}
          >
            {' '}
            Account Settings
          </NavLink>
        </Col>

        <Col sm="12">
          {' '}
          <NavLink
            exact
            to="/UserBoard/Profile"
            activeStyle={{
              color: 'white',
              textDecoration: 'none',
              backgroundColor: '#ed1c24'
            }}
          >
            Profile
          </NavLink>
        </Col>

        <Col sm="12">
          {' '}
          <NavLink
            exact
            to="/UserBoard/booking"
            activeStyle={{
              color: 'white',
              textDecoration: 'none',
              backgroundColor: '#ed1c24'
            }}
          >
            BOOKING
          </NavLink>
        </Col>

        <Col sm="12" className="activecol">
          <NavLink
            exact
            to="/UserBoard/purchase"
            activeStyle={{
              color: 'white',
              textDecoration: 'none',
              backgroundColor: '#ed1c24'
            }}
          >
            PURCHASE
          </NavLink>
        </Col>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(UserBoardSideNav));
