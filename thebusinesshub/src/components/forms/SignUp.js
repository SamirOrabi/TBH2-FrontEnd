import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import {
  NameErrors,
  EmailErrors,
  PasswordErrors,
  ConfirmPasswordErrors,
  PhonenumberErrors
} from '../layout/FormErrors';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: '',
      email: '',
      emailErroe: '',
      phonenumber: '',
      phonenumberError: '',
      password: '',
      passwordError: '',
      confirmpassword: '',
      confirmpasswordError: '',

      nameErrors: { name: '' },
      emailErrors: { email: '' },
      phonenumberErrors: { phonenumber: '' },
      passwordErrors: { password: '' },
      confirmpasswordErrors: { confirmpassword: '' },

      emailValid: false,
      nameValid: false,
      phonenumberValid: false,
      passwordValid: false,
      confirmpasswordValid: false,
      formValid: false
    };
  }
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  validateField(fieldName, value) {
    let nameValidationErrors = this.state.nameErrors;
    let emailValidationErrors = this.state.emailErrors;
    let phonenumberValidationErrors = this.state.phonenumberErrors;
    let passwordValidationErrors = this.state.passwordErrors;
    let confirmpasswordValidationErrors = this.state.confirmpasswordErrors;

    let emailValid = this.state.emailValid;
    let nameValid = this.state.nameValid;
    let phonenumberValid = this.state.phonenumberValid;
    let passwordValid = this.state.passwordValidationValid;
    let confirmpasswordValid = this.state.confirmpasswordValid;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        emailValidationErrors.email = emailValid ? '' : ' is invalid';
        if (value === 0) {
        }
        break;
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
      case 'confirmpassword':
        confirmpasswordValid =
          this.state.password !== this.state.confirmpassword;
        confirmpasswordValidationErrors.confirmpassword = confirmpasswordValid
          ? ' Passwords do not match'
          : ''
        break;
      case 'phonenumber':
        phonenumberValid = value.length > 8;
        phonenumberValidationErrors.phonenumber = phonenumberValid
          ? ''
          : ' is too short';
        break;
      default:
        break;
    }
    this.setState(
      {
        nameErrors: nameValidationErrors,
        emailErrors: emailValidationErrors,
        phonenumberErrors: phonenumberValidationErrors,
        passwordErrors: passwordValidationErrors,
        confirmpasswordErrors: confirmpasswordValidationErrors,

        emailValid: emailValid,
        phonenumberValid: phonenumberValid,
        nameValid: nameValid,
        passwordValid: passwordValid,
        confirmpasswordValid: confirmpasswordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.nameValid &&
        this.state.phonenumberValid &&
        this.state.passwordValid &&
        this.state.confirmpasswordValid
    });
  }
  errorClass(error) {
    if (error) {
      return error.length === 0 ? '' : 'has-error';
    }
  }

  render() {
    return (
      <Container>
        <Form className="SignUpForm " onSubmit={this.handleSubmit}>
          <h1>SIGN UP</h1>
          <Form.Group>
            <Form.Control
              noValidate
              required
              type="text"
              onChange={this.handleUserInput}
              value={this.state.name}
              name="name"
              placeholder="USERNAME"
            />
            <NameErrors nameErrors={this.state.nameErrors} />
          </Form.Group>
          <Form.Group>
            <Form.Control
              noValidate
              required
              type="number"
              onChange={this.handleUserInput}
              value={this.state.phonenumber}
              name="phonenumber"
              placeholder="PHONE NUMBER"
            />
            <PhonenumberErrors
              phonenumberErrors={this.state.phonenumberErrors}
            />
          </Form.Group>{' '}
          <Form.Group>
            <Form.Control
              noValidate
              required
              type="text"
              onChange={this.handleUserInput}
              value={this.state.email}
              name="email"
              placeholder="E-MAIL"
            />{' '}
            <EmailErrors emailErrors={this.state.emailErrors} />
          </Form.Group>
          <Form.Group>
            <Form.Control
              noValidate
              required
              type="password"
              onChange={this.handleUserInput}
              value={this.state.password}
              name="password"
              placeholder="PASSWORD"
            />{' '}
            <PasswordErrors passwordErrors={this.state.passwordErrors} />
          </Form.Group>
          <Form.Group>
            <Form.Control
              noValidate
              required
              type="password"
              onChange={this.handleUserInput}
              value={this.state.confirmpassword}
              name="confirmpassword"
              placeholder="CONFIRM PASSWORD"
            />{' '}
            <ConfirmPasswordErrors
              confirmpasswordErrors={this.state.confirmpasswordErrors}
            />
          </Form.Group>
          <div className="signupButton">
            <button>Sign Up</button>
          </div>
        </Form>
      </Container>
    );
  }
}
