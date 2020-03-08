import React, { Component } from 'react';
import SignInUp from '../forms/SignInUp';
import '../stylesheets/loginCSS.css';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Login } from '../../globalState/actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LoginGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      fbId: ''
    };
  }

  componentDidMount() {
    if (this.props.location.search !== '') {
      axios
        .post(
          'https://cubexs.net/tbhapp/accounts/googlecallback' +
            this.props.location.search,
          {
            state: 'signIn'
          }
        )
        .then(res => {
          this.setState({
            id: res.data.info.userData.id
          });
          this.Signin();
        });

      axios
        .post(
          'https://cubexs.net/tbhapp/accounts/facebookcallback' +
            this.props.location.search,
          {
            state: 'signIn'
          }
        )
        .then(res => {
          this.setState({
            fbId: res.data.info.userData.id
          });
          this.Signin();
        });
    }
  }

  Signin = async e => {
    if (e) {
      e.preventDefault();
    }
    let loginRequest = {};
    loginRequest.id = this.state.id;

    let loginRequest2 = {};
    loginRequest2.id = this.state.fbId;
    const userdata = await this.props.Login(
      {
        Account: loginRequest
      },
      this.props.history,
      'googleLogin'
    );

    const userdata2 = await this.props.Login(
      {
        Account: loginRequest2
      },
      this.props.history,
      'facebookLogin'
    );
  };

  render() {
    return (
      <div className="bg">
        <Container>
          <SignInUp />
        </Container>
        <Row className="justify-content-end m-0">
          <div className="featuerslisticon">
            <p
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '12px',
                margin: '7px'
              }}
            >
              SOCIAL
            </p>
            <a
              href="https://www.facebook.com/thebusinesshub.space/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fab  fa-facebook-f"
                style={{ padding: '4px 6px' }}
              ></i>
            </a>

            <a
              href="https://www.instagram.com/thebusinesshub.space/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab  p-1 fa-instagram"></i>
            </a>

            <a
              href="https://www.instagram.com/thebusinesshub.space/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab p-1 fa-linkedin-in"></i>
            </a>
          </div>
        </Row>
      </div>
    );
  }
}

LoginGoogle.propTypes = {
  Login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStatetoProps, { Login })(withRouter(LoginGoogle));
