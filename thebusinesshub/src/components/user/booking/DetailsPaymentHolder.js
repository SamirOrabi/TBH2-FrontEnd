import React, { Component } from 'react';
import { Row, Container, Col, Button } from 'react-bootstrap';
import '../../stylesheets/PaymentCSS.css';
import BookDetails from './BookDetails';
import Payment from './Payment';
import Printcomponent from '../booking/Printcomponent';

export default class DetailsPaymentHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showdetailscomponent: true,
      showpaymentcomponent: false,
      detailsColor: '#ED1C24',
      detailsborder: '5px solid #ED1C24',
      paymentColor: '#000',
      paymentborder: 'none',
      showreceiptcomponent: false,
      startDate:'',
      startTime:'',
    };
  }


  showDetails = e => {
    this.setState({
      showdetailscomponent: true,
      showpaymentcomponent: false,
      detailsColor: 'ED1C24',
      detailsborder: '5px solid #ED1C24',
      paymentborder: 'none',
      paymentColor: '#000'
    });
  };

  test=e =>{
console.log(e)
this.setState({
  startDate: e,
});
console.log( 'kkkk',this.state.startDate)
  }

  // paymenttest=e =>{
  //   console.log(e)
  //   this.setState({
  //     startDate: e,
     
  //   });
  //   console.log(this.state.startDate)
  //     }

  showPayment = e => {
    this.setState({
      showdetailscomponent: false,
      showpaymentcomponent: true,
      detailsColor: '#000',
      detailsborder: 'none',
      paymentborder: '5px solid #ED1C24',
      paymentColor: '#ED1C24'
    });
  };
  showreceipt = e => {
    this.setState({
      showreceiptcomponent: true,
      showpaymentcomponent: false,
      showdetailscomponent: false
    });
  };
  render() {
    return (
      <div>
        {(this.state.showdetailscomponent ||
          this.state.showpaymentcomponent) && (
          <Container>
            <Row>
              <Col sm={12} className="paymentanddetailsbtn text-center">
                <Button
                  className="detailsbtn mr-3"
                  onClick={this.showDetails}
                  style={{
                    color: this.state.detailsColor,
                    borderLeft: this.state.detailsborder
                  }}
                >
                  details
                </Button>
                <Button
                  className="detailsbtn"
                  onClick={this.showPayment}
                  style={{
                    color: this.state.paymentColor,
                    borderLeft: this.state.paymentborder
                  }}
                >
                  payment
                </Button>
              </Col>
            </Row>
          </Container>
        )}
        
        {this.state.showdetailscomponent && (
          <BookDetails
            detailsfun={this.test}
            showPayment={this.showPayment}
            startDate={this.state.startDate}
            startTime={this.props.startTime}
            endTime={this.props.endTime}
            roomId={this.props.roomId}
          />

        )}
        {this.state.showpaymentcomponent && (
          <Payment
            paymentfun={this.test}
            showDetails={this.showDetails}
            showreceipt={this.showreceipt}
            startDate={this.state.startDate}
          />
        )}
        {this.state.showreceiptcomponent && (
          <Printcomponent closebookModal={this.props.closebookModal} />
        )}
      </div>
    );
  }
}
