import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import '../../stylesheets/RoomsCSS.css';
import TimePicker from 'react-time-picker';

// import Payment from '../booking/Payment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
let startTimee;
export default class Rooms extends Component {
 

  constructor(props) {
    super(props);
    this.state = {
      endtime: '',
      starttime: '',
      roomtype:'',
      payment:''
    };
  }


  OnChangeRoomtype = e => {
    this.setState({
      roomtype: e.target.value,
    });
    console.log(this.state.roomtype)
  };



  
  OnChangepayment = e => {
    this.setState({
      payment: e.target.value,
    });
    console.log(this.state.payment)
  };
  render() {
    startTimee = this.props.startTime;
    console.log(startTimee);

    return (
      <Container className="roomdetails">
        <Form>
          <Row>
            <Col sm={12} md={6} className="label">
              <p> START DATE</p>
              <div className="monthdrop">
                <DayPickerInput 
                  className="DayPickerInput"
                  value={this.props.startDate}
                  onDayChange={day => console.log(day)}
                />
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
                  <option name="vodafonecash" value="vodafone cash">
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
                  value={startTimee}
                />
              </div>
            </Col>

            <Col sm={12} md={6} className="label">
              <p> END TIME</p>
              <div className="monthdrop">
                <TimePicker
                  onChange={time => {
                    this.setState({ starttime: time });
                    startTimee = this.state.starttime;
                  }}
                  value={this.props.endTime}
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
                  <option name="meetingRoom" value="Meeting Room">
                    {' '}
                    Meeting Room{' '}
                  </option>
                  <option name="TrainingRoom" value="Training Room">
                    {' '}
                    Training Room{' '}
                  </option>

                  <option name="PrivateRoom" value="Private Room">
                    {' '}
                    Private Room{' '}
                  </option>

                  <option name=" virtualOffice" value="virtual Office">
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
                  name="startTime"
                  // step="1"
                  min="1" max="20"
                />
              </div>
            </Col>
          </Row>

          <Col sm={12} className="text-right">
            <Button
              type="submit"
              className="my-4 nextBtn"
              onClick={this.props.showPayment}
            >
              NEXT
            </Button>
          </Col>
        </Form>
      </Container>
    );
  }
}
