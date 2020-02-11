import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
class VerifyBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyby: '',
      code: '',
      show: true,
      show2: false
    };
  }
  setGender(e) {
    console.log(e.target.value);
    this.setState({ verifyby: e.target.value });
  }

  sendCode = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('http://18.185.138.12:5000/api/accounts/verify', {
        Account: {
          id: this.props.userID.id,
          verifyBy: this.state.verifyby
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.setState({ show2: true });

          setTimeout(() => {
            this.setState({ show2: false });
          }, 1800);
        }
      })
      .catch(err => console.log(err));
  };

  verifyme = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('http://18.185.138.12:5000/api/accounts/confirmverify', {
        Account: {
          id: this.props.userID.id,
          code: this.state.code
        }
      })
      .then(res => {
        console.log(res);

        this.setState({ show: false });
      })
      .catch(err => console.log(err));
  };

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
    console.log(this.props.userID.status);

    return (
      <Container className="mt-5 w-50">
        {this.props.userID.status === 'verified' ? null : (
          <div>
            {' '}
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Body className="verifyby">
                {' '}
                <h3 className="mt-5 text-center">VERIFICATION</h3>
                <p>Recieve via :</p>
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
                  <Col className="pt-3 sendcodeBtn" sm={4}>
                    <Button onClick={this.sendCode}>SEND CODE</Button>
                  </Col>
                </Row>
                <Row>
                  {' '}
                  <Col className="m-auto text-center verifyBtn pt-3" sm={12}>
                    <Button onClick={this.verifyme}>VERIFY</Button>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal className="mt-2 feedBack" show={this.state.show2}>
                <div id="snackbar">Sent Successfully!</div>
              </Modal>
            </Modal>
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.auth.user
});
export default connect(mapStateToProps)(withRouter(VerifyBy));
