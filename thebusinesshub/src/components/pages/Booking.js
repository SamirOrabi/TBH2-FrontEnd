import React, { Component } from 'react';
import VerifyBarAlert from '../sections/VerifyBarAlert';
import { Button } from 'react-bootstrap';
import Bookingmodal from '../user/booking/Bookingmodal';
export default class Booking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookingmodalShow: false,}
    }

    closebookModal=e=>{
      this.setState({bookingmodalShow:!this.state.bookingmodalShow})
      console.log(' booking modall')
     }
  render() {
    return (
      <div>
        <VerifyBarAlert />
        <Button  onClick={this.closebookModal}>book now</Button>

        <Bookingmodal show={this.state.bookingmodalShow} onHide={this.bookingmodalShow}  />
      </div>
    );
  }
}
