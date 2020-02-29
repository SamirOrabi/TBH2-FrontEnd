import React, { Component } from 'react';
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import '../../stylesheets/PaymentCSS.css';
export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showreceiptcomponent: false,
      showpaymentcomponent: true
    };
  }

  showreceipt = e => {
    this.setState({ showreceiptcomponent: true, showpaymentcomponent: false });
  };
  showPayment = e => {
    this.setState({ showreceiptcomponent: false, showpaymentcomponent: true });
  };
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={12} md={6}>
              <div className="Regulations">
                <h2>Policies & Regulations </h2>
                <div style={{ display: 'flex' }} className="mt-3">
                  <p>
                    <i class="fas fa-square-full"></i> Pay full amount on the
                    first day of the workshop.
                  </p>
                </div>

                <div style={{ display: 'flex' }} className="mt-3">
                  <p>
                    <i class="fas fa-square-full"></i> Call before cancellation,
                    by at least five days.
                  </p>
                </div>

                <div style={{ display: 'flex' }} className="mt-3">
                  {' '}
                  <i class="fas fa-square-full mt-2"></i>
                  <p>
                    {' '}
                    Cancellation within five days of the workshop will have a
                    fine of 25% of the total amount.
                  </p>
                </div>

                <div style={{ display: 'flex' }} className="mt-3">
                  {' '}
                  <i class="fas fa-square-full mt-2"></i>
                  <p>
                    {' '}
                    We are not responsible for the loss and/or damage of any
                    personal belongings.
                  </p>
                </div>
              </div>

              <Col sm={12} className="text-left">
                <Button
                  type="submit"
                  className="my-4 nextBtn mt-5"
                  onClick={this.props.showDetails}
                >
                  BACK
                </Button>
              </Col>
            </Col>

            <Col>
              <div className="Policies pt-5">
                <Row>
                  <Col sm={12} md={5}>
                    <h2>Price</h2>
                    <Form.Group>
                      <Form.Control
                        noValidate
                        type="text"
                        name="Price"
                        value={this.props.bookprice}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col sm={12} md={8}>
                    <h2>Package Code</h2>
                    <Form.Group>
                      <Form.Control type="text" name="Package Code" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm={12} className="text-right">
                    <Button
                      type="submit"
                      className="my-4 nextBtn mr-5"
                      onClick={this.props.showreceipt}
                    >
                      Book
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>

        {/* {this.state.showdetailscomponent && <Receipt showreceipt={this.showreceipt} /> }
       {this.state.showpaymentcomponent && <Payment showPayment={this.showPayment}/> } */}
      </div>
    );
  }
}
