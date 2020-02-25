import * as ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
export default class DayTimeScale extends Component {
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
    let colors = [];
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
  onPopupOpen(args) {
    args.cancel = true;
  }

  OpenDetails = e => {
    console.log('jsns');
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <ScheduleComponent
          // cssClass="virtual-scrolling"
          width="100%"
          height="auto"
          selectedDate={new Date()}
          eventSettings={{ dataSource: this.data }}
          group={{ resources: ['Rooms'] }}
          popupOpen={this.onPopupOpen.bind(this)}
          onClick={this.OpenDetails}
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
            ></ResourceDirective>
          </ResourcesDirective>
          <ViewsDirective>
            <ViewDirective option="TimelineDay" allowVirtualScrolling={true} />
          </ViewsDirective>
          <Inject
            services={[Agenda, Day, TimelineViews, Resize, DragAndDrop]}
          />
        </ScheduleComponent>
        <div className="booknowbtn">
          <button onClick={this.OpenDetails}>BOOK NOW</button>
        </div>
      </div>
    );
  }
}
