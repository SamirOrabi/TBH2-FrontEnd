import React, { Component } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import PurchaseReceipt from './PurchaseReceipt';

class PurchaseDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 15,
      selectRoom: 'meeting room',
      numOfpeapole: 1,
      price: '',
      showmodal: false,
      myerror: ''
    };
  }

  handleChangehour = e => {
    this.setState({ hour: e.target.value });
  };

  handleChangeroom = e => {
    this.setState({ selectRoom: e.target.value });
  };
  handleChangenumber = e => {
    this.setState({ numOfpeapole: e.target.value });
  };
  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/packages/calculatepackageprice', {
        Package: {
          numberOfHours: this.state.hour,
          package: this.props.code,
          roomType: this.props.room
        },
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        if (res.data.code === 0) {
          this.setState({ price: res.data.price });
          this.setState({ myerror: '' });
        } else {
          this.setState({ myerror: res.data.error });
        }
      });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ hour: this.props.hours });
    if (this.props.type === 'big') {
      this.setState({ numOfpeapole: 6 });
    }
  }
  openReciept = () => {
    this.setState({ showmodal: true });
    // this.handleClose();
  };

  closeReciept = e => {
    setTimeout(() => {
      this.setState({ showmodal: e });
    }, 0);
  };

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState, this.state)) {
      axios.defaults.headers.common['authorization'] = localStorage.userToken;
      axios
        .post('https://cubexs.net/tbhapp/packages/calculatepackageprice', {
          Package: {
            numberOfHours: this.state.hour,
            package: this.props.code,
            roomType: this.props.room
          },
          Account: {
            id: this.props.user.id
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.setState({ price: res.data.price });
            this.setState({ myerror: '' });
          } else {
            this.setState({ myerror: res.data.error });
          }
        });
      // .catch(err => console.log(err));
    }
  }
  handleClose = e => {
    this.props.closemodal(false);
  };
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Modal.Body className="purchaseModal">
            <div className="m-2">
              <Row>
                <Col className="closebtn" sm={12}>
                  <Button style={{ float: 'right' }} onClick={this.handleClose}>
                    {' '}
                    <i
                      className="fas fa-times"
                      style={{ color: '#ed1c24' }}
                    ></i>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>Hours</Col>
                <Col sm={6}>Room Type</Col>
              </Row>
              <Row>
                <Form className="">
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
                          placeholder="ENTER HOURS"
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      {this.props.room === 'meeting room' ? (
                        // <h6>Meeting room</h6>
                        <Form.Group className="formgroupfloat">
                          <Form.Control
                            noValidate
                            required
                            type="text"
                            value="Meeting Room"
                            name="hour"
                            className="floatcontrol"
                            placeholder="Hours"
                          />
                        </Form.Group>
                      ) : (
                        <Form.Group className="formgroupfloat">
                          <Form.Control
                            noValidate
                            required
                            type="text"
                            value="Training Room"
                            name="hour"
                            className="floatcontrol"
                            placeholder="Hours"
                          />
                        </Form.Group>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Number of people</Col>
                    <Col sm={6}>Price</Col>
                  </Row>
                  <Row>
                    <Col className="purchasedrop" sm={6}>
                      {this.props.type === 'small' ? (
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
                      ) : (
                        <select
                          value={this.state.numOfpeapole}
                          onChange={this.handleChangenumber}
                        >
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      )}
                    </Col>
                    <Col sm={6}>
                      {/* {this.state.price} */}
                      <Form.Group className="formgroupfloat">
                        <Form.Control
                          noValidate
                          required
                          type="text"
                          value={this.state.price}
                          name={this.state.price}
                          className="floatcontrol"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Row>
              <Row>
                <Col sm={6}></Col>
                <Col
                  style={{ float: 'right' }}
                  className="verifyBtn pt-2"
                  sm={3}
                >
                  <Button style={{ float: 'right' }} onClick={this.handleClose}>
                    Cancle
                  </Button>
                </Col>
                <Col
                  style={{ float: 'right' }}
                  className="verifyBtn pt-2"
                  sm={3}
                >
                  {/* {this.state.myerror ? (
                <p>
                  {' '}
                  <i className="fas fa-exclamation-triangle"></i>
                  {this.state.myerror}
                </p>
              ) : null} */}
                  <Button style={{ float: 'right' }} onClick={this.openReciept}>
                    Confirm
                  </Button>
                </Col>
              </Row>
              {this.state.myerror.length !== 0 ? (
                <p style={{ color: '#ed1c24' }}>
                  {' '}
                  <i className="fas fa-exclamation-triangle"></i>
                  {this.state.myerror}
                </p>
              ) : null}
            </div>
          </Modal.Body>
        </Modal>
        <PurchaseReceipt
          showmodal={this.state.showmodal}
          people={this.state.numOfpeapole}
          hours={this.state.hour}
          price={this.state.price}
          type={this.props.type}
          code={this.props.code}
          room={this.props.room}
          closeReciept={this.closeReciept}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(withRouter(PurchaseDetailsModal));
