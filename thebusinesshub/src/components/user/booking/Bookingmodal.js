import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../../stylesheets/BookingmodelCSS.css';
import DetailsPaymentHolder from '../booking/DetailsPaymentHolder';
let startD;
export default class Bookingmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingmodalShow: false,
      startDate: ''
    };
  }

 

  render() {
    console.log();
    console.log(String(this.props.endDate).substring(16, 18));


    return (
      <Modal
        {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DetailsPaymentHolder
            startDate={String(this.props.startDate).substring(4, 10)}
            startTime={String(this.props.startDate).substring(16, 21)}
            endTime={String(this.props.endDate).substring(16, 21)}
            rommId={this.props.roomId}
          />
        </Modal.Body>
        {/* <Modal.Footer>
                  <Button >Close</Button>
                </Modal.Footer> */}
      </Modal>
    );
  }
}
