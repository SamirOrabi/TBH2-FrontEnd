import React, { Component } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import '../stylesheets/forms.css';
import {
  NameErrors,
  PasswordErrors,
  PasswordErrorsIcon,
  NameErrorsIcon
} from '../layout/FormErrors';
export default class SignInForm extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameError: '',
      password: '',
      passwordError: '',

      nameErrors: { name: '' },
      passwordErrors: { password: '' },

      nameValid: false,
      passwordValid: false,

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
          <p className="signinForget text-center">Forgot Password?</p>
          <Col sm={12} className="text-center">
            <Button className="my-4 signInBtn">SIGN IN</Button>
          </Col>
        </Form>
      </Container>
    );
  }
}
