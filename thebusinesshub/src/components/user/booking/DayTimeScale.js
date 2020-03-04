import * as ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Bookingmodal from '../booking/Bookingmodal';
import '../../stylesheets/bookingsCss.css';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  TimelineViews,
  Day,
  Resize,
  DragAndDrop,
  Inject
} from '@syncfusion/ej2-react-schedule';
import { formatDate } from 'react-day-picker/moment';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import isEqual from 'lodash/isEqual';

let startdate;
let finaltbhdata;
let cellcolor = '#fff';
let color;
export default class DayTimeScale extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      TBHAllBooks: [],
      bookingmodalShow: false,
      endDate: '',
      startTime: '',
      roomId: '',
      tbhdata: [],
      tbhstatus: []
    };
  }

  componentDidMount() {
    this._isMounted = true;

    this.convertMonthNameToNumber = monthName => {
      var myDate = new Date(monthName + ' 1, 2000');
      var monthDigit = myDate.getMonth();
      return isNaN(monthDigit) ? 0 : monthDigit;
    };
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/bookings/showcalendar', {
        BookingDate: {
          from: formatDate(new Date()),
          to: '05/20/2027'
        }
      })
      .then(res => {
        if (this._isMounted && res.data.bookings) {
          this.setState({
            tbhdata: res.data.bookings.map((book, i) => ({
              Id: i,
              Subject: '-',
              StartTime: new Date(
                book.year,
                this.convertMonthNameToNumber(book.month),
                book.day,
                String(book.slot).includes('PM') &&
                String(book.slot.substring(0, 2)) !== '12'
                  ? Number(String(book.slot.substring(0, 2))) + 12
                  : Number(String(book.slot.substring(0, 2)))
              ),
              EndTime: new Date(
                book.year,
                this.convertMonthNameToNumber(book.month),
                book.day,
                String(book.slot).includes('PM') &&
                String(book.slot.substring(0, 2)) !== '12'
                  ? Number(String(book.slot.substring(0, 2))) + 13
                  : Number(String(book.slot.substring(0, 2))) + 1
              ),
              ResourceId: Number(book.roomNumber),
              // RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=7',

              status: book.status,
              color: cellcolor
            }))
          });
        }
      })
      // .catch(err => console.log(err));
  }

  componentDidUpdate(nextProps, prevState) {
    if (!isEqual(prevState, this.state)) {
      this.convertMonthNameToNumber = monthName => {
        var myDate = new Date(monthName + ' 1, 2000');
        var monthDigit = myDate.getMonth();
        return isNaN(monthDigit) ? 0 : monthDigit;
      };
      axios.defaults.headers.common['authorization'] = localStorage.userToken;
      axios
        .post('https://cubexs.net/tbhapp/bookings/showcalendar', {
          BookingDate: {
            from: formatDate(new Date()),
            to: '05/20/2027'
          }
        })
        .then(res => {
          if (this._isMounted && res.data.bookings) {
            this.setState({
              tbhdata: res.data.bookings.map((book, i) => ({
                Id: i,
                Subject: '-',
                StartTime: new Date(
                  book.year,
                  this.convertMonthNameToNumber(book.month),
                  book.day,
                  String(book.slot).includes('PM') &&
                  String(book.slot.substring(0, 2)) !== '12'
                    ? Number(String(book.slot.substring(0, 2))) + 12
                    : Number(String(book.slot.substring(0, 2)))
                ),
                EndTime: new Date(
                  book.year,
                  this.convertMonthNameToNumber(book.month),
                  book.day,
                  String(book.slot).includes('PM') &&
                  String(book.slot.substring(0, 2)) !== '12'
                    ? Number(String(book.slot.substring(0, 2))) + 13
                    : Number(String(book.slot.substring(0, 2))) + 1
                ),
                ResourceId: Number(book.roomNumber),

                status: book.status,
                color: cellcolor
              }))
            });
          }
        })
        // .catch(err => console.log(err));
    }
  }

  generateResourceData(startId, endId, text) {
    let data = [];

    for (let a = startId; a <= endId; a++) {
      data.push({
        Id: a,
        Text: text + ' ' + a,
        // Color: cellcolor
        Color: '#ed1c24'
      });
    }
    return data;
  }

  closebookModal = e => {
    this.setState({ bookingmodalShow: !this.state.bookingmodalShow });
  };
  OpenDetails = e => {
    e.cancel = true;
    this.setState({ bookingmodalShow: !this.state.bookingmodalShow });
    startdate = document.getElementsByClassName(
      'e-toolbar-item e-date-range'
    )[0].innerText;
    if (e.data) {
      this.setState({
        startTime: e.data.startTime,
        roomId: e.data.ResourceId,
        endDate: e.data.endTime
      });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    this.state.tbhdata.map((status, i) => {
      if ((this.state.tbhdata[i].status = 'Busy')) {
        this.state.tbhdata[i].color = '#ed1c24';
        cellcolor = '#ed1c24';
      }
      if ((this.state.tbhdata[i].status = 'Pending')) {
        this.state.tbhdata[i].color = '#D2D0D0';
        cellcolor = '#D2D0D0';
      }
    });

    // this.state.tbhdata.map((status, i) => (
    //   this.state.tbhdata[i].status === 'Busy' || this.state.tbhdata[i].status === 'Pending'  ?
    //    cellcolor= this.state.tbhdata[i].color
    //   :null

    // ));

    return (
      <div>
        <ScheduleComponent
          width="100%"
          height="auto"
          eventSettings={{ dataSource: this.state.tbhdata }}
          group={{ resources: ['Resources'] }}
          startHour="09:00"
          endHour="22:00"
          workHours={{
            start: '09:00',
            end: '21:00'
          }}
          popupOpen={this.OpenDetails}
          quickInfoOnSelectionEnd={true}
          timeScale={{
            interval: 120,
            slotCount: 2
          }}
          minDate={new Date()}
        >
          <ResourcesDirective>
            <ResourceDirective
              field="ResourceId"
              title="Resource"
              name="Resources"
              allowMultiple={true}
              dataSource={this.generateResourceData(1, 4, 'Room')}
              textField="Text"
              idField="Id"
              colorField="Color"
            ></ResourceDirective>
          </ResourcesDirective>
          <ViewsDirective>
            <ViewDirective
              // isSelected
              option="TimelineDay"
            />
          </ViewsDirective>
          <Inject services={[Day, TimelineViews, Resize, DragAndDrop]} />
        </ScheduleComponent>
        <Row>
          <Col md={4} className="mt-4">
            <Row>
              <Col md={2}>
                {' '}
                <div className="redColor"></div>
              </Col>
              <Col
                md={2}
                className="mt-3 ml-2"
                style={{ color: '#ed1c24', fontWeight: 'bold' }}
              >
                Confirmed
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                {' '}
                <div className="grayColor"></div>
              </Col>
              <Col
                md={2}
                className="mt-3 ml-2"
                style={{ color: '#D2D0D0', fontWeight: 'bold' }}
              >
                Pending
              </Col>
            </Row>
          </Col>
          <Col md="4"></Col>
          <Col md={4}>
            <div className="booknowbtn text-right">
              <button onClick={this.OpenDetails}>BOOK NOW</button>
            </div>
          </Col>
        </Row>

        <Bookingmodal
          show={this.state.bookingmodalShow}
          onHide={this.bookingmodalShow}
          startTime={this.state.startTime}
          startdate={startdate}
          roomId={this.state.roomId}
          endDate={this.state.endDate}
          closebookModal={this.closebookModal}
        />
      </div>
    );
  }
}
// ReactDOM.render(<DayTimeScale />, document.getElementById('schedule'));
