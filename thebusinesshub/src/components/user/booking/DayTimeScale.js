import * as ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Bookingmodal from '../booking/Bookingmodal';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Resize,
  DragAndDrop,
  Inject,
  Day,
  TimelineViews,
  Agenda
} from '@syncfusion/ej2-react-schedule';
import { L10n } from '@syncfusion/ej2-base';
let startdate;

// L10n.load({
//   'en-US': {
//     newEvent: 'BOOK'
//   }
// });
export default class DayTimeScale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingmodalShow: false,
      endDate: '',
      startTime: '',
      roomId: ''
    };
  }
  generateStaticEvents(start, resCount, overlapCount) {
    let data = [];
    let id = 1;
    for (let i = 0; i < resCount; i++) {
      let randomCollection = [];
      let random = 0;
      for (let j = 0; j < overlapCount; j++) {
        random = Math.floor(Math.random() * 30);
        random = random === 0 ? 1 : random;
        if (
          randomCollection.indexOf(random) !== -1 ||
          randomCollection.indexOf(random + 2) !== -1 ||
          randomCollection.indexOf(random - 2) !== -1
        ) {
          random += Math.max.apply(null, randomCollection) + 5;
        }
        for (let k = 1; k <= 2; k++) {
          randomCollection.push(random + k);
        }
        let startDate = new Date(start.getFullYear(), start.getMonth(), random);
        startDate = new Date(
          startDate.getTime() + (random % 10) * 10 * (1000 * 60)
        );
        let endDate = new Date(startDate.getTime() + (1440 + 30) * (1000 * 60));
        data.push({
          Id: id,
          Subject: 'Event #' + id,
          StartTime: startDate,
          EndTime: endDate,
          IsAllDay: id % 10 ? false : true,
          RoomId: i + 1
        });
        id++;
      }
    }
    return data;
  }
  generateResourceData(startId, endId, text) {
    let data = [];
    let colors = [
      '#ff8787',
      '#9775fa',
      '#748ffc',
      '#3bc9db',
      '#69db7c',
      '#fdd835',
      '#748ffc',
      '#9775fa',
      '#df5286',
      '#7fa900',
      '#fec200',
      '#5978ee',
      '#00bdae',
      '#ea80fc'
    ];
    for (let a = startId; a <= endId; a++) {
      let n = Math.floor(Math.random() * colors.length);
      data.push({
        Id: a,
        Text: text + '' + a,
        // color: '#ed1c24'
        Color: colors[n]
      });
    }
    return data;
  }

  OpenDetails = e => {
    e.cancel = true;
    console.log(e);
    this.setState({ bookingmodalShow: !this.state.bookingmodalShow });
    startdate = document.getElementsByClassName(
      'e-toolbar-item e-date-range'
    )[0].innerText;
    console.log(startdate);
    if (e.data) {
      this.setState({
        startTime: e.data.startTime,
        roomId: e.data.RoomId,
        endDate: e.data.endTime
      });
      console.log(e.target);
      //       if(e.target.className='e-work-cells e-work-hours e-selected-cell'){
      //       }
    }
  };

  closebookModal = e => {
    this.setState({ bookingmodalShow: !this.state.bookingmodalShow });
  };
 
  render() {
    console.log(this);
    return (
      <div>
        {' '}
        {/* <Button
          id="btn1"
          title="Click to open Editor"
          onClick={this.onClickButton1.bind(this)}
        >
          Click to open Editor
        </Button> */}
        <ScheduleComponent
          // cssClass="virtual-scrolling"
          ref={t => (this.scheduleObj = t)}
          width="100%"
          height="100%"
          eventSettings={{
            dataSource: this.generateStaticEvents(new Date(2018, 4, 1), 300, 12)
          }}
          group={{ resources: ['Rooms'] }}
          popupOpen={this.OpenDetails}
          startHour="09:00"
          endHour="22:00"
          locale="en-US"
          enablePersistence={true}
          // dateFormat='yyyy-MM-dd'
          quickInfoOnSelectionEnd={true}
          timeScale={{
            interval: 120,
            slotCount: 2
          }}
          eventSettingsTemplate={{ color: '#eee' }}
          minDate={new Date()}
          eventRendered="OnEventRendered"
        >
          <ResourcesDirective>
            <ResourceDirective
              field="RoomId"
              title="Room"
              name="Rooms"
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
          <Inject
            services={[Agenda, Day, TimelineViews, Resize, DragAndDrop]}
          />
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
