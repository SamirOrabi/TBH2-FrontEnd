import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
//Bootstrap
import { Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import VerifyBy from '../sections/VerifyBy';

//css
import { connect } from 'react-redux';
class UserBoardSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentBG: '#ed1c24',
      profile: [],
      show: false,
      mystate: 'verified'
    };
  }

  handleShow = () => {
    this.setState({ show: true });
    // alert('hmwtlko nfsy');
  };
  closeModal = e => {
    // this.setState({ show: !this.state.show });
    setTimeout(() => {
      this.setState({ show: false });
    }, 0);
  };
  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;

    axios
      .post('http://18.185.138.12:5000/api/accounts/getprofile', {
        Account: {
          ownerId: this.props.user.id
        }
      })
      .then(res => {
        this.setState({ profile: res.data.profile });
      });
    console.log(this.props.isAuth);
    this.getProfile();
  }

  getProfile = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/getprofile', {
        Account: {
          id: this.props.user.id
        }
      })

      .then(res => {
        console.log('res');
        console.log(res.data);
        this.setState({ mystate: res.data.state });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="usersidenav">
        {this.state.mystate !== 'verified' && this.props.isAuth !== false ? (
          <Col className="alertverify2 pb-4" sm={12}>
            <Button onClick={this.handleShow}>
              <i className="fas fa-exclamation-triangle px-2"></i>
              <span> Please verify your phone number </span>
              {console.log(this.state.show)}
              <VerifyBy closeModal={this.closeModal} show={this.state.show} />
            </Button>
          </Col>
        ) : null}

        <h1 className="firstChardivside">
          {this.props.user.firstName.substring(0, 1)}
        </h1>
        <h3 className="sidename pt-4">{this.props.user.username}</h3>
        <p className="sidemail pt-1 pb-2">{this.state.profile.email}</p>
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
