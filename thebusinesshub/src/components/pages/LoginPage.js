import React, { Component } from 'react';
import SignInUp from '../forms/SignInUp';
import '../stylesheets/loginCSS.css';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Login } from '../../globalState/actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RegisterFirst from '../sections/RegisterFirst';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      fbID: '',
      showbar: false
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
          // console.log('res callback google');
          // console.log(res);
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
          // console.log('res bt3t call back fb');
          // console.log(res);
          this.setState({
            fbID: res.data.data.facebookId
          });
          this.SigninFB();
        });
    }
  }

  Signin = async e => {
    if (e) {
      e.preventDefault();
    }
    let loginRequest = {};
    loginRequest.id = this.state.id;

    const userdata = await this.props.Login(
      {
        Account: loginRequest
      },
      this.props.history,
      'googleLogin'
    );
    if (userdata.error) {
      // alert('user not found');
      this.setState({ showbar: true });
    } else {
      this.setState({ showbar: false });
    }
  };

  SigninFB = async e => {
    if (e) {
      e.preventDefault();
    }
    let loginRequest = {};
    loginRequest.id = this.state.fbID;

    const userdata = await this.props.Login(
      {
        Account: loginRequest
      },
      this.props.history,
      'facebookLogin'
    );
    if (userdata.error) {
      this.setState({ showbar: true });
    } else {
      this.setState({ showbar: false });
    }
  };

  render() {
    //hna login with google logic
    return (
      <div className="bg">
        <Row>
          <RegisterFirst showbar={this.state.showbar} />
        </Row>

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

LoginPage.propTypes = {
  Login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStatetoProps, { Login })(withRouter(LoginPage));
