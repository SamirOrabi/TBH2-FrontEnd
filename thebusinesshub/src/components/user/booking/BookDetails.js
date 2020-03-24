import React, { Component } from 'react';
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FormControl
} from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../stylesheets/BookdetailsCSS.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../stylesheets/RoomsCSS.css';
import TimePicker from 'react-time-picker';

import { formatDate } from 'react-day-picker/moment';
// import Rooms from '../booking/Rooms';
let starttime;
let endtime;
// let startdatteee;

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '1',
      finalDate: '',
      roomtype: 'meeting room',
      payment: 'cash',
      amountofpeople: '1',
      slots: [],
      bookprice: '',
      startdate: formatDate(this.props.startdate),
      timeErrorMessage: '',
      packageCode: '',
      warn: ''
    };
  }
  componentDidMount() {
    this.test();
  }

  // test=()=>{
  //   this.props.detailsfun(this.props.startdate)
  // }

  test = () => {
    // this.props.detailsfun(this.state.bookprice)
    // this.props.testtoreceipt(this.state.roomtype)
  };
  OnChangeRoomtype = e => {
    this.setState({
      roomtype: e.target.value
    });
  };

  setPeopleNumber = e => {
    if (this.state.roomtype === 'meeting room' && e.target.value <= 10) {
      console.log('meeet');
      this.setState({ amountofpeople: e.target.value, warn: '' });
    } else if (
      e.target.value <= 16 &&
      this.state.roomtype === 'training room'
    ) {
      console.log('training');
      this.setState({ amountofpeople: e.target.value, warn: '' });
    } else {
      this.setState({ amountofpeople: '', warn: 'people overload room' });
    }
  };

  OnChangepayment = e => {
    this.setState({
      payment: e.target.value
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      // startdatteee = formatDate(nextProps.startdate);
      starttime = nextProps.startTime;
      endtime = nextProps.endTime;
      this.setState({ roomId: String(nextProps.roomId)[0] });
      // this.onChangeEndTime = time => {
      //   endtime = time;
      // };
    }
  }

  onChangeStartTime = time => {
    starttime = time;
  };

  onChangeEndTime = time => {
    endtime = time;
  };

  CalculatePrice = e => {
    e.preventDefault();
    // console.log(endtime.substring(0, 2));
    // console.log(endtime.substring(0, 2) - starttime.substring(0, 2));
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    if (starttime || endtime) {
      if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '09'
      ) {
        this.state.slots.push('09AM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '10'
      ) {
        this.state.slots.push('10AM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '11'
      ) {
        this.state.slots.push('11AM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '12'
      ) {
        this.state.slots.push('12PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '13'
      ) {
        this.state.slots.push('01PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '14'
      ) {
        this.state.slots.push('02PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '15'
      ) {
        this.state.slots.push('03PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '16'
      ) {
        this.state.slots.push('04PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '17'
      ) {
        this.state.slots.push('05PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '18'
      ) {
        this.state.slots.push('06PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '19'
      ) {
        this.state.slots.push('07PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 1 &&
        starttime.substring(0, 2) === '20'
      ) {
        this.state.slots.push('08PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '09'
      ) {
        this.state.slots.push('09AM', '10AM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '10'
      ) {
        this.state.slots.push('10AM', '11AM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '11'
      ) {
        this.state.slots.push('11AM', '12PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '12'
      ) {
        this.state.slots.push('12PM', '01PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '13'
      ) {
        this.state.slots.push('01PM', '02PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '14'
      ) {
        this.state.slots.push('02PM', '03PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '15'
      ) {
        this.state.slots.push('03PM', '04PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '16'
      ) {
        this.state.slots.push('04PM', '05PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '17'
      ) {
        this.state.slots.push('05PM', '06PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '18'
      ) {
        this.state.slots.push('06PM', '07PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 2 &&
        starttime.substring(0, 2) === '19'
      ) {
        this.state.slots.push('07PM', '08PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 3 &&
        starttime.substring(0, 2) === '09'
      ) {
        this.state.slots.push('09AM', '10AM', '11AM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 3 &&
        starttime.substring(0, 2) === '10'
      ) {
        this.state.slots.push('10AM', '11AM', '12PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 3 &&
        starttime.substring(0, 2) === '11'
      ) {
        this.state.slots.push('11AM', '12PM', '01PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 3 &&
        starttime.substring(0, 2) === '12'
      ) {
        this.state.slots.push('12PM', '01PM', '02PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 3 &&
        starttime.substring(0, 2) === '13'
      ) {
        this.state.slots.push('01PM', '02PM', '03PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 3 &&
        starttime.substring(0, 2) === '14'
      ) {
        this.state.slots.push('02PM', '03PM', '04PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 3 &&
        starttime.substring(0, 2) === '15'
      ) {
        this.state.slots.push('03PM', '04PM', '05PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 3 &&
        starttime.substring(0, 2) === '16'
      ) {
        this.state.slots.push('04PM', '05PM', '06PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 3 &&
        starttime.substring(0, 2) === '17'
      ) {
        this.state.slots.push('05PM', '06PM', '07PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 3 &&
        starttime.substring(0, 2) === '18'
      ) {
        this.state.slots.push('06PM', '07PM', '08PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 4 &&
        starttime.substring(0, 2) === '09'
      ) {
        this.state.slots.push('09AM', '10AM', '11AM', '12PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 4 &&
        starttime.substring(0, 2) === '10'
      ) {
        this.state.slots.push('10AM', '11AM', '12PM', '01PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 4 &&
        starttime.substring(0, 2) === '11'
      ) {
        this.state.slots.push('11AM', '12PM', '01PM', '02PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 4 &&
        starttime.substring(0, 2) === '12'
      ) {
        this.state.slots.push('12PM', '01PM', '02PM', '03PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 4 &&
        starttime.substring(0, 2) === '13'
      ) {
        this.state.slots.push('01PM', '02PM', '03PM', '04PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 4 &&
        starttime.substring(0, 2) === '14'
      ) {
        this.state.slots.push('02PM', '03PM', '04PM', '05PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 4 &&
        starttime.substring(0, 2) === '15'
      ) {
        this.state.slots.push('03PM', '04PM', '05PM', '06PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 4 &&
        starttime.substring(0, 2) === '16'
      ) {
        this.state.slots.push('04PM', '05PM', '06PM', '07PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 4 &&
        starttime.substring(0, 2) === '17'
      ) {
        this.state.slots.push('05PM', '06PM', '07PM', '08PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 5 &&
        starttime.substring(0, 2) === '09'
      ) {
        this.state.slots.push('09AM', '10AM', '11AM', '12PM', '01PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 5 &&
        starttime.substring(0, 2) === '10'
      ) {
        this.state.slots.push('10AM', '11AM', '12PM', '01PM', '02PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 5 &&
        starttime.substring(0, 2) === '11'
      ) {
        this.state.slots.push('11AM', '12PM', '01PM', '02PM', '03PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 5 &&
        starttime.substring(0, 2) === '12'
      ) {
        this.state.slots.push('12PM', '01PM', '02PM', '03PM', '04PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 5 &&
        starttime.substring(0, 2) === '13'
      ) {
        this.state.slots.push('01PM', '02PM', '03PM', '04PM', '05PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 5 &&
        starttime.substring(0, 2) === '14'
      ) {
        this.state.slots.push('02PM', '03PM', '04PM', '05PM', '06PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 5 &&
        starttime.substring(0, 2) === '15'
      ) {
        this.state.slots.push('03PM', '04PM', '05PM', '06PM', '07PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 5 &&
        starttime.substring(0, 2) === '16'
      ) {
        this.state.slots.push('04PM', '05PM', '06PM', '07PM', '08PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 6 &&
        starttime.substring(0, 2) === '09'
      ) {
        this.state.slots.push('09AM', '10AM', '11AM', '12PM', '01PM', '02PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 6 &&
        starttime.substring(0, 2) === '10'
      ) {
        this.state.slots.push('10AM', '11AM', '12PM', '01PM', '02PM', '03PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 6 &&
        starttime.substring(0, 2) === '11'
      ) {
        this.state.slots.push('11AM', '12PM', '01PM', '02PM', '03PM', '04PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 6 &&
        starttime.substring(0, 2) === '12'
      ) {
        this.state.slots.push('12PM', '01PM', '02PM', '03PM', '04PM', '05PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 6 &&
        starttime.substring(0, 2) === '13'
      ) {
        this.state.slots.push('01PM', '02PM', '03PM', '04PM', '05PM', '06PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 6 &&
        starttime.substring(0, 2) === '14'
      ) {
        this.state.slots.push('02PM', '03PM', '04PM', '05PM', '06PM', '07PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 6 &&
        starttime.substring(0, 2) === '15'
      ) {
        this.state.slots.push('03PM', '04PM', '05PM', '06PM', '07PM', '08PM');
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 7 &&
        starttime.substring(0, 2) === '09'
      ) {
        this.state.slots.push(
          '09AM',
          '10AM',
          '11AM',
          '12PM',
          '01PM',
          '02PM',
          '03PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 7 &&
        starttime.substring(0, 2) === '10'
      ) {
        this.state.slots.push(
          '10AM',
          '11AM',
          '12PM',
          '01PM',
          '02PM',
          '03PM',
          '04PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 7 &&
        starttime.substring(0, 2) === '11'
      ) {
        this.state.slots.push(
          '11AM',
          '12PM',
          '01PM',
          '02PM',
          '03PM',
          '04PM',
          '05PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 7 &&
        starttime.substring(0, 2) === '12'
      ) {
        this.state.slots.push(
          '12PM',
          '01PM',
          '02PM',
          '03PM',
          '04PM',
          '05PM',
          '06PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 7 &&
        starttime.substring(0, 2) === '13'
      ) {
        this.state.slots.push(
          '01PM',
          '02PM',
          '03PM',
          '04PM',
          '05PM',
          '06PM',
          '07PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 7 &&
        starttime.substring(0, 2) === '14'
      ) {
        this.state.slots.push(
          '02PM',
          '03PM',
          '04PM',
          '05PM',
          '06PM',
          '07PM',
          '08PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 8 &&
        starttime.substring(0, 2) === '09'
      ) {
        this.state.slots.push(
          '09AM',
          '10AM',
          '11AM',
          '12PM',
          '01PM',
          '02PM',
          '03PM',
          '04PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 8 &&
        starttime.substring(0, 2) === '10'
      ) {
        this.state.slots.push(
          '10AM',
          '11AM',
          '12PM',
          '01PM',
          '02PM',
          '03PM',
          '04PM',
          '05PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 8 &&
        starttime.substring(0, 2) === '11'
      ) {
        this.state.slots.push(
          '11AM',
          '12PM',
          '01PM',
          '02PM',
          '03PM',
          '04PM',
          '05PM',
          '06PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 8 &&
        starttime.substring(0, 2) === '12'
      ) {
        this.state.slots.push(
          '12PM',
          '01PM',
          '02PM',
          '03PM',
          '04PM',
          '05PM',
          '06PM',
          '07PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 8 &&
        starttime.substring(0, 2) === '13'
      ) {
        this.state.slots.push(
          '01PM',
          '02PM',
          '03PM',
          '04PM',
          '05PM',
          '06PM',
          '07PM',
          '08PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 9 &&
        starttime.substring(0, 2) === '11'
      ) {
        this.state.slots.push(
          '11AM',
          '12PM',
          '01PM',
          '02PM',
          '03PM',
          '04PM',
          '05PM',
          '06PM',
          '07PM'
        );
      } else if (
        endtime.substring(0, 2) - starttime.substring(0, 2) === 9 &&
        starttime.substring(0, 2) === '12'
      ) {
        this.state.slots.push(
          '12PM',
          '01PM',
          '02PM',
          '03PM',
          '04PM',
          '05PM',
          '06PM',
          '07PM',
          '08PM'
        );
      }
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
        if (res.data.code === 101) {
          this.setState({ timeErrorMessage: res.data.error });
        }
        if (res.data.code === 0) {
          this.setState({ bookprice: res.data.price });
        }

        this.props.detailsfun(this.state.bookprice);
        this.props.testtoreceipt(
          this.state.roomtype,
          this.state.amountofpeople,
          this.state.slots,
          formatDate(this.props.startdate),
          this.state.payment,
          this.state.roomId,
          this.state.packageCode
        );
        this.props.showPayment();
      });
    // .catch(err => console.log(err));
  };
  render() {
    const settings = {
      customPaging: function(i) {
        return (
          <Container className="bookdetails ">
            <Row>
              <Col sm={6}>
                <a href="/">
                  <img
                    alt="img1"
                    src={require(`./img0${i + 1}.png`)}
                    style={{ width: '70px', height: '70px' }}
                  />
                </a>
              </Col>
            </Row>
          </Container>
        );
      },

      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Container className="roomsdetails">
          <Row className="m-auto">
            <Col className="m-auto pl-4" md={5} sm={12}>
              <Slider {...settings}>
                <div>
                  <img
                    src={require('./img01.png')}
                    className="img-fluid"
                    alt="img"
                  />
                </div>

                <div>
                  <img
                    src={require('./img02.png')}
                    className="img-fluid"
                    alt="img1"
                  />
                </div>

                <div>
                  <img
                    src={require('./img03.png')}
                    className="img-fluid"
                    alt="img2"
                  />
                </div>

                <div>
                  <img
                    src={require('./img04.png')}
                    className="img-fluid"
                    alt="img3"
                  />
                </div>
              </Slider>
            </Col>
            <Col className="m-auto" md={7} sm={12}>
              {/* <Rooms
                showPayment={this.props.showPayment}
                // startDate={this.props.startDate}
                startdate={this.props.startdate}
                startTime={this.props.startTime}
                endTime={this.props.endTime}
                roomId={this.props.roomId}
              /> */}
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
                          clockIcon={null}
                          disableClock={true}
                          maxDetail="hour"
                        />
                        {this.state.timeErrorMessage}
                      </div>
                    </Col>

                    <Col sm={12} md={6} className="label">
                      <p> END TIME</p>
                      <div className="monthdrop">
                        <TimePicker
                          onChange={this.onChangeEndTime}
                          value={endtime}
                          disableClock={true}
                          clockIcon={null}
                          maxDetail="hour"
                        />
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
                          max="10"
                        />
                      </div>
                      <p style={{ color: '#ed1c24' }}> {this.state.warn}</p>
                      <p style={{ fontSize: '13px', color: 'gray' }}>
                        number of people must be in range from 1 to 16
                      </p>
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
                  {this.state.timeErrorMessage ? (
                    <p>{this.state.timeErrorMessage}</p>
                  ) : null}
                </Form>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(BookDetails));
