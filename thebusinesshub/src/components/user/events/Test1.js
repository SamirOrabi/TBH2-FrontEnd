import React, { Component } from 'react';

import axios from 'axios';

import Test2 from './EventCard';
class Test1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      show: false,
      myerror: ''
    };
  }
  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios.post('https://cubexs.net/tbhapp/events/showallevents').then(res => {
      this.setState({ events: res.data.events });
      console.log(res);
    });
  }
  render() {
    return this.state.events.map(function(event) {
      return (
        <Test2
          name={event.name}
          dateFrom={event.dateFrom}
          id={event.id}
          dateTo={event.dataTo}
          collaborators={event.collaborators}
          type={event.type}
          state={event.state}
          amountOfPeople={event.amountOfPeople}
          maxNoOfPeople={event.maxNoOfPeople}
        />
      );
    }, this);
  }
}

export default Test1;
