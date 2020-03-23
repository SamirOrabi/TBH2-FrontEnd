import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Login } from '../../globalState/actions/authActions';
import { userRegister } from '../../globalState/actions/authActions';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class SignUpFacebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      name: '',
      number: '',
      id: '',
      fname: '',
      email: '',
      lname: '',
      BEerror: '',
      password: '',
      errName: '',
      errPass: '',
      errnumber: ''
    };
  }

  // handleUserName = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  //   this.setState({ name: e.target.value });
  // };
  // handleUserNumber = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  //   this.setState({ number: e.target.value });
  // };

  // handleUserPassword = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  //   this.setState({ password: e.target.value });
  // };
  handleUserName = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (
      e.target.value.match(/^([a-zA-Z0-9!#_$%&*]){3,25}$/i) ||
      e.target.value.match(/^\s*$/)
    ) {
      this.setState({ name: e.target.value });
      this.setState({ errName: '' });
    }
    // this.setState({ name: e.target.value });
    else {
      this.setState({ errName: 'name must be min 3 char and no whitespace' });
    }
  };
  handleUserNumber = e => {
    this.setState({ [e.target.name]: e.target.value });

    // this.setState({ number: e.target.value });
    if (e.target.value.match(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/)) {
      this.setState({ number: e.target.value });
      this.setState({ errnumber: '' });
    } else {
      this.setState({
        errnumber: 'Phone number has to be  11 numbers only'
      });
    }
  };

  handleUserPassword = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (
      e.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    ) {
      this.setState({ password: e.target.value });
      this.setState({ errPass: '' });
    }
    else {
      this.setState({
        errPass: 'password should contain lower case , upper case and number'
      });
    }
    // this.setState({ password: e.target.value });
  };
  sendData = async e => {
    let regestrequest = {};

    regestrequest.id = this.state.id;
    regestrequest.firstName = this.state.fname;
    regestrequest.lastName = this.state.lname;
    regestrequest.email = this.state.email;
    regestrequest.username = this.state.name;
    regestrequest.phoneNumber = this.state.number;
    regestrequest.password = this.state.password;
    const userData = await this.props.userRegister(
      {
        Account: regestrequest
      },
      {
        Account: {
          id: regestrequest.id
        }
      },
      this.props.history,
      'facebookSignup'
    );

    this.setState({ BEerror: userData.error });
  };

  async componentDidMount() {
    // console.log(this.props.location.search);
    const regFB = await axios
      .post(
        'https://cubexs.net/tbhapp/accounts/facebookcallback' +
          this.props.location.search,
        {
          state: 'signUp'
        }
      )
      .then(res => {
        // console.log('de resssss abl el condition');
        // console.log(res);
        if (res.data) {
          this.setState({
            id: res.data.data.facebookId,
            email: res.data.data.email,
            fname: res.data.data.firstName,
            lname: res.data.data.lastName
          });
          // console.log('de resssss');
          // console.log(res);
        }
      });
    // .catch(err => console.log(err));
  }

  Signin = async e => {
    if (e) {
      e.preventDefault();
    }
    let loginRequest = {};
    loginRequest.id = this.state.id;

    const userdata = await this.props.Login(
      {
        Account: loginRequest
      },
      this.props.history,
      'facebookLogin'
    );
  };

  render() {
    // console.log('de id ly riha le request');

    // console.log(this.state.id);
    return (
      <Container className="w-50">
        <div>
          {' '}
          <Modal show={this.state.show}>
            <Modal.Body className="verifyby">
              {' '}
              <Row>
                <Col sm={12}>
                  {' '}
                  <p>Complete your missing info please</p>
                </Col>
                <Col sm={12}>
                  <Form className="" onSubmit={this.handleSubmit}>
                    <Form.Group className="formgroupfloat">
                      <Form.Control
                        noValidate
                        required
                        onKeyDown={this.enter}
                        type="text"
                        onChange={this.handleUserName}
                        value={this.state.name}
                        name="name"
                        className="floatcontrol"
                        placeholder="USER NAME"
                      />
                    </Form.Group>
                  </Form>
                  {this.state.errName ? (
                    <span style={{ fontSize: '13px' }} className="BbachError">
                      {' '}
                      <i className="fas fa-exclamation-triangle px-2"></i>
                      {this.state.errName}
                    </span>
                  ) : null}
                </Col>
                <Col sm={12}>
                  <Form className="" onSubmit={this.handleSubmit}>
                    <Form.Group className="formgroupfloat">
                      <Form.Control
                        noValidate
                        required
                        onKeyDown={this.enter}
                        type="password"
                        onChange={this.handleUserPassword}
                        value={this.state.password}
                        name="password"
                        className="floatcontrol"
                        placeholder="PASSWORD"
                      />
                    </Form.Group>
                  </Form>
                  {this.state.errPass ? (
                    <span style={{ fontSize: '13px' }} className="BbachError">
                      {' '}
                      <i className="fas fa-exclamation-triangle px-2"></i>
                      {this.state.errPass}
                    </span>
                  ) : null}
                </Col>
                <Col sm={12}>
                  <Form className="" onSubmit={this.handleSubmit}>
                    <Form.Group className="formgroupfloat">
                      <Form.Control
                        noValidate
                        required
                        onKeyDown={this.enter}
                        type="text"
                        onChange={this.handleUserNumber}
                        value={this.state.number}
                        name="number"
                        className="floatcontrol"
                        placeholder="PHONE NUMBER "
                      />
                    </Form.Group>
                  </Form>
                  {this.state.errnumber ? (
                    <span style={{ fontSize: '13px' }} className="BbachError">
                      {' '}
                      <i className="fas fa-exclamation-triangle px-2"></i>
                      {this.state.errnumber}
                    </span>
                  ) : null}
                </Col>
                <Col sm={12}>
                  <Form className="" onSubmit={this.handleSubmit}>
                    <Form.Group className="formgroupfloat">
                      <Form.Control
                        type="text"
                        // onChange={this.handleUserNumber}
                        value={this.state.fname}
                        name={this.state.fname}
                        className="floatcontrol"
                        placeholder="First Name"
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col sm={12}>
                  <Form className="" onSubmit={this.handleSubmit}>
                    <Form.Group className="formgroupfloat">
                      <Form.Control
                        type="text"
                        value={this.state.lname}
                        name={this.state.lname}
                        className="floatcontrol"
                        placeholder="LAST NAME"
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col sm={12}>
                  <Form className="" onSubmit={this.handleSubmit}>
                    <Form.Group className="formgroupfloat">
                      <Form.Control
                        type="text"
                        value={this.state.email}
                        name={this.state.email}
                        className="floatcontrol"
                        placeholder="EMAIL"
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col className="m-auto text-center verifyBtn pt-2" sm={4}>
                  <Button onClick={this.sendData}>submit</Button>
                </Col>
                <Col sm={12}>
                  {this.state.BEerror ? (
                    <p>
                      {' '}
                      <i className="fas fa-exclamation-triangle px-2"></i>
                      {this.state.BEerror}
                    </p>
                  ) : null}
                </Col>
              </Row>{' '}
            </Modal.Body>
            {/* <Modal className="mt-2 feedBack" show={this.state.show2}>
              <div id="snackbar">Message Sent Successfully!</div>
            </Modal> */}
          </Modal>
        </div>
      </Container>
    );
  }
}

SignUpFacebook.propTypes = {
  Login: PropTypes.func.isRequired,
  userRegister: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStatetoProps, { Login, userRegister })(
  withRouter(SignUpFacebook)
);
