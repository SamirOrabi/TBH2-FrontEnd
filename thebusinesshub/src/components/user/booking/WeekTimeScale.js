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
export default class WeekTimeScale extends Component {
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
          ResourceId: i + 1
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
  render() {
    return (
      <div>
        <ScheduleComponent
          cssClass="virtual-scrolling"
          ref={schedule => (this.scheduleObj = schedule)}
          width="100%"
          height="auto"
          selectedDate={new Date()}
          eventSettings={{ dataSource: this.data }}
          group={{ resources: ['Rooms'] }}
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
            <ViewDirective option="TimelineWeek" allowVirtualScrolling={true} />
          </ViewsDirective>
          <Inject
            services={[Agenda, Week, TimelineViews, Resize, DragAndDrop]}
          />
        </ScheduleComponent>{' '}
        <div className="booknowbtn">
          <button onClick={this.OpenDetails}>BOOK NOW</button>
        </div>
      </div>
    );
  }
}
