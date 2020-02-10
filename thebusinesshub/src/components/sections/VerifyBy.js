import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
export default class VerifyBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyBy: '',
      code: '',
      show: false
    };
  }
  setGender(e) {
    console.log(e.target.value);
    this.setState({ verifyBy: e.target.value });
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

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
        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            {' '}
            <h3 className="mt-5 text-center">VERIFICATION</h3>
            <p>Recieve via</p>
            <Row onChange={this.setGender.bind(this)}>
              {' '}
              <Col sm={5}>
                <label className="verifyCon">
                  <input type="radio" value="email" name="verify" /> Email
                  <span className="checkmark"></span>
                </label>
              </Col>
              <Col sm={5}>
                {' '}
                <label className="verifyCon">
                  <input type="radio" value="sms" name="verify" /> Sms
                  <span className="checkmark"></span>
                </label>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
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
              <Col className="pt-3" sm={4}>
                SEND CODE
              </Col>
            </Row>
            <Row>
              {' '}
              <Col className="m-auto text-center" sm={12}>
                <Button>VERIFY</Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}
