import React, { Component } from 'react';
import { Container, Col, Row, Table, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../stylesheets/ReceiptCSS.css';
import PrintComponents from 'react-print-components';
// import Printcomponent from '../booking/Printcomponent';
class Receipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      modalnote: ''
    };
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
        this.setState({ profile: res.data.profile });
      });
  }

  // sendbookingdetails=()=>{
  //   axios.defaults.headers.common['authorization'] =localStorage.userToken;
  //   axios.post('https://cubexs.net/tbhapp/bookings/addbooking' ,
  //   {
  //     Account:{
  //       id:this.props.user.id,
  //             },
  //             Booking:{
  //               date:this.props.startdate,
  //               slot:this.props.slots,
  //               roomType:this.props.roomtype,
  //               roomNumber:this.props.roomId,
  //               amountOfPeople:this.props.amountofpeople,
  //               paymentMethod:this.props.payment,
  //               packageCode:''

  // }

  render() {
    return (
      <div>
        <Container>
          <Row>
            {/* <Col sm={1}></Col> */}
            <Col sm={12}>
              <div className="receipt">
                <h2 className="ml-5 mb-5">
                  Receipt For {this.state.profile.firstName}{' '}
                  {this.state.profile.lastName}
                </h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={12} className="receipttable">
              <React.Fragment>
                <Table>
                  <thead>
                    <tr className="">
                      <th style={{width:'1px'}}>ROOM</th>
                      <th style={{width:'1px'}}>Start Date</th>
                      <th style={{width:'1px'}}>Slot</th>
                      <th style={{width:'1px'}}>Number of people </th>
                      <th style={{width:'1px'}}>Package code</th>
                      <th style={{width:'1px'}}>Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="mb-5">
                      <td>{this.props.roomtype}</td>
                      <td>{this.props.startdate}</td>
                      <td>{this.props.slots}</td>
                      <td  >{this.props.amountofpeople}</td>
                      <td>-</td>
                      <td>{this.props.bookprice} LE</td>
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
                  <i
                    class="fas fa-square-full"
                    style={{ fontSize: '10px' }}
                  ></i>
                  You can pay via: Vodafone Cash or visit our work space
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

                {this.props.modalerroe ? (
                  <div style={{ display: 'flex' }} className="mt-3">
                    <p style={{ fontWeight: 'bolder', fontSize: '25px' }}>
                      <i
                        className="fas fa-exclamation-triangle px-2"
                        style={{ fontSize: '20px' }}
                      ></i>{' '}
                      <span style={{ color: '#ed1c24' }}>
                        {' '}
                        {this.props.modalerroe}
                      </span>
                    </p>
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>

          {/* 
          <Row>
            <Col sm={12} className="text-right">
          
              <Button
                type="submit"
                className="my-4 nextBtn mr-5"
                onClick={this.sendbookingdetails}
              >
                DONE
              </Button>
            </Col>
          </Row> */}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Receipt);
