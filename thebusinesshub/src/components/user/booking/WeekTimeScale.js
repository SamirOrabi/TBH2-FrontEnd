import React, { Component } from 'react';
import Bookingmodal from '../booking/Bookingmodal';
import '../../stylesheets/bookingsCss.css';

import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Resize,
  DragAndDrop,
  Inject,
  Week,
  TimelineViews,
  Agenda
} from '@syncfusion/ej2-react-schedule';
import { formatDate } from 'react-day-picker/moment';
import moment from 'moment';
import axios from 'axios';
let startdate;
let tbhdata;
let tbhstatus;
let cellcolor;
export default class DayTimeScale extends Component {
  constructor() {
    super();
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
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/bookings/showcalendar', {
        BookingDate: {
          from: formatDate(new Date()),
          to: '05/20/2027'
        }
      })
      .then(res => {
        if (res.data.bookings) {
          this.setState({ TBHAllBooks: res.data.bookings });
          this.setState({
            tbhdata: this.state.TBHAllBooks.map((book, i) => ({
              Id: i,
              Subject: '',
              // StartTime: new Date(book.year, book.month, book.day, String(book.slot.substring(0,1))),
              StartTime: new Date(
                book.year,
                3,
                book.day,
                // String(book.slot.substring(0, 1))
                9
              ),
              EndTime: new Date(
                book.year,
                3,
                book.day + 6,
                11
                // String(book.slot.substring(0, 1))
              ),
              ResourceId: 2,
              status: book.status
            }))
          });

          console.log(tbhdata);
        }
      });
  }
  generateResourceData(startId, endId, text) {
    let data = [];
    for (let a = startId; a <= endId; a++) {
      data.push({
        Id: a,
        Text: text + ' ' + a,
        Color: cellcolor
      });
    }
    return data;
  }
  OpenDetails = e => {
    e.cancel = true;
    console.log(e);
    this.setState({ bookingmodalShow: !this.state.bookingmodalShow });
    startdate =
      String(
        document.getElementsByClassName('e-toolbar-item e-date-range')[0]
          .innerText
      ).substring(
        0,
        String(
          document.getElementsByClassName('e-toolbar-item e-date-range')[0]
            .innerText
        ).indexOf('-')
      ) +
      String(
        document.getElementsByClassName('e-toolbar-item e-date-range')[0]
          .innerText
      ).substring( String(
        document.getElementsByClassName('e-toolbar-item e-date-range')[0]
          .innerText
      ).indexOf(','), 23);
    console.log(startdate);
    if (e.data) {
      this.setState({
        startTime: e.data.startTime,
        roomId: e.data.ResourceId,
        endDate: e.data.endTime
      });
    }
  };

  closebookModal = e => {
    this.setState({ bookingmodalShow: !this.state.bookingmodalShow });
  };
  render() {
    tbhdata = this.state.tbhdata;
    tbhdata.map(status => {
      if (status.status === 'Busy') {
        cellcolor = '#ed1c24';
      } else if (status.status === ' Pending') {
        cellcolor = '#D2D0D0';
      }
    });

    return (
      <div>
        <ScheduleComponent
          width="100%"
          height="auto"
          eventSettings={{ dataSource: tbhdata }}
          group={{ resources: ['Resources'] }}
          startHour="09:00"
          endHour="22:00"
          locale="en-US"
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
              option="TimelineWeek"
            />
          </ViewsDirective>
          <Inject
            services={[Agenda, Week, TimelineViews, Resize, DragAndDrop]}
          />{' '}
        </ScheduleComponent>
        <div className="booknowbtn">
          <button onClick={this.OpenDetails}>BOOK NOW</button>
        </div>
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
