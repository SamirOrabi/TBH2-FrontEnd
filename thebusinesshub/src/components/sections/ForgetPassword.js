import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      show2: false,
      myerror: ''
    };
  }

  handleUserInput = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ number: e.target.value });
  };
  handleClose = e => {
    this.props.hideModal2(false);
  };
  sendPassword = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/forgetpassword', {
        Account: {
          phoneNumber: this.state.number
        }
      })
      .then(res => {
        if (res.data.code === 0) {
          this.setState({ show: false });
          this.props.hideModal(false);
          this.setState({ show2: true });
          setTimeout(() => {
            this.setState({ show2: false });
          }, 1600);
        } else {
          this.setState({ myerror: res.data.error });
        }
      })
      // .catch(err => console.log(err));
  };

  enter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.sendPassword();
    }
  };

  render() {
    return (
      <Container className="w-50">
        <div>
          {' '}
          <Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Body className="verifyby">
              {' '}
              <Row>
                <Col className="closebtn" sm={12}>
                  <Button onClick={this.handleClose}>
                    {' '}
                    <i
                      className="fas fa-times"
                      style={{ color: '#ed1c24' }}
                    ></i>
                  </Button>
                </Col>
              </Row>
              <h3 className="mt-1 text-center">FORGET PASSWORD</h3>
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
                        onKeyDown={this.enter}
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
                <Col className="m-auto text-center verifyBtn pt-2" sm={4}>
                  <Button onClick={this.sendPassword}>RESET</Button>
                </Col>
                <Col sm={12}>
                  {this.state.myerror ? (
                    <p>
                      {' '}
                      <i className="fas fa-exclamation-triangle px-2"></i>
                      {this.state.myerror}
                    </p>
                  ) : null}
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
