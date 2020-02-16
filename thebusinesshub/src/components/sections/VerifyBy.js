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
      userId: '',
      myerror: '',
      // show2: false,
      mystate: 'verified'
    };
    if (this.props) {
      console.log('this.props');
      console.log(this.props);
    }
  }

  verifyAgain = e => {
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
        this.setState({ show: false });
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
          console.log(res);

          this.setState({ mystate: res.data.state });
          this.setState({ show: false });
        } else {
          console.log(res.data.error);
          this.setState({ myerror: res.data.error });
        }
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
  };

  componentDidMount() {
    this.getProfile();
  }

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
      <Container className="mt-5 w-50">
        {this.state.mystate !== 'verified' && this.props.isAuth !== false ? (
          <div>
            {' '}
            <Modal show={this.state.show} onHide={this.handleClose}>
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
                <h3 className="mt-1 text-center">VERIFICATION</h3>
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
                  <Col sm={12}>
                    {' '}
                    <p style={{ color: 'grey', fontSize: '12px' }}>
                      check your phone for code
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
                          value={this.state.code}
                          name="code"
                          className="floatcontrol"
                          placeholder="ENTER THE CODE "
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col className="m-auto text-center verifyBtn pt-3" sm={4}>
                    <Button onClick={this.confirmVerify}>VERIFY</Button>
                  </Col>
                </Row>{' '}
                <Col sm={12}>
                  {this.state.myerror ? (
                    <p>
                      {' '}
                      <i className="fas fa-exclamation-triangle px-2"></i>
                      {this.state.myerror}
                    </p>
                  ) : null}
                </Col>
                <Row className="pt-1">
                  <Col className="pt-1" sm={8}>
                    <p style={{ fontSize: '9px', color: 'grey' }}>
                      please note that the code will expire within 48 hour
                    </p>
                  </Col>
                  <Col className="forgetdev" sm={4}>
                    {' '}
                    <Button className="resetBtn" onClick={this.verifyAgain}>
                      Resend
                    </Button>
                  </Col>
                </Row>
              </Modal.Body>
              {/* <Modal className="mt-2 feedBack" show={this.state.show2}>
                <div id="snackbar">Sent Successfully!</div>
              </Modal> */}
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
