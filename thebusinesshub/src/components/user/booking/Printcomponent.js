import React, { Component}from 'react';
import {Button , Col , Row ,Modal } from 'react-bootstrap';
// import ReactToPrint from 'react-to-print';
import Receipt from '../booking/Receipt';
import axios from 'axios';
import { connect } from 'react-redux';
import PrintComponents from "react-print-components";
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
 class Printcomponent extends Component {

constructor(props){
  super(props);
  this.state={
    show: false,
    modalnote: '',

  }
}
// componentDidMount(){
//   console.log("props of payment")
//   console.log(this.props.roomId)
// }



sendbookingdetails=()=>{
  axios.defaults.headers.common['authorization'] =localStorage.userToken;
  axios.post('https://cubexs.net/tbhapp/bookings/addbooking' , 
  {
    Account:{
      id:this.props.user.id,
            },
            Booking:{
              date:this.props.startdate,
              slot:this.props.slots,
              roomType:this.props.roomtype,
              roomNumber:this.props.roomId,
              amountOfPeople:this.props.amountofpeople,
              paymentMethod:this.props.payment,
              packageCode:''

            }
  }
  )
  .then(res => {
    console.log('addbooking', res.data);
    if (res.data.code === 0) {
    this.setState({
      modalnote: 'Your Booking Added Successfully',
      show: true

    })
    setTimeout(() => {
      this.setState({ show: false });
    }, 1600);
  
  
  }

  else {
    this.setState({
      modalnote: 'something wrong',
      show: true

    })
    setTimeout(() => {
      this.setState({ show: false });
    }, 2000);
  
  }


    // this.setState({ show: true });
    // setTimeout(() => {
    //   this.setState({ show: false });
    // }, 1600);
    console.log(res.data);
    this.props.closebookModal()
  })
  .catch(err => console.log(err));

}

    render(){
     
        return(
            <div>   
               <PrintProvider>
               <Print name="foo">
            
   <Receipt  
    roomtype={this.props.roomtype} roomId={this.props.roomId} amountofpeople={this.props.amountofpeople}
   bookprice={this.props.bookprice}  payment={this.props.payment} slots={this.props.slots} 
    startdate={this.props.startdate} />


<NoPrint>
<Row>
  <Col sm={9}></Col>
  <Col sm={3} className="text-left">
    


<PrintComponents
  trigger={<Button type="submit" className="printbtn">
  <i className="fas fa-print"></i>
  </Button>}
>
</PrintComponents>
<Button
                type="submit"
                className="my-4 nextBtn mr-5 "
                onClick={this.sendbookingdetails}
              >
                DONE
              </Button>

</Col>
</Row>
</NoPrint>

</Print>
        </PrintProvider>


<Modal className="mt-2 firstnameupdatesnackbar" show={this.state.show}>
          <div id="snackbar">{this.state.modalnote}</div>
        </Modal>
       
</div>

        )
    }
}
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Printcomponent);