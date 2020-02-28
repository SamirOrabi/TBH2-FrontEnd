import * as ReactDOM from 'react-dom';
import React, { Component } from 'react';
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
import Bookingmodal from './Bookingmodal';
export default class WeekTimeScale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingmodalShow: false
    };
  }
  OpenDetails = e => {
    e.cancel = true;
    this.setState({ bookingmodalShow: !this.state.bookingmodalShow });
  };
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
          random += Math.max.apply(null, randomCollection) + 10;
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
        Text: text + ' ' + a,
        Color: colors[n]
      });
    }
    return data;
  }
  closebookModal = e => {
    this.setState({ bookingmodalShow: !this.state.bookingmodalShow });
  };
  render() {
    return (
      <div>
        <ScheduleComponent
          cssClass="virtual-scrolling"
          ref={schedule => (this.scheduleObj = schedule)}
          width="100%"
          height="auto"
          selectedDate={new Date()}
          eventSettings={{
            dataSource: this.generateStaticEvents(new Date(2018, 4, 1), 300, 12)
          }}
          quickInfoOnSelectionEnd={true}
          group={{ resources: ['Rooms'] }}
          popupOpen={this.OpenDetails}
          startHour="09:00"
          endHour="22:00"
          enablePersistence={true}
          locale="en-US"
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
              popupOpen={this.OpenDetails}
            ></ResourceDirective>
          </ResourcesDirective>
          <ViewsDirective>
            <ViewDirective option="TimelineWeek" allowVirtualScrolling={true} />
          </ViewsDirective>
          <Inject
            services={[Agenda, Week, TimelineViews, Resize, DragAndDrop]}
          />
        </ScheduleComponent>{' '}
        <div className="booknowbtn">
          <button onClick={this.OpenDetails}>BOOK NOW</button>
        </div>
        <Bookingmodal
          show={this.state.bookingmodalShow}
          closebookModal={this.closebookModal}
        />
      </div>
    );
  }
}
