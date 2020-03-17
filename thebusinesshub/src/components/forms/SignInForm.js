import React, { Component } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import '../stylesheets/forms.css';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Login } from '../../globalState/actions/authActions';
import {
  NameErrors,
  PasswordErrors,
  PasswordErrorsIcon,
  NameErrorsIcon
} from '../layout/FormErrors';
import { withRouter } from 'react-router-dom';
import ForgetPassword from '../sections/ForgetPassword';
class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: '',
      name: '',
      nameError: '',
      password: '',
      passwordError: '',
      myLink: '',
      fbLink: '',
      nameErrors: { name: '' },
      passwordErrors: { password: '' },

      nameValid: false,
      passwordValid: false,

      formValid: false,
      show: false,
      id: '',
      fbID: '',
      err: ''
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };
  hideModal = e => {
    setTimeout(() => {
      this.setState({ show: e });
    }, 1600);
  };

  hideModal2 = e => {
    // this.setState({ show: false });

    setTimeout(() => {
      this.setState({ show: e });
    }, 0);
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let nameValidationErrors = this.state.nameErrors;
    let passwordValidationErrors = this.state.passwordErrors;
    let nameValid = this.state.nameValid;
    let passwordValid = this.state.passwordValidationValid;
    switch (fieldName) {
      case 'name':
        nameValid = value.length > 2;
        nameValidationErrors.name = nameValid ? '' : ' is too short';
        break;
      case 'password':
        passwordValid = value.length > 2;
        passwordValidationErrors.password = passwordValid
          ? ''
          : ' is too short';
        break;
      default:
        break;
    }
    this.setState(
      {
        nameErrors: nameValidationErrors,
        passwordErrors: passwordValidationErrors,

        nameValid: nameValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.passwordValid
    });
  }
  errorClass(error) {
    if (error) {
      return error.length === 0 ? '' : 'has-error';
    }
  }

  Signin = async e => {
    if (e) {
      e.preventDefault();
    }
    let loginRequest = {};
    loginRequest.username = this.state.name;
    loginRequest.password = this.state.password;
    const userdata = await this.props.Login(
      {
        Account: loginRequest
      },
      this.props.history,
      ''
    );
    if (userdata.error) {
      this.setState({ user: userdata.error });
    } else {
      this.setState({ user: '' });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  enter = e => {
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        e.preventDefault();

        this.Signin();
      }
    });
  };

  componentDidMount() {
    this.enter();
    axios
      .post('https://cubexs.net/tbhapp/accounts/getgoogleurl', {
        state: 'signIn'
      })
      .then(res => {
        this.setState({ myLink: res.data.url });
      });

    axios
      .post('https://cubexs.net/tbhapp/accounts/getfacebookurl', {
        state: 'signIn'
      })
      .then(res => {
        this.setState({ fbLink: res.data });
      });

    // if (this.props.location.search !== '') {
    //   // console.log('hna login fb');
    //   // console.log(this.props.location.search);
    //   axios
    //     .post(
    //       'https://cubexs.net/tbhapp/accounts/facebookcallback' +
    //         this.props.location.search,
    //       {
    //         state: 'signIn'
    //       }
    //     )
    //     .then(res => {
    //       // if(res.data.code===0)
    //       // {

    //       // }
    //       console.log('res bt3t call back fb');
    //       console.log(res);
    //       this.setState({
    //         fbID: res.data.data.facebookId
    //       });
    //       this.SigninFB();
    //     });
    // }
  }

  // SigninFB = async e => {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   let loginRequest = {};
  //   loginRequest.id = this.state.fbID;

  //   const userdata = await this.props.Login(
  //     {
  //       Account: loginRequest
  //     },
  //     this.props.history,
  //     'facebookLogin'
  //   );
  //   if (userdata.error) {
  //     // this.setState({ err: userdata.error });
  //     alert('user not found');
  //   } else {
  //     // this.setState({ err: '' });
  //   }
  // };
  render() {
  
    return (
      <Container className="signIn" onSubmit={this.Signin}>
        <Form className="SignInForm">
          <h3 className="pt-4">SIGN IN </h3>
          <Form.Group>
            <Form.Control
              required
              type="text"
              onChange={this.handleUserInput}
              value={this.state.name}
              name="name"
              placeholder="USERNAME"
            />
            <div className="icontringale">
              <NameErrorsIcon nameErrors={this.state.nameErrors} />
            </div>
          </Form.Group>
          <NameErrors nameErrors={this.state.nameErrors} />
          <Form.Group className="formgroupmargin">
            <Form.Control
              required
              type="password"
              onChange={this.handleUserInput}
              value={this.state.password}
              name="password"
              placeholder="PASSWORD"
            />
            <div className="icontringale">
              <PasswordErrorsIcon passwordErrors={this.state.passwordErrors} />
            </div>
          </Form.Group>
          <PasswordErrors passwordErrors={this.state.passwordErrors} />{' '}
          {this.state.user ? (
            <span className="BbachError pb-3">
              {' '}
              <i className="fas fa-exclamation-triangle px-2"></i>
              Username or Password is incorrect
            </span>
          ) : null}
          <Col className="forgetdev text-center" sm={12}>
            {' '}
            <Button className="resetBtn" onClick={this.handleShow}>
              Forget Password
              <ForgetPassword
                show={this.state.show}
                hideModal={this.hideModal}
                hideModal2={this.hideModal2}
              />
            </Button>
          </Col>
          <Col sm={12} className="text-center">
            <Button
              type="submit"
              className="my-4 signInBtn"
              onClick={this.Signin}
            >
              SIGN IN
            </Button>
          </Col>
          <p className="text-center pt-1">
            or you can sign in with{' '}
            <a href={this.state.myLink} rel="noopener noreferrer">
              <i
                className="fab  fa-google xl"
                style={{ padding: '4px 6px', fontSize: '15px' }}
              ></i>
            </a>
            or
            <a href={this.state.fbLink} rel="noopener noreferrer">
              <i
                className="fab fa-facebook-f xl"
                style={{ padding: '4px 6px', fontSize: '15px' }}
              ></i>
            </a>
          </p>
        </Form>
      </Container>
    );
  }
}

SignInForm.propTypes = {
  Login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStatetoProps, { Login })(withRouter(SignInForm));
