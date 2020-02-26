import React, { Component } from 'react';
import { Modal,Button} from 'react-bootstrap';
import '../../stylesheets/BookingmodelCSS.css';
import DetailsPaymentHolder from '../booking/DetailsPaymentHolder';

class Bookingmodal extends Component {
    constructor(props) {
      super(props);
      this.state = {
                bookingmodalShow: false}}
        render(){
          


            return(<Modal
                {...this.props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
             <Modal.Header>
             <Button   className="closebtn" onClick={this.props.onHide}><i class="fas fa-times"></i></Button>
        </Modal.Header>
                <Modal.Body>
                <DetailsPaymentHolder />
                </Modal.Body>
                {/* <Modal.Footer>
                  <Button >Close</Button>
                </Modal.Footer> */}

              </Modal>
            
            )


        }}
        export default Bookingmodal