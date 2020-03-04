import React, { Component } from 'react';
import VerifyBarAlert from '../sections/VerifyBarAlert';
import CreateEvent from '../user/events/CreateEvent';

export default class Contact extends Component {
  render() {
    return (
      <div>
        <VerifyBarAlert />
        <CreateEvent/>
      </div>
    );
  }
}
