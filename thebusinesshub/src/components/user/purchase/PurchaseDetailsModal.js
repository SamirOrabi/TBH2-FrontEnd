import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Dropdown
} from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

class PurchaseDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      hour: 15,
      selectRoom: 'meeting room',
      numOfpeapole: 1,
      price: ''
    };
  }

  handleChangehour = e => {
    this.setState({ hour: e.target.value });
    console.log(this.state.hour);
  };

  handleChangeroom = e => {
    this.setState({ selectRoom: e.target.value });
    console.log(this.state.selectRoom);
  };
  handleChangenumber = e => {
    this.setState({ numOfpeapole: e.target.value });
    alert('hey');
    console.log(this.state.numOfpeapole);
  };
  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/packages/calculatepackageprice', {
        Package: {
          numberOfHours: this.state.hour,
          package: 'MRFRSG',
          roomType: this.state.selectRoom
        },
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.code === 0) {
          console.log(res);
          this.setState({ price: res.data.price });
        } else {
          //   this.setState({ myerror: res.data.error });
        }
      })
      .catch(err => console.log(err));
  }
  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState, this.state)) {
      axios.defaults.headers.common['authorization'] = localStorage.userToken;
      axios
        .post('https://cubexs.net/tbhapp/packages/calculatepackageprice', {
          Package: {
            numberOfHours: this.state.hour,
            package: 'MRFRSG',
            roomType: this.state.selectRoom
          },
          Account: {
            id: this.props.user.id
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            console.log(res);
            this.setState({ price: res.data.price });
          } else {
            //   this.setState({ myerror: res.data.error });
          }
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    console.log(this.state.numOfpeapole);
    console.log(this.state.selectRoom);
    return (
      <div>
        <Modal show={this.state.show}>
          <Modal.Body className="verifyby">
            <Row>
              <Col sm={6}>Hours</Col>
              <Col sm={6}>Room Type</Col>
            </Row>
            <Row>
              <Form className="" onSubmit={this.handleSubmit}>
                <Row>
                  <Col sm={6}>
                    {' '}
                    <Form.Group className="formgroupfloat">
                      <Form.Control
                        noValidate
                        required
                        type="text"
                        onChange={this.handleChangehour}
                        value={this.state.hour}
                        name="hour"
                        className="floatcontrol"
                        placeholder="Hours"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <select
                      value={this.state.selectRoom}
                      onChange={this.handleChangeroom}
                    >
                      <option value="meeting room">Meeting Room</option>
                      <option value="training room">Training Room</option>
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>Number of people</Col>
                  <Col sm={6}>Price</Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <select
                      value={this.state.numOfpeapole}
                      onChange={this.handleChangenumber}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </Col>
                  <Col sm={6}>{this.state.price}</Col>
                </Row>
              </Form>
            </Row>
            <Button>confirm</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(withRouter(PurchaseDetailsModal));
