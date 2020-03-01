import React, { Component } from 'react';
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FormControl
} from 'react-bootstrap';
import img from '../../../Images/img.png';
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
let finalstarttime;
class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '2',
      finalDate: '',
      roomtype: 'meeting room',
      payment: 'cash',
      amountofpeople: '2',
      slots: [],
      bookprice: '',
      startdate: formatDate(this.props.startdate),
      
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
    this.setState({ amountofpeople: e.target.value });
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
        console.log(res)
        if (res.data.code === 0) {
          this.setState({ bookprice: res.data.price });
          console.log('price')
          console.log(res.data.price)
        }

        this.props.detailsfun(this.state.bookprice);
        this.props.testtoreceipt(
          this.state.roomtype,
          this.state.amountofpeople,
          this.state.slots,
          formatDate(this.props.startdate),
          this.state.payment,
          this.state.roomId
        );
        this.props.showPayment();
      })
      .catch(err => console.log(err));
  };
  render() {
    console.log('startdate ')
    console.log((this.props.startdate))
    const settings = {
      customPaging: function(i) {
        return (
          <Container className="bookdetails ">
            <Row>
              <Col sm={6}>
                <a>
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
    console.log(this.props.endTime);
    return (
      <div>
        <Container>
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
                        />
                      </div>
                    </Col>

                    <Col sm={12} md={6} className="label">
                      <p> END TIME</p>
                      <div className="monthdrop">
                        <TimePicker
                          onChange={this.onChangeEndTime}
                          value={endtime}
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

                          <option name="private room" value="private room">
                            {' '}
                            Private Room
                          </option>

                          <option
                            name=" virtual office"
                            value=" virtual office"
                          >
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
