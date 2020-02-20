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
      // show: true,
      userId: '',
      myerror: '',
      show2: false,
      mystate: 'verified',
      showTimer: false,
      isButtonDisabled: false,
      num: ''
    };
  }

  sendAgain = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/verify', {
        Account: {
          id: this.props.user.id,
          verifyBy: 'sms'
        }
      })
      .then(res => {
        // console.log(res);
        if (res.data.code === 0) {
          this.setState({
            isButtonDisabled: true
          });

          setTimeout(() => this.setState({ isButtonDisabled: false }), 10000);

          var countdownNumberEl = document.getElementById('countdown-number');
          var countdown = 10;

          countdownNumberEl.textContent = countdown;

          setInterval(function() {
            countdown = --countdown <= 0 ? 10 : countdown;

            countdownNumberEl.textContent = countdown;
          }, 1000);
        }
        // this.setState({ show: false });
      })
      .catch(err => console.log(err));
  };

  confirmVerify = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/confirmverify', {
        Account: {
          id: this.props.user.id,
          code: this.state.code
        }
      })
      .then(res => {
        if (res.data.code === 0) {
          this.setState({ show2: true });
          setTimeout(() => {
            this.setState({ show2: false });
          }, 2300);
          setTimeout(() => {
            this.props.closeModal();
          }, 3000);
          this.getProfile();
        } else {
          this.setState({ myerror: res.data.error });
        }
      })
      .catch(err => console.log(err));
  };

  handleClose = () => {
    this.props.closeModal();
  };

  // handleShow = () => {
  //   this.setState({ show: true });
  // };

  handleUserInput = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ code: e.target.value });
  };

  componentDidMount() {
    this.getProfile();
    this.setState({ showMe: this.props.show });
  }

  enter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();

      this.confirmVerify();
    }
  };

  getProfile = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/getprofile', {
        Account: {
          id: this.props.user.id
        }
      })

      .then(res => {
        console.log('res');

        console.log(res);

        this.setState({ mystate: res.data.state });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container className="w-50">
        {this.state.mystate !== 'verified' && this.props.isAuth !== false ? (
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
                <h3 className="text-center my-2">VERIFICATION</h3>
                <Row className="pt-1 text-center m-auto">
                  <Col className="pt-1 m-auto" sm={10}>
                    <p style={{ fontSize: '11px', color: '#7E7E7E' }}>
                      We have sent a verification code to your phone number,
                      please enter the code sent via sms. The code expires in 24
                      hours.
                    </p>
                  </Col>
                </Row>
                <Row>
                  {/* {' '}
                  <Col sm={4}>
                    {' '}
                    <label className="verifyCon">
                      <input type="radio" value="sms" name="verify" /> Sms
                      <span className="checkmark"></span>
                    </label>
                  </Col>
                   */}
                </Row>
                <Row className="py-1 m-auto">
                  <Col sm={8}>
                    <Form className="" onSubmit={this.handleSubmit}>
                      <Form.Group className="formgroupfloat">
                        <Form.Control
                          noValidate
                          required
                          onKeyDown={this.enter}
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
                  <Col className="forgetdev pt-3" sm={4}>
                    {' '}
                    {this.state.isButtonDisabled === false ? (
                      <Button
                        className="resetBtn"
                        onClick={this.sendAgain}
                        disabled={this.state.isButtonDisabled}
                      >
                        Resend Code
                      </Button>
                    ) : (
                      <div id="countdown">
                        <div id="countdown-number"></div>
                        <svg className="myCounter">
                          <circle r="18" cx="20" cy="20"></circle>
                        </svg>
                      </div>
                    )}
                  </Col>
                </Row>{' '}
                <Col sm={12}>
                  {this.state.myerror ? (
                    <p>
                      {' '}
                      <i className="fas fa-exclamation-triangle"></i>
                      {this.state.myerror}
                    </p>
                  ) : null}
                </Col>
                <Col className="m-auto text-center verifyBtn pt-3" sm={12}>
                  <Button onClick={this.confirmVerify}>VERIFY</Button>
                </Col>
              </Modal.Body>
              <Modal className="mt-2 feedBack" show={this.state.show2}>
                <div id="snackbar">Activated Successfully!</div>
              </Modal>
            </Modal>
          </div>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});
export default connect(mapStateToProps)(withRouter(VerifyBy));
