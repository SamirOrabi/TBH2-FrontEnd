import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
class InviteToEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      show2: false,
      myerror: ''
    };
  }

  handleUserInput = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ email: e.target.value });
  };

  Invite = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/events/invitetoevent', {
        Account: {
          id: this.props.user.id
        },
        Event: {
          id: this.props.eventId
        },
        Invitee: {
          email: this.state.email
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.setState({ show: false });
          this.props.hideModal(false);
          this.setState({ show2: true });
          setTimeout(() => {
            this.setState({ show2: false });
          }, 1600);
          this.setState({ email: '' });
        } else if (res.data.code === 128 || res.data.code === 101) {
          this.setState({ myerror: res.data.error });
        } else if (res.data.code === 109) {
          this.setState({
            myerror: 'please register and verify your account first'
          });
        } else {
          this.setState({ myerror: '' });
        }
      });
    // .catch(err => console.log(err));
  };

  enter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.Invite();
    }
  };
  handleClose = e => {
    this.props.hideModal(false);
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
              <h3 className="mt-1 text-center">Invite a Friend</h3>
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
                        value={this.state.email}
                        name="email"
                        className="floatcontrol"
                        placeholder="ENTER EMAIL "
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col className="m-auto text-center verifyBtn pt-2" sm={4}>
                  <Button onClick={this.Invite}>Invite</Button>
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
              <div id="snackbar">Sent Successfully!</div>
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
export default connect(mapStateToProps)(withRouter(InviteToEvent));
