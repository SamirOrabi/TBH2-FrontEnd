// import React, { Component } from 'react';
// import Bookingmodal from '../booking/Bookingmodal';
// import { formatDate } from 'react-day-picker/moment';
// import moment from 'moment';
// import axios from 'axios';
// import '../../stylesheets/bookingsCss.css';

// import {
//   ScheduleComponent,
//   ViewsDirective,
//   ViewDirective,
//   ResourcesDirective,
//   ResourceDirective,
//   Resize,
//   DragAndDrop,
//   Inject,
//   Day,
//   TimelineViews,
//   Agenda
// } from '@syncfusion/ej2-react-schedule';
// import { L10n } from '@syncfusion/ej2-base';
// let startdate;
// let eachslot;
// // L10n.load({
// //   'en-US': {
// //     newEvent: 'BOOK'
// //   }
// // });
// export default class DayTimeScale extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       bookingmodalShow: false,
//       endDate: '',
//       startTime: '',
//       roomId: '',
//       tbhCalendar: [],
//       tbhdays: [],
//       tbmonths: [],
//       tbhyears: [],
//       tbhslots: [],
//       allcells: [],
//       eachcelldate: '',
//       eachcellday: '',
//       eachcellmonth: '',
//       eachcellyear: '',
//       eachcellslot: ''
//     };
//   }
//   generateStaticEvents(start, resCount, overlapCount) {
//     let data = [];
//     let id = 1;
//     for (let i = 0; i < resCount; i++) {
//       let randomCollection = [];
//       let random = 0;
//       for (let j = 0; j < overlapCount; j++) {
//         random = Math.floor(Math.random() * 30);
//         random = random === 0 ? 1 : random;
//         if (
//           randomCollection.indexOf(random) !== -1 ||
//           randomCollection.indexOf(random + 2) !== -1 ||
//           randomCollection.indexOf(random - 2) !== -1
//         ) {
//           random += Math.max.apply(null, randomCollection) + 5;
//         }
//         for (let k = 1; k <= 2; k++) {
//           randomCollection.push(random + k);
//         }
//         let startDate = new Date(start.getFullYear(), start.getMonth(), random);
//         startDate = new Date(
//           startDate.getTime() + (random % 10) * 10 * (1000 * 60)
//         );
//         let endDate = new Date(startDate.getTime() + (1440 + 30) * (1000 * 60));
//         data.push({
//           Id: id,
//           Subject: 'Event #' + id,
//           StartTime: startDate,
//           EndTime: endDate,
//           IsAllDay: id % 10 ? false : true,
//           RoomId: i + 1
//         });
//         id++;
//       }
//     }
//     return data;
//   }
//   generateResourceData(startId, endId, text) {
//     let data = [];
//     let colors = [
//       '#ff8787',
//       '#9775fa',
//       '#748ffc',
//       '#3bc9db',
//       '#69db7c',
//       '#fdd835',
//       '#748ffc',
//       '#9775fa',
//       '#df5286',
//       '#7fa900',
//       '#fec200',
//       '#5978ee',
//       '#00bdae',
//       '#ea80fc'
//     ];
//     for (let a = startId; a <= endId; a++) {
//       let n = Math.floor(Math.random() * colors.length);
//       data.push({
//         Id: a,
//         Text: text + '' + a,
//         // color: '#ed1c24'
//         Color: colors[n]
//       });
//     }
//     return data;
//   }

//   componentDidMount() {
//     axios.defaults.headers.common['authorization'] = localStorage.userToken;
//     axios
//       .post('https://cubexs.net/tbhapp/bookings/showcalendar', {
//         BookingDate: {
//           from: formatDate(new Date()),
//           to: '05/20/2027'
//         }
//       })
//       .then(res => {
//         //day,mounth,year,slot
//         this.setState({ tbhCalendar: res.data.bookings });

//         // elements[i].style ...
//         // allcell[i].classList.add('bgcolooor');
//         // allcell[i].style.background = 'red';

//         // allcell[i].style['background-color'] = '#000';

//         for (var c = 0, len = this.state.tbhCalendar.length; c < len; c++) {
//           this.setState({ tbhdays: this.state.tbhCalendar[c].day });
//           this.setState({ tbhmonths: this.state.tbhCalendar[c].month });
//           this.setState({ tbhyears: this.state.tbhCalendar[c].year });
//           console.log(this.state.tbhyears)
//         }

//         const allcell = document.getElementsByClassName('e-work-cells');
//         for (var i = 0, len = allcell.length; i < len; i++) {
//           this.setState({
//             eachcelldate: moment(Number(allcell[i].getAttribute('data-date')))
//               ._d
//           });
//           this.setState({
//             eachcellslot: String(this.state.eachcelldate).substring(16, 18)
//           });
//           this.setState({
//             eachcellday: String(this.state.eachcelldate).substring(8, 10)
//           });

//           this.setState({
//             eachcellyear: String(this.state.eachcelldate).substring(11, 15)
//           });

//           this.setState({
//             eachcellmonth: String(this.state.eachcelldate).substring(4)
//           });

//           if (this.state.eachcellslot === '09') {
//             eachslot = '9AM';
//           } else if (this.state.eachcellslot === '10') {
//             eachslot = '10AM';
//           } else if (this.state.eachcellslot === '11') {
//             eachslot = '11AM';
//           } else if (this.state.eachcellslot === '12') {
//             eachslot = '12PM';
//           } else if (this.state.eachcellslot === '13') {
//             eachslot = '1PM';
//           } else if (this.state.eachcellslot === '14') {
//             eachslot = '2PM';
//           } else if (this.state.eachcellslot === '15') {
//             eachslot = '3PM';
//           } else if (this.state.eachcellslot === '16') {
//             eachslot = '4PM';
//           } else if (this.state.eachcellslot === '17') {
//             eachslot = '5PM';
//           } else if (this.state.eachcellslot === '18') {
//             eachslot = '6PM';
//           } else if (this.state.eachcellslot === '19') {
//             eachslot = '7PM';
//           } else if (this.state.eachcellslot === '20') {
//             eachslot = '8PM';
//           } else if (this.state.eachcellslot === '21') {
//             eachslot = '9PM';
//           }
//         }
//       });
//   }

//   OpenDetails = e => {
//     e.cancel = true;
//     // console.log(e);
//     // this.setState({ bookingmodalShow: !this.state.bookingmodalShow });
//     startdate = document.getElementsByClassName(
//       'e-toolbar-item e-date-range'
//     )[0].innerText;

//     if (e.data) {
//       this.setState({
//         startTime: e.data.startTime,
//         roomId: e.data.RoomId,
//         endDate: e.data.endTime
//       });

//       // console.log(e.target);
//       const test = Number(e.target.getAttribute('data-date'));
//       // const test2 =;
//       const test2 = moment(test);
//       // console.log(formatDate(test2._d));
//       const allcell = document.getElementsByClassName('e-work-cells');

//       // var elements = document.getElementsByClassName("class-1");
//       for (var i = 0, len = allcell.length; i < len; i++) {
//         // elements[i].style ...
//         allcell[i].classList.add('bgcolooor');
//         // allcell[i].style.background = 'red';

//         allcell[i].style['background-color'] = '#000';
//         // console.log(allcell[i].style['background-color']);
//         // if (allcell[i].getAttribute('data-date') === '1590822000000') {
//         //   allcell[i].classList.add('bgcolooor');
//         //   console.log(allcell[i].className);

//         //             allcell[i].classList.add('bgcolooor');

//         //   console.log('yessssssssssssss');
//         // }
//         // console.log(allcell[i].getAttribute('data-date'));
//       }

//       // console.log('ddd');
//       this.setState({ allcells: allcell });
//       // console.log(this.state.allcells);

//       // if (formatDate(test2._d) === '05/30/2020') {
//       //   console.log('haha');
//       //   allcell[5].style.backgroundColor = 'red';
//       // }
//     }
//   };

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
  Day,
  TimelineViews,
  Agenda
} from '@syncfusion/ej2-react-schedule';
import { formatDate } from 'react-day-picker/moment';
import moment from 'moment';
import axios from 'axios';
let startdate;
let tbhdata;
let finaltbhdata;
let tbhstatus;
let cellcolor;
let slottime;
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
          // this.setState({ TBHAllBooks: res.data.bookings });
          // this.state.TBHAllBooks.map((book,i) =>{
          // console.log(book.slot)
          //   if(book.slot==='9AM'){
          //     slottime='9'
          //   }
          //   else if(book.slot==='10AM'){
          //     slottime='10'
          //   }
          //   else if (book.slot==='11AM'){
          //     slottime='11'
          //   }
          //   else if(book.slot==='12PM'){
          //     slottime='12'
          //   }
          //   else if(book.slot==='1PM'){
          //     slottime='13'
          //   }
          //   else if(book.slot==='2PM'){
          //     slottime='14'
          //   }
          //   else if(book.slot==='3PM'){
          //     slottime='15'
          //   }
          //   else if(book.slot==='4PM'){
          //     slottime='16'
          //   } else if(book.slot==='5PM'){
          //     slottime='17'
          //   } else if(book.slot==='6PM'){
          //     slottime='18'
          //   } else if(book.slot==='7PM'){
          //     slottime='19'
          //   }
          //   else if(book.slot==='8PM'){
          //     slottime='20'
          //   } else if(book.slot==='9PM'){
          //     slottime='21'
          //   }

          //   console.log(slottime)
          // })

          res.data.bookings.map((book, i) => {
            // console.log(String(book.slot).substring(0, 2))
            if (book.slot.includes('PM')) {
              slottime = Number(String(book.slot.substring(0, 1)))+12;
              console.log(slottime);
            }
            else {
              slottime=Number(String(book.slot.substring(0, 1)))
              console.log(slottime) 
            }
          });
          this.setState({
            tbhdata: res.data.bookings.map((book, i) => ({
              Id: i,
              Subject: 'hhhhh',
              // StartTime: new Date(book.year, book.month, book.day, String(book.slot.substring(0,1))),
              StartTime: new Date(
                book.year,
                3,
                book.day,
                // String(book.slot.substring(0, 1))
                11
              ),
              EndTime: new Date(
                book.year,
                3,
                book.day,
                14
                // String(book.slot.substring(0, 1))
              ),
              ResourceId: 2
              // status: book.status
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
        // Color: cellcolor
        Color: '#ed1c24'
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
    // tbhdata.map(status => {
    //   if (status.status === 'Busy') {
    //     cellcolor = '#ed1c24';
    //   } else if (status.status === 'Pending') {
    //     cellcolor = '#D2D0D0';
    //   }
    // });

    return (
      <div>
        <ScheduleComponent
          width="100%"
          height="auto"
          eventSettings={{ dataSource: tbhdata }}
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
          <Inject
            services={[Agenda, Day, TimelineViews, Resize, DragAndDrop]}
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
