import React, { Component } from 'react';
import SignInUp from '../forms/SignInUp';
import '../stylesheets/loginCSS.css';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Login } from '../../globalState/actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LoginFB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    };
  }

  async componentDidMount() {
    if (this.props.location.search !== '') {
      console.log('hna login fb');
      console.log(this.props.location.search);
      const loginFB = await axios
        .post(
          'https://cubexs.net/tbhapp/accounts/facebookcallback' +
            this.props.location.search,
          {
            state: 'signIn'
          }
        )
        .then(res => {
          this.setState({
            id: res.data.data.facebookId
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

    const userdata = await this.props.Login(
      {
        Account: loginRequest
      },
      this.props.history,
      'facebookLogin'
    );
    // if (userdata.error) {
    //   this.setState({ user: userdata.error });
    // } else {
    //   this.setState({ user: '' });
    // }
  };

  render() {
    return <div></div>;
  }
}

LoginFB.propTypes = {
  Login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStatetoProps, { Login })(withRouter(LoginFB));
