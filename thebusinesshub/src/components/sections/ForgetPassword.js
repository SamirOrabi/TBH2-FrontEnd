import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      number: '',
      show2: false
    };
  }

  handleUserInput = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ number: e.target.value });
    console.log(e.target.value);
  };
  sendPassword = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('http://18.185.138.12:5000/api/accounts/forgetpassword', {
        Account: {
          phoneNumber: this.state.number
        }
      })
      .then(res => {
        console.log(res);
        this.setState({ show: false });
        this.props.hideModal(false);
        this.setState({ show2: true });
        setTimeout(() => {
          this.setState({ show2: false });
        }, 1600);
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.props);
    return (
      <Container className="mt-5 w-50">
        <div>
          {' '}
          <Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Body className="verifyby">
              {' '}
              <h3 className="mt-3 text-center">FORGET PASSWORD</h3>
              <Row>
                <Col sm={12}>
                  <p style={{ color: 'grey', fontSize: '12px' }}>
                    check your phone for new password
                  </p>
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
                        value={this.state.number}
                        name="number"
                        className="floatcontrol"
                        placeholder="ENTER YOUR PHONE NUMBER "
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col className="m-auto text-center verifyBtn pt-3" sm={12}>
                  <Button onClick={this.sendPassword}>RESET</Button>
                </Col>
              </Row>{' '}
            </Modal.Body>
            <Modal className="mt-2 feedBack" show={this.state.show2}>
              <div id="snackbar">Message Sent Successfully!</div>
            </Modal>
          </Modal>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});
export default connect(mapStateToProps)(withRouter(ForgetPassword));
