import React, { Component } from 'react';
import { Row, Container, Col, Button } from 'react-bootstrap';
import '../../stylesheets/PaymentCSS.css';
import BookDetails from './BookDetails';
import Payment from './Payment';
import Printcomponent from '../booking/Printcomponent';
import isEqual from 'lodash/isEqual';

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
      test:'here',
      startDate:'',
      startTime:'',
      endTime:'',
      roomId:''
      
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
  componentDidMount(){
// this.test()
// console.log(this.state.test)
  }

  componentDidUpdate(prevProps , prevState){
    if ( isEqual(prevState ,this.state.test)){
      this.test()

      
    }
    console.log("state changed")
      console.log(this.state.startDate)
      console.log(this.state)

  }

  test=e =>{
    console.log("fun test")

// console.log(e)

// if(0){
setTimeout(() => {

  this.setState({ startDate: e });
}, 0);

  console.log("state changed2")
  console.log(this.state.startDate)

// console.log('start date')
// console.log(this.state.test)
// }
// console.log('start date2 ')
// console.log(this.state.test)
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
            // nnnn={this.state.test}
            startDate={this.state.startDate}
            startTime={this.props.startTime}
            endTime={this.props.endTime}
            roomId={this.props.roomId}
          />

        )}
        {this.state.showpaymentcomponent && (
          <Payment
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
          <Printcomponent closebookModal={this.props.closebookModal} />
        )}
      </div>
    );
  }
}
