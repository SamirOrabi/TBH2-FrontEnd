import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import {
  NameErrors,
  EmailErrors,
  PasswordErrors,
  FNameErrors,
  LNameErrors,
  NameErrorsIcon,
  PasswordErrorsIcon,
  EmailErrorsIcon,
  FNameErrorsIcon,
  LNameErrorsIcon,
  PhonenumberErrors,
  PhoneErrorsIcon
} from '../layout/FormErrors';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userRegister } from '../../globalState/actions/authActions';
import { withRouter } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: '',
      email: '',
      emailErros: '',
      phonenumber: '',
      phonenumberError: '',
      password: '',
      passwordError: '',
      fname: '',
      fnameError: '',
      lname: '',
      lnameError: '',
      errors: {},
      user: '',
      code:'',
      show: false,

      nameErrors: { name: '' },
      emailErrors: { email: '' },
      phonenumberErrors: { phonenumber: '' },
      passwordErrors: { password: '' },
      fnameErrors: { fname: '' },
      lnameErrors: { lname: '' },

      emailValid: false,
      nameValid: false,
      phonenumberValid: false,
      passwordValid: false,
      fnameValid: false,
      lnameValid: false,
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
    let fnameValidationErrors = this.state.fnameErrors;
    let lnameValidationErrors = this.state.lnameErrors;

    let emailValid = this.state.emailValid;
    let nameValid = this.state.nameValid;

    let phonenumberValid = this.state.phonenumberValid;
    let passwordValid = this.state.passwordValidationValid;
    let fnameValid = this.state.fnameValid;
    let lnameValid = this.state.lnameValid;

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
      case 'fname':
        fnameValid = value.length > 2;
        fnameValidationErrors.fname = fnameValid ? '' : 'name is too short';
        break;
      case 'lname':
        lnameValid = value.length > 2;
        lnameValidationErrors.lname = lnameValid ? '' : 'name is too short';
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
        fnameErrors: fnameValidationErrors,
        lnameErrors: lnameValidationErrors,

        emailValid: emailValid,
        phonenumberValid: phonenumberValid,
        nameValid: nameValid,

        passwordValid: passwordValid,
        fnameValid: fnameValid,
        lnameValid: lnameValid
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
        this.state.lnameValid &&
        this.state.fnameValid
    });
  }
  errorClass(error) {
    if (error) {
      return error.length === 0 ? '' : 'has-error';
    }
  }

  onRegist = async e => {
    e.preventDefault();
    const userData = await this.props.userRegister(
      {
        Account: {
          username: this.state.name,
          firstName: this.state.fname,
          lastName: this.state.lname,
          password: this.state.password,
          phoneNumber: this.state.phonenumber,
          email: this.state.email
        }
      },
      this.props.history
    );
    console.log('hnaaa el res');

    console.log(userData);
    this.setState({ user: userData.error });
    this.setState({ user: userData.code });

  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    console.log('hna el error msg');
    if (this.state.user !== '') {
      console.log(this.state.user);
    }
    return (
      <Container>
        <Form className="SignUpForm " onSubmit={this.handleSubmit}>
          <h1>SIGN UP</h1>
          <Form.Group className="formgroupfloat">
            <Form.Control
              noValidate
              required
              type="text"
              onChange={this.handleUserInput}
              value={this.state.name}
              name="name"
              className="floatcontrol"
              placeholder="USERNAME"
            />
            <div className="icontringale">
              <NameErrorsIcon nameErrors={this.state.nameErrors} />
            </div>{' '}
          </Form.Group>{' '}
          <NameErrors nameErrors={this.state.nameErrors} />
          <Form.Group className="formgroupmargin">
            <Form.Control
              noValidate
              required
              type="text"
              onChange={this.handleUserInput}
              value={this.state.fname}
              name="fname"
              placeholder="FIRST NAME"
            />{' '}
            <div className="icontringale">
              <FNameErrorsIcon fnameErrors={this.state.fnameErrors} />
            </div>{' '}
          </Form.Group>{' '}
          <FNameErrors fnameErrors={this.state.fnameErrors} />
          <Form.Group className="formgroupmargin">
            <Form.Control
              noValidate
              required
              type="text"
              onChange={this.handleUserInput}
              value={this.state.lname}
              name="lname"
              placeholder="LAST NAME"
            />{' '}
            <div className="icontringale">
              <LNameErrorsIcon lnameErrors={this.state.lnameErrors} />
            </div>{' '}
          </Form.Group>{' '}
          <LNameErrors lnameErrors={this.state.lnameErrors} />
          <Form.Group className="formgroupmargin">
            <Form.Control
              noValidate
              required
              type="number"
              onChange={this.handleUserInput}
              value={this.state.phonenumber}
              name="phonenumber"
              placeholder="PHONE NUMBER"
            />
            <div className="icontringale">
              <PhoneErrorsIcon
                phonenumberErrors={this.state.phonenumberErrors}
              />
            </div>{' '}
          </Form.Group>{' '}
          <PhonenumberErrors phonenumberErrors={this.state.phonenumberErrors} />
          <Form.Group className="formgroupmargin">
            <Form.Control
              noValidate
              required
              type="text"
              onChange={this.handleUserInput}
              value={this.state.email}
              name="email"
              placeholder="E-MAIL"
            />{' '}
            <div className="icontringale">
              <EmailErrorsIcon emailErrors={this.state.emailErrors} />
            </div>{' '}
          </Form.Group>{' '}
          <EmailErrors emailErrors={this.state.emailErrors} />
          <Form.Group className="formgroupmargin">
            <Form.Control
              noValidate
              required
              type="password"
              onChange={this.handleUserInput}
              value={this.state.password}
              name="password"
              placeholder="PASSWORD"
            />{' '}
            <div className="icontringale">
              {' '}
              <PasswordErrorsIcon passwordErrors={this.state.passwordErrors} />
            </div>{' '}
          </Form.Group>{' '}
          <PasswordErrors passwordErrors={this.state.passwordErrors} />
          {this.state.user ? (
            <span className="BbachError">
              {' '}
              <i class="fas fa-exclamation-triangle px-2"></i>
              {this.state.user}
            </span>
          ) : null}
          <div className="signupButton">
            <button onClick={this.onRegist}>Sign Up</button>
          </div>
        </Form>
      </Container>
    );
  }
}

SignUp.propTypes = {
  userRegister: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { userRegister })(withRouter(SignUp));
