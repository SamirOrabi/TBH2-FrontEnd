import React, { Component } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import {
    NameErrors,
    PasswordErrors,
    PasswordErrorsIcon,
    NameErrorsIcon
  } from '../layout/FormErrors';

class AccountSettings extends Component {
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
    render() {
        return (
            <Container className="signIn">
{/* 
<Col sm={12} className="text-center"> */}
        <Form className="SignInForm">
          <h3 className="pt-4">ACCOUNT SETTINGS </h3>
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

        </Form>
        {/* <Col /> */}
      </Container>
        )
    }
}

export default AccountSettings
