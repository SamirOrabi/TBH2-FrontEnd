import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Login } from '../../globalState/actions/authActions';
import { userRegister } from '../../globalState/actions/authActions';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class SignUpGoogleInfo extends Component {
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
      BEerror: ''
    };
  }

  handleUserName = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ name: e.target.value });
  };
  handleUserNumber = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ number: e.target.value });
  };

  sendData = async e => {
    let regestrequest = {};

    regestrequest.id = this.state.id;
    regestrequest.firstName = this.state.fname;
    regestrequest.lastName = this.state.lname;
    regestrequest.email = this.state.email;
    regestrequest.username = this.state.name;
    regestrequest.phoneNumber = this.state.number;
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
      'googleSignup'
    );

    this.setState({ BEerror: userData.error });
  };

  componentDidMount() {
    axios
      .post(
        'https://cubexs.net/tbhapp/accounts/googlecallback' +
          this.props.location.search,
        {
          state: 'signUp'
        }
      )
      .then(res => {
        if (res.data.info.userData) {
          this.setState({
            id: res.data.info.userData.id,
            email: res.data.info.userData.email,
            fname: res.data.info.userData.given_name,
            lname: res.data.info.userData.family_name
          });
        }
      });
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
      'googleLogin'
    );
  };

  render() {
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
                  <p>Complete your info please</p>
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
                </Col>
                <p> {this.state.fname}</p>
                <p>{this.state.lname}</p>
                <p>{this.state.email}</p>
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

SignUpGoogleInfo.propTypes = {
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
  withRouter(SignUpGoogleInfo)
);
