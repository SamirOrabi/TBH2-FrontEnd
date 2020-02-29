import React, { Component } from 'react';
import { Container, Col, Row, Table, Button , Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../stylesheets/ReceiptCSS.css';
// import Printcomponent from '../booking/Printcomponent';
class Receipt extends Component {

  constructor(props){
    super(props);
    this.state={
      profile: [],
      modalnote: '',
      show: false,

    }
  }
  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;

    axios
      .post('https://cubexs.net/tbhapp/accounts/getprofile', {
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        console.log(res.data)
        this.setState({ profile: res.data.profile });
       
      });
    console.log(this.props.isAuth);
   
  }

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
    this.setState({
      modalnote: 'Your Booking Added Successfully',
      show1: false
    });
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 1600);
    console.log(res.data);
    this.props.closebookModal()
  })
  .catch(err => console.log(err));

}

  render() {

  
    return (
      <div >
        <Container>
          <Row>
            {/* <Col sm={1}></Col> */}
            <Col sm={12}>
              <div className="receipt">
    
                <h2 className="ml-5 mb-5">Receipt For {this.state.profile.firstName}
                 {this.state.profile.lastName}</h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={12} className="receipttable">
              <React.Fragment>
                <Table >
                  <thead>
                    <tr>
                      <th className=" pl-5">ROOM</th>
                      <th className=" pl-5">Start Date</th>
                      <th className=" pl-5">Slot</th>
                      <th className=" pl-5">Number of people </th>
                      <th className=" pl-5">Package code</th>
                      <th className=" pl-5">Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="text-center bookingstr  mb-5">
                      <td>{this.props.roomtype}</td>
                      <td>{this.props.startdate}</td>
                      <td>{this.props.slots}</td>
                      <td>{this.props.amountofpeople}</td>
                      <td>-</td>
                      <td>{this.props.bookprice}</td>
                    </tr>
                  </tbody>
                </Table>
              </React.Fragment>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <div className="receipt">
                <h6 className="mb-5">
                  {' '}
                  <i class="fas fa-square-full" style={{fontSize:'10px'}}></i>You can pay via: Vodafone
                  Cash or visit our work space
                </h6>
                <div style={{ display: 'flex' }} className="mt-3">
                  <p>
                    <i class="fas fa-square-full"></i> Call before cancellation,
                    by at least five days.
                  </p>
                </div>
                <div style={{ display: 'flex' }} className="mt-3">
                  <p>
                    <i class="fas fa-square-full"></i> Cancellation within five
                    days of the workshop will have a fine of 25% of the total
                    amount.
                  </p>
                </div>
                <div style={{ display: 'flex' }} className="mt-3">
                  <p>
                    <i class="fas fa-square-full"></i> We are not responsible
                    for the loss and/or damage of any personal belongings.
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={12} className="text-right">
           {/* < Printcomponent  /> */}
              <Button
                type="submit"
                className="my-4 nextBtn mr-5"
                onClick={this.sendbookingdetails}
              >
                DONE
              </Button>
            </Col>
          </Row>
        </Container>
        <Modal className="mt-2 firstnameupdatesnackbar" show={this.state.show}>
          <div id="snackbar">{this.state.modalnote}</div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Receipt);