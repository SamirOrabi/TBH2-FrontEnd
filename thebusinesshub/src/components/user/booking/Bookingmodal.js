import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../stylesheets/BookingmodelCSS.css';
import DetailsPaymentHolder from '../booking/DetailsPaymentHolder';
export default class Bookingmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingmodalShow: false,
    };
  }

  render() {

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
              startdate={this.props.startdate}
              startTime={String(this.props.startTime).substring(16, 21)}
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