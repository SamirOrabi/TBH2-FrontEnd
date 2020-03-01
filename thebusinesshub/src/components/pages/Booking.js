import React, { Component } from 'react';
import VerifyBarAlert from '../sections/VerifyBarAlert';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DayTimeScale from '../user/booking/DayTimeScale';
import WeekTimeScale from '../user/booking/WeekTimeScale';

export default class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateInput: '',
      showdaycomponent: true,
      showweekcomponent: false,
      daycolor: '#ed1c24',
      dayborder: '5px solid #ed1c24',
      weekcolor: '#000',
      weekborder: 'none'
    };
  }

  DayComponent = e => {
    this.setState({
      showdaycomponent: true,
      showweekcomponent: false,
      weekborder: 'none',
      weekcolor: '#000',
      daycolor: '#ed1c24',
      dayborder: '5px solid #ed1c24'
    });
  };
  WeekComponent = e => {
    this.setState({
      showweekcomponent: true,
      showdaycomponent: false,
      dayborder: 'none',
      daycolor: '#000',
      weekcolor: '#ed1c24',
      weekborder: '5px solid #ed1c24'
    });
  };
  handleChangedate = value => {
    this.setState({ dateInput: value });
  };

  render() {
    return (
      <div className="bookingpage">
        {' '}
        <VerifyBarAlert />
        <Container>
          <Row className="mb-4">
            <Col sm={12} md={6}>
              {/* <h2 className="pt-5">{this.state.dateInput}</h2> */}
            </Col>
            <Col sm={12} md={6}>
              <Row>
                <Col sm={4}>
                  {/* <Form.Label className="pl-3" style={{ color: '#ed1c24' }}>
                    DATE
                  </Form.Label>
                  <div className="deadlineInput">
                    <ReactDatez
                      placeholder="DATE"
                      name="dateInput"
                      handleChange={this.handleChangedate}
                      value={this.state.dateInput}
                    />
                  </div> */}
                </Col>
                <Col sm={3}></Col>
                <Col sm={5} className="pt-5 dayweekbuttons pl-3">
                  <Button
                    onClick={this.DayComponent}
                    style={{
                      color: this.state.daycolor,
                      borderLeft: this.state.dayborder
                    }}
                  >
                    DAY
                  </Button>
                  <Button
                    onClick={this.WeekComponent}
                    style={{
                      color: this.state.weekcolor,
                      borderLeft: this.state.weekborder
                    }}
                    className="ml-5"
                  >
                    {' '}
                    WEEK
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          {this.state.showdaycomponent ? <DayTimeScale /> : null}

          {this.state.showweekcomponent ? <WeekTimeScale /> : null}
        </Container>
      </div>
    );
  }
}
