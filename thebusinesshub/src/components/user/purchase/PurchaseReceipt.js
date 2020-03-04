import React, { Component } from 'react';
import { Container, Col, Row, Table, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../stylesheets/ReceiptCSS.css';
import PrintComponents from 'react-print-components';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';

class PurchaseReceipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      modalnote: '',
      showfeedBack: false
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

  confirmPackage = () => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;

    axios
      .post('https://cubexs.net/tbhapp/packages/addpackage', {
        Package: {
          numberOfHours: this.props.hours,
          package: this.props.code,
          roomType: this.props.room
        },
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.setState({ showfeedBack: true });
          setTimeout(() => {
            this.setState({ showfeedBack: false });
            this.props.closeReciept(false);

            this.props.handleClose(false);
          }, 1900);
        }
      });
  };

  close = e => {
    this.props.closeReciept(false);
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <Modal size="xl" show={this.props.showmodal} onHide={this.close}>
          <PrintProvider>
            <Print name="foo">
              <Modal.Body>
                <Row>
                  <Col className="closebtn" sm={12}>
                    <Button style={{ float: 'right' }} onClick={this.close}>
                      {' '}
                      <i
                        className="fas fa-times"
                        style={{ color: '#ed1c24' }}
                      ></i>
                    </Button>
                  </Col>
                </Row>
                <Row>
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
                          <tr>
                            <th className="">GROUP</th>
                            <th className="">NUMBER OF PEOPLE</th>
                            <th className="">NUMBER OF HOURS</th>
                            <th className="">TOTAL PRICE</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="text-center bookingstr  mb-5">
                            <td>{this.props.type}</td>
                            <td>{this.props.people}</td>
                            <td>{this.props.hours}</td>
                            <td>{this.props.price}</td>
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
                          <i class="fas fa-square-full"></i> Call before
                          cancellation, by at least five days.
                        </p>
                      </div>
                      <div style={{ display: 'flex' }} className="mt-3">
                        <p>
                          <i class="fas fa-square-full"></i> Cancellation within
                          five days of the workshop will have a fine of 25% of
                          the total amount.
                        </p>
                      </div>
                      <div style={{ display: 'flex' }} className="mt-3">
                        <p>
                          <i class="fas fa-square-full"></i> We are not
                          responsible for the loss and/or damage of any personal
                          belongings.
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <NoPrint>
                  <Row>
                    <Col sm={10}></Col>
                    <Col
                      style={{ float: 'right' }}
                      className="verifyBtn pt-2"
                      sm={3}
                    >
                      <Button onClick={this.confirmPackage}>Done</Button>

                      <PrintComponents
                        trigger={
                          <Button type="submit" className="printbtn">
                            <i className="fas fa-print"></i>
                          </Button>
                        }
                      ></PrintComponents>
                    </Col>
                  </Row>
                </NoPrint>
              </Modal.Body>
            </Print>
          </PrintProvider>
          <Modal className="mt-2 feedBack" show={this.state.showfeedBack}>
            <div id="snackbar">Package Booked Successfully</div>
          </Modal>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(PurchaseReceipt);
