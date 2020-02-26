import React, { Component } from 'react';
import { Row, Container, Col, Button } from 'react-bootstrap';
import '../../stylesheets/PaymentCSS.css';
import BookDetails from './BookDetails';
import Payment from './Payment';
import Receipt from '../booking/Receipt';

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
      showreceiptcomponent: false
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
              <Col sm={12} className="text-center">
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
        ,
        {this.state.showdetailscomponent && (
          <BookDetails
            showPayment={this.showPayment}
            startDate={this.props.startDate}
            startTime={this.props.startTime}
            endTime={this.props.endTime}
            roomId={this.props.roomId}
          />
        )}
        {this.state.showpaymentcomponent && (
          <Payment
            showDetails={this.showDetails}
            showreceipt={this.showreceipt}
          />
        )}
        {this.state.showreceiptcomponent && <Receipt />}
      </div>
    );
  }
}
