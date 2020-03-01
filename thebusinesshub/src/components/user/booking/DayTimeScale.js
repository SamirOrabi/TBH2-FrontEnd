// //         // elements[i].style ...
// //         // allcell[i].classList.add('bgcolooor');
// //         // allcell[i].style.background = 'red';

// //         // allcell[i].style['background-color'] = '#000';

// //         for (var c = 0, len = this.state.tbhCalendar.length; c < len; c++) {
// //           this.setState({ tbhdays: this.state.tbhCalendar[c].day });
// //           this.setState({ tbhmonths: this.state.tbhCalendar[c].month });
// //           this.setState({ tbhyears: this.state.tbhCalendar[c].year });
// //         }

// //         const allcell = document.getElementsByClassName('e-work-cells');
// //         for (var i = 0, len = allcell.length; i < len; i++) {
// //           this.setState({
// //             eachcelldate: moment(Number(allcell[i].getAttribute('data-date')))
// //               ._d
// //           });
// //           this.setState({
// //             eachcellslot: String(this.state.eachcelldate).substring(16, 18)
// //           });
// //           this.setState({
// //             eachcellday: String(this.state.eachcelldate).substring(8, 10)
// //           });

// //           this.setState({
// //             eachcellyear: String(this.state.eachcelldate).substring(11, 15)
// //           });

// //           this.setState({
// //             eachcellmonth: String(this.state.eachcelldate).substring(4)
// //   OpenDetails = e => {
// //       const test = Number(e.target.getAttribute('data-date'));
// //       // const test2 =;
// //       const test2 = moment(test);
// //       const allcell = document.getElementsByClassName('e-work-cells');

// //       // var elements = document.getElementsByClassName("class-1");
// //       for (var i = 0, len = allcell.length; i < len; i++) {
// //         // elements[i].style ...
// //         allcell[i].classList.add('bgcolooor');
// //         // allcell[i].style.background = 'red';

// //         allcell[i].style['background-color'] = '#000';
// //         // if (allcell[i].getAttribute('data-date') === '1590822000000') {
// //         //   allcell[i].classList.add('bgcolooor');

// //         //             allcell[i].classList.add('bgcolooor');

// //         // }
// //       }

// //       this.setState({ allcells: allcell });

// //       // if (formatDate(test2._d) === '05/30/2020') {
// //       //   allcell[5].style.backgroundColor = 'red';

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
          console.log(res.data.bookings);
          this.setState({
            tbhdata: res.data.bookings.map((book, i) => ({
              Id: i,
              Subject: 'BOOKED',
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
              ResourceId: Number(book.roomNumber)
              // status: book.status,
              // color: cellcolor
            }))
          });

          console.log(this.state.tbhdata);
        }
      })
      .catch(err => console.log(err));
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
                Subject: 'BOOKED',
                StartTime: new Date(
                  book.year,
                  this.convertMonthNameToNumber(book.month),
                  book.day,
                  (String(book.slot).includes('PM')&& String(book.slot.substring(0, 2))!=='12')
                  ? Number(String(book.slot.substring(0, 2))) + 12
                    : Number(String(book.slot.substring(0, 2)))
                ),
                EndTime: new Date(
                  book.year,
                  this.convertMonthNameToNumber(book.month),
                  book.day,
                  (String(book.slot).includes('PM')&& String(book.slot.substring(0, 2))!=='12')
                  ? Number(String(book.slot.substring(0, 2))) + 13
                    : Number(String(book.slot.substring(0, 2))) + 1
                ),
                ResourceId: Number(book.roomNumber)
                // status: book.status,
                // color: cellcolor
              }))
            });
          }
        })
        .catch(err => console.log(err));
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
    // finaltbhdata = this.state.tbhdata;
    // finaltbhdata.map((status, i) => {
    //   if (
    //     finaltbhdata[i].status.includes('Pending') &&
    //     finaltbhdata[i].Id === i
    //   ) {
    //     finaltbhdata[i].color = '#D2D0D0';
    //     cellcolor = finaltbhdata[i].color;
    //     console.log('hahahahah');
    //   }

    //   if (finaltbhdata[i].status.includes('Busy') && finaltbhdata[i].Id === i) {
    //     finaltbhdata[i].color = '#ed1c24';
    //     cellcolor = finaltbhdata[i].color;
    //   }
    // });

    // console.log(finaltbhdata);

    // for (var i = 0, len = tbhdata.length; i < len; i++) {
    //   console.log(tbhdata[0].status);
    //   if (tbhdata[i].status === 'Pending') {
    //     cellcolor = '#D2D0D0';
    //   } else if (tbhdata[i].status === 'Busy') {
    //     cellcolor = '#ed1c24';
    //   } else {
    //     cellcolor = '#fff';
    //   }
    // }
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
          // quickInfoOnSelectionEnd={true}
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
            <div className="redColor"></div>
            <div className="grayColor"></div>
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
