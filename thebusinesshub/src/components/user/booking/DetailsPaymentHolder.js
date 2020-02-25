import React, { Component } from 'react';
import { Row , Container , Col , Button} from 'react-bootstrap';
import '../../stylesheets/PaymentCSS.css';
import BookDetails from './BookDetails';
import Payment from './Payment';
import Receipt from '../booking/Receipt';

export default class DetailsPaymentHolder extends Component {
    constructor(props){
        super(props)
        this.state={
            showdetailscomponent:true,
            showpaymentcomponent:false,
            detailsColor:'#ED1C24',
            borderLeft:'5px solid #ED1C24',
            paymentColor:'black',showreceiptcomponent:false
        }
    }

showDetails=e=>{
    this.setState({showdetailscomponent:true,showpaymentcomponent:false ,
       

    })
}
showPayment=e=>{
    this.setState({showdetailscomponent:false,showpaymentcomponent:true ,
     detailsColor:'black',
        borderLeft:'5px solid black',})
}
showreceipt=e=>{
    this.setState({showreceiptcomponent:true,showpaymentcomponent:false , showdetailscomponent:false
       
  
    })
  }
    render() {

    return (
      <div>
          {(this.state.showdetailscomponent || this.state.showpaymentcomponent ) && 
          <Container>
              <Row>
                  <Col sm={12}  className="text-center">
                  <Button className="detailsbtn mr-3" onClick={this.showDetails} 
                  style={{color:this.state.detailsColor , borderLeft:this.state.borderLeft}}
                  >details</Button>
                  <Button className="detailsbtn" onClick={this.showPayment}
                  style={{color:this.state.paymentColor}}>payment</Button>
                  </Col>
              </Row>
          </Container>
    },

       {this.state.showdetailscomponent && <BookDetails showPayment={this.showPayment}  /> }
       {this.state.showpaymentcomponent && <Payment showDetails={this.showDetails} showreceipt={this.showreceipt} /> }    
           {this.state.showreceiptcomponent && <Receipt  /> }

      </div>
    );
  }
}
