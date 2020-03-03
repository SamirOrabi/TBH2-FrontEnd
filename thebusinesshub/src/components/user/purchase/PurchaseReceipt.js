import React, { Component } from 'react';
import { Container, Col, Row, Table, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../stylesheets/ReceiptCSS.css';

class PurchaseReceipt extends Component {
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

  render() {
    // console.log(this.props);
    return (
      <div>
        <Modal size="xl" show={this.props.showmodal}>
          <Modal.Body>
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
                      five days of the workshop will have a fine of 25% of the
                      total amount.
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
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(PurchaseReceipt);
