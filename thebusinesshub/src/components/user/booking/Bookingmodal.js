import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
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
      <div className="bookmodal">
        <Modal
          {...this.props}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Button className="closebtn" onClick={this.props.closebookModal}>
              <i class="fas fa-times"></i>
            </Button>
          </Modal.Header>
          <Modal.Body>
            <DetailsPaymentHolder
              startDate={String(this.props.startDate).substring(4, 15)}
              startTime={String(this.props.startDate).substring(16, 21)}
              endTime={String(this.props.endDate).substring(16, 21)}
              roomId={this.props.roomId}
              closebookModal={this.props.closebookModal}
            />
          </Modal.Body>
          {/* <Modal.Footer>
                  <Button >Close</Button>
                </Modal.Footer> */}
        </Modal>
      </div>
    );
  }
}
