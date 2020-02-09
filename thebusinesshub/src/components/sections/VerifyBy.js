import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
export default class VerifyBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyBy: '',
      code: ''
    };
  }
  setGender(e) {
    console.log(e.target.value);
    this.setState({ verifyBy: e.target.value });
  }

  handleUserInput = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ code: e.target.value });
    console.log(this.state.code);
  };
  render() {
    console.log('here my state');
    console.log(this.state.verifyBy);

    return (
      <Container className="mt-5 w-50">
        <h3 className="mt-5">VERIFICATION</h3>
        <p>Recieve via</p>
        <Row onChange={this.setGender.bind(this)}>
          {' '}
          <Col sm={2}>
            <label className="verifyCon">
              <input type="radio" value="email" name="verify" /> Email
              <span className="checkmark"></span>
            </label>
          </Col>
          <Col sm={2}>
            {' '}
            <label className="verifyCon">
              <input type="radio" value="sms" name="verify" /> Sms
              <span className="checkmark"></span>
            </label>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form className="" onSubmit={this.handleSubmit}>
              <Form.Group className="formgroupfloat">
                <Form.Control
                  noValidate
                  required
                  type="text"
                  onChange={this.handleUserInput}
                  value={this.state.code}
                  name="code"
                  className="floatcontrol"
                  placeholder="ENTER THE CODE "
                />
              </Form.Group>
            </Form>
          </Col>
          <Col sm={4}>SEND CODE</Col>
        </Row>
        <Row>
          {' '}
          <Button>VERIFY</Button>
        </Row>
      </Container>
    );
  }
}
