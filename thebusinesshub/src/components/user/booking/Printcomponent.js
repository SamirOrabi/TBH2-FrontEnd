import React, { Component}from 'react';
import {Button , Col , Row } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import Receipt from '../booking/Receipt';

 class Printcomponent extends Component {


// componentDidMount(){
//   console.log("props of payment")
//   console.log(this.props.roomId)
// }

    render(){
     
        return(
            <div>
               
         
        
              
   <Receipt   ref={el => (this.componentRef = el)}
    roomtype={this.props.roomtype} roomId={this.props.roomId} amountofpeople={this.props.amountofpeople}
   bookprice={this.props.bookprice}  payment={this.props.payment} slots={this.props.slots}  startdate={this.props.startdate} />

<Row>
  <Col sm={9}></Col>
  <Col sm={3}>
  <ReactToPrint
trigger={() => <Button type="submit" className="printbtn">
<i className="fas fa-print"></i>
</Button>}
content={() => this.componentRef}


/></Col>
</Row>


</div>
       
      

        )
    }
}
export default  Printcomponent