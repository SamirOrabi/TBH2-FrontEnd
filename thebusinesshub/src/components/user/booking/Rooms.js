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

import MomentLocaleUtils, { formatDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
let starttime;
let endtime;
export default class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    starttime = this.props.startTime;
    endtime = this.props.endTime;
    console.log(starttime);
    this.onChangeStartTime = time => {
      starttime = time;
      console.log(starttime);
    };

    this.onChangeEndTime = time => {
      endtime = time;
      console.log(endtime);
    };
    return (
      <Container className="roomdetails">
        <Form>
          <Row>
            <Col sm={12} md={6}>
              <p> START DATE</p>
              <div className="monthdrop">
                <DayPickerInput
                  className="DayPickerInput"
                  formatDate={formatDate}
                  value={formatDate(this.props.startDate)}
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
                  value={starttime}
                />
              </div>
            </Col>

            <Col sm={12} md={6}>
              <p> END TIME</p>
              <div className="monthdrop">
                <TimePicker onChange={this.onChangeEndTime} value={endtime} />
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col sm={12} md={6}>
              <p> Room Type</p>
              <div className="roomtypedrop">
                <select
                  className="browser-default"
                  value=""
                  onChange=""
                  name="roomtype"
                >
                  <option selected disabled>
                    roomtype
                  </option>
                  <option name="meetingRoom" value="meetingRoom">
                    {' '}
                    Meeting Room{' '}
                  </option>
                  <option name="TrainingRoom" value="TrainingRoom">
                    {' '}
                    Training Room{' '}
                  </option>

                  <option name="PrivateRoom" value="PrivateRoom">
                    {' '}
                    Private Room
                  </option>
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
            </Button>
          </Col>
        </Form>
      </Container>
    );
  }
}
