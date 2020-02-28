import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../stylesheets/RoomsCSS.css';
import TimePicker from 'react-time-picker';

import { formatDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
let starttime;
let endtime;
let startdatteee;
let finalstarttime;
// let finalendtime;
class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '1',
      finalDate: '',
      roomtype: 'meeting room',
      payment: 'cash',
      amountofpeople: 1,
      slots: [],
      bookprice: ''
    };
  }

  OnChangeRoomtype = e => {
    this.setState({
      roomtype: e.target.value
    });
  };

  setPeopleNumber = e => {
    this.setState({ amountofpeople: e.target.value });
  };

  OnChangepayment = e => {
    this.setState({
      payment: e.target.value
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      console.log(nextProps.startdate);
      startdatteee = formatDate(nextProps.startdate);
      starttime = nextProps.startTime;
      endtime = nextProps.endTime;
      nextProps.roomId.map(roomId => this.setState({ roomId: String(roomId) }));
      // this.onChangeEndTime = time => {
      //   endtime = time;
      //   console.log(endtime);
      // };
    }
  }

  onChangeStartTime = time => {
    starttime = time;
  };

  CalculatePrice = e => {
    e.preventDefault();

    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    if (String(starttime).substring(0, 2) === '12') {
      finalstarttime = '12PM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '13') {
      finalstarttime = '1PM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '14') {
      finalstarttime = '2PM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '15') {
      finalstarttime = '3PM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '16') {
      finalstarttime = '4PM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '17') {
      finalstarttime = '5PM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '18') {
      finalstarttime = '6PM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '19') {
      finalstarttime = '7PM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '20') {
      finalstarttime = '8PM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '21') {
      finalstarttime = '9AM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '09') {
      finalstarttime = '9AM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '10') {
      finalstarttime = '10AM';
      this.state.slots.push(finalstarttime);
    } else if (String(starttime).substring(0, 2) === '11') {
      finalstarttime = '11AM';
      this.state.slots.push(finalstarttime);
    }

    let bookrequest = {};
    bookrequest.slot = this.state.slots;
    bookrequest.date = formatDate(this.props.startdate);
    bookrequest.roomType = this.state.roomtype;
    bookrequest.roomNumber = this.state.roomId;
    bookrequest.amountOfPeople = this.state.amountofpeople;
    bookrequest.paymentMethod = this.state.payment;
    bookrequest.packageCode = '';

    axios
      .post('https://cubexs.net/tbhapp/bookings/validatebooking', {
        Account: {
          id: this.props.user.id
        },
        Booking: bookrequest
      })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 0) {
          this.setState({ bookprice: res.data.price });
        }
        console.log(this.state.bookprice);
        console.log(formatDate(startdatteee));
        console.log(this.state.roomtype);
        console.log(this.state.roomId);
        console.log(this.state.amountofpeople);
        console.log(this.state.slots);

        this.props.showPayment();
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Container className="roomdetails">
        <Form>
          <Row>
            <Col sm={12} md={6} className="label">
              <p> START DATE</p>
              <div className=" datedrop">
                {/* <DayPickerInput
                  className="DayPickerInput"
                  formatDate={formatDate}
                  value={formatDate(startdatteee)}
                  onChange={day => startdatteee === day}
                /> */}

                <p>{formatDate(this.props.startdate)}</p>
              </div>
            </Col>

            <Col sm={12} md={6} className="label">
              <p> Payment</p>
              <div className="roomtypedrop">
                <select
                  className="browser-default"
                  value={this.state.payment}
                  onChange={this.OnChangepayment}
                  name="payment"
                >
                  <option selected disabled>
                    Payment Way
                  </option>
                  <option name="cash" value="cash">
                    {' '}
                    cash{' '}
                  </option>
                  <option name="vodafone cash" value="vodafone cash">
                    {' '}
                    vodafone cash{' '}
                  </option>
                </select>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col sm={12} md={6} className="label">
              <p> START TIME</p>
              <div className="monthdrop">
                <TimePicker
                  onChange={this.onChangeStartTime}
                  value={starttime}
                />
              </div>
            </Col>

            <Col sm={12} md={6} className="label">
              <p> END TIME</p>
              <div className="monthdrop">
                <TimePicker onChange={this.onChangeEndTime} value={endtime} />
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col sm={12} md={6} className="label">
              <p> Room Type</p>
              <div className="roomtypedrop">
                <select
                  className="browser-default"
                  value={this.state.roomtype}
                  onChange={this.OnChangeRoomtype}
                  name="roomtype"
                >
                  <option selected disabled>
                    roomtype
                  </option>
                  <option name="meeting room" value="meeting room">
                    {' '}
                    Meeting Room{' '}
                  </option>
                  <option name="training room" value="training room">
                    {' '}
                    Training Room{' '}
                  </option>

                  <option name="private room" value="private room">
                    {' '}
                    Private Room
                  </option>

                  <option name=" virtual office" value=" virtual office">
                    {' '}
                    virtual Office{' '}
                  </option>
                </select>
              </div>
            </Col>

            <Col sm={12} md={6} className="label">
              <p>Number of people</p>
              <div className="monthdrop">
                <FormControl
                  style={{ height: '60px', margin: '0px' }}
                  className="startTime"
                  type="number"
                  name="amountofpeople"
                  value={this.state.amountofpeople}
                  onChange={this.setPeopleNumber}
                  // step="1"
                  min="1"
                  max="5"
                />
              </div>
            </Col>
          </Row>

          <Col sm={12} className="text-right">
            <Button
              type="submit"
              className="my-4 nextBtn"
              onClick={this.CalculatePrice}
            >
              NEXT
            </Button>
          </Col>
        </Form>
      </Container>
    );
  }
}

const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(Rooms));