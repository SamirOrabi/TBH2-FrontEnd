import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
//Bootstrap
import { Button, Col } from 'react-bootstrap';

//css
import { connect } from 'react-redux';
class UserBoardSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentBG: '#ed1c24'
    };
  }

  componentDidMount() {
    console.log(this.target);
  }

  render() {
    console.log(this.props.user);
    return (
      <div className="usersidenav">
        <h1 className="firstChardivside">
          {this.props.user.firstName.substring(0, 1)}
        </h1>
        <h3 className="sidename pt-4">{this.props.user.username}</h3>
        <p className="sidemail pt-1 pb-2">{this.props.user.email}</p>
        <hr />
        <div className="SideLinksdiv">
          <Col sm="12" className="sidelinkParent">
            {' '}
            <NavLink
              exact
              style={{ width: '100%' }}
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

          <Col sm="12" className="sidelinkParent">
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

          <Col
            sm="12"
            className="sidelinkParent"
            activeStyle={{
              backgroundColor: '#ed1c24'
            }}
          >
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

          <Col sm="12" className="sidelinkParent">
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
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(UserBoardSideNav));
