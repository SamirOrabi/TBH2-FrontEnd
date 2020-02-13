import React, { Component } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import '../stylesheets/forms.css';
import { connect } from 'react-redux';
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

      nameErrors: { name: '' },
      passwordErrors: { password: '' },

      nameValid: false,
      passwordValid: false,

      formValid: false,
      show: false
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
    e.preventDefault();
    let loginRequest = {};
    loginRequest.username = this.state.name;
    loginRequest.password = this.state.password;
    const userdata = await this.props.Login(
      {
        Account: loginRequest
      },
      this.props.history
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

  render() {
    return (
      <Container className="signIn">
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
          <PasswordErrors passwordErrors={this.state.passwordErrors} />
          <Col className="forgetdev text-center" sm={12}>
            {' '}
            <Button className="resetBtn" onClick={this.handleShow}>
              Forget Password
              <ForgetPassword
                show={this.state.show}
                hideModal={this.hideModal}
              />
            </Button>
          </Col>

          <Col sm={12} className="text-center">
            <Button className="my-4 signInBtn" onClick={this.Signin}>
              SIGN IN
            </Button>
          </Col>
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
  auth: state.auth
});

export default connect(mapStatetoProps, { Login })(withRouter(SignInForm));
