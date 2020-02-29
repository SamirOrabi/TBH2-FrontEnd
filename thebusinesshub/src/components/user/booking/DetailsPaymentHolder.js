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
      // test:'here',
      bookprice:'',
      startDate:'',
      startTime:'',
      endTime:'',
      roomId:'',
      roomtype:'',
      amountofpeople:'',
      slots:[],
      startdate:'',
      payment:'',
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
    if ( isEqual(prevState ,this.state.bookprice)){
      this.test()
this.testtoreceipt()
    }
    console.log("state changed")
      console.log(this.state.bookprice)
      

      if ( isEqual(prevState ,this.state.roomtype)){
       
  this.testtoreceipt()
  console.log("room type changed")
      console.log(this.state.roomtype)
      }
  }

 

  test=e =>{

setTimeout(() => {

  this.setState({ bookprice: e });
}, 0);

  console.log("state changed2")
  console.log(this.state.bookprice)

  }



  
  testtoreceipt=(r , a , s ,d ,p ,n ) =>{

    setTimeout(() => {
    
      this.setState({ roomtype: r , amountofpeople:a , slots:s ,startdate:d ,
         payment:p ,roomId:n});
    }, 0);
    
      console.log("state changed2 amountofpeople")
      console.log(this.state.roomtype  );
      console.log(this.state.amountofpeople  )
      console.log(this.state.slots  )
      console.log(this.state.startdate  )
      console.log(this.state.payment  )
       console.log(this.state.roomId  )
    
      }
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
 console.log('here is my rooooom')
 console.log(this.state.roomtype)
 console.log('here is  amountofpeople')
 console.log(this.state.amountofpeople)
 console.log('here is  slots')
 console.log(this.state.slots)
 console.log('here is  startdate')
 console.log(this.state.startdate)
 console.log('here is  payment')
 console.log(this.state.payment)
 console.log('here is  roomnumber')
 console.log(this.state.roomId)

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
            startDate={this.state.startDate}
            startdate={this.props.startdate}
            startTime={this.props.startTime}
            endTime={this.props.endTime}
            roomId={this.props.roomId}
          />

        )}
        {this.state.showpaymentcomponent && (
          <Payment
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
          <Printcomponent closebookModal={this.props.closebookModal} roomtype={this.state.roomtype}  amountofpeople={this.state.amountofpeople} 
          bookprice={this.state.bookprice} slots={this.state.slots} startdate={this.state.startdate}
          payment={this.state.payment} roomId={this.state.roomId} />
        )}
      </div>
    );
  }
}