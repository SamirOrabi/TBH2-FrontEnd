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
      starttime: ''
    };
  }

  render() {
    startTimee = this.props.startTime;
    console.log(startTimee);

    return (
      <Container className="roomdetails">
        <Form>
          <Row>
            <Col sm={12} md={6}>
              <p> START DATE</p>
              <div className="monthdrop">
                <DayPickerInput
                  className="DayPickerInput"
                  value={this.props.startDate}
                  onDayChange={day => console.log(day)}
                />
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col sm={12} md={6}>
              <p> START TIME</p>
              <div className="monthdrop">
                <TimePicker
                  onChange={this.onChangeStartTime}
                  value={startTimee}
                />
              </div>
            </Col>

            <Col sm={12} md={6}>
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
            <Col sm={12} md={6}>
              <p> Room Type</p>
              <div className="roomtypedrop">
                <select name="month">
                  <option>Room Type</option>
                </select>
              </div>
            </Col>

            <Col sm={12} md={6}>
              <p>Number of people</p>
              <div className="monthdrop">
                <FormControl
                  style={{ height: '60px', margin: '0px' }}
                  className="startTime"
                  type="number"
                  name="startTime"
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
              {/* <Payment/> */}
            </Button>
          </Col>
        </Form>
      </Container>
    );
  }
}
