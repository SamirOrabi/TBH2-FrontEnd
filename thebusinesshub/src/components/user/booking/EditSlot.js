import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
class EditSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slot: '',
      show2: false
    };
  }

  handleClose = e => {
    this.props.hideModal2(false);
  };

  editTimeSlot = id => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/bookings/editbookingtiming', {
        Account: {
          id: this.props.user.id,
          slot: ['10AM']
        },
        Booking: {
          id: id.target.id
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
      .catch(err => console.log(err));
  };

  enter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.edittimeslot();
    }
  };

  render() {
    return (
      <Container className="w-50">
        <div>
          {' '}
          <Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Body className="verifyby">
              <h4>Change slot time</h4>
            </Modal.Body>
            <Modal className="mt-2 feedBack" show={this.state.show2}>
              <div id="snackbar">Slot time edited Successfully!</div>
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
export default connect(mapStateToProps)(withRouter(EditSlot));
