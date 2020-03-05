import React, { Component } from 'react';
import { Row, Container, Col, Button } from 'react-bootstrap';
import '../../stylesheets/PaymentCSS.css';
import BookDetails from './BookDetails';
import Payment from './Payment';
import Printcomponent from '../booking/Printcomponent';
import isEqual from 'lodash/isEqual';
import { formatDate } from 'react-day-picker/moment';

export default class DetailsPaymentHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageCode: '',
      showdetailscomponent: true,
      showpaymentcomponent: false,
      detailsColor: '#ED1C24',
      detailsborder: '5px solid #ED1C24',
      paymentColor: '#000',
      paymentborder: 'none',
      showreceiptcomponent: false,
      // test:'here',
      bookprice: '',
      // startDate: '',
      startTime: '',
      endTime: '',
      roomId: '',
      roomtype: '',
      amountofpeople: '',
      slots: [],
      startdate: formatDate(this.props.startdate),
      payment: ''
    };
  }

  showDetails = e => {
    this.setState({
      showdetailscomponent: true,
      showpaymentcomponent: false,
      detailsColor: '#ED1C24',
      detailsborder: '5px solid #ED1C24',
      paymentborder: 'none',
      paymentColor: '#000'
    });
  };
  componentDidMount() {
    // this.test()
  }

  componentDidUpdate(prevProps, prevState) {
    if (isEqual(prevState, this.state.bookprice)) {
      this.test();
      this.testtoreceipt();
    }

    if (isEqual(prevState, this.state.packageCode)) {
      this.testpaymenttoreceipt();
      this.paymenttest();
    }
    if (isEqual(prevState, this.state.roomtype)) {
      this.testtoreceipt();
    }
  }

  test = e => {
    setTimeout(() => {
      this.setState({ bookprice: e });
    }, 0);
  };

  paymenttest = e => {
    setTimeout(() => {
      this.setState({ packageCode: e });
    }, 0);
  };

  testtoreceipt = (r, a, s, d, p, n) => {
    setTimeout(() => {
      this.setState({
        roomtype: r,
        amountofpeople: a,
        slots: s,
        startdate: d,
        payment: p,
        roomId: n
      });
    }, 0);
  };

  testpaymenttoreceipt = p => {
    setTimeout(() => {
      this.setState({
        packageCode: p
      });
    }, 0);
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
            testtoreceipt={this.testtoreceipt}
            detailsfun={this.test}
            showPayment={this.showPayment}
            // nnnn={this.state.test}
            // startDate={this.state.startDate}
            startdate={this.props.startdate}
            startTime={this.props.startTime}
            endTime={this.props.endTime}
            roomId={this.props.roomId}
          />
        )}
        {this.state.showpaymentcomponent && (
          <Payment
            testpaymenttoreceipt={this.testpaymenttoreceipt}
            paymentfun={this.paymenttest}
            bookprice={this.state.bookprice}
            paymentstae={this.state.test}
            showDetails={this.showDetails}
            showreceipt={this.showreceipt}
            // startDate={this.state.startDate}
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            roomId={this.state.roomId}
          />
        )}

        {this.state.showreceiptcomponent && (
          <Printcomponent
            packageCode={this.state.packageCode}
            closebookModal={this.props.closebookModal}
            roomtype={this.state.roomtype}
            amountofpeople={this.state.amountofpeople}
            bookprice={this.state.bookprice}
            slots={this.state.slots}
            startdate={this.state.startdate}
            payment={this.state.payment}
            roomId={this.state.roomId}
          />
        )}
      </div>
    );
  }
}
