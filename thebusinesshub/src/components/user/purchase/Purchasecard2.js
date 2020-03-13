import React, { Component } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import '../../stylesheets/purchasecardCSS.css';
import PurchaseDetailsModal from './PurchaseDetailsModal';

export default class Purchasecard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenhoursvalue: '',
      thirtyvalue: '',
      fiftyvalue: '',
      show1: false,
      show2: false,
      show3: false,
      code: 'test',
      pleaseverify: ''
    };
  }

  settenhours = e => {
    this.setState({ tenhoursvalue: e.target.value });
  };

  setthirtyhours = e => {
    this.setState({ thirtyvalue: e.target.value });
  };

  setfiftyhours = e => {
    this.setState({ fiftyvalue: e.target.value });
  };

  showPurchasepopup1 = () => {
    if (this.props.userStatus === 'verified') {
      this.setState({ show1: true, code: 'x' });
      this.setState({ pleaseverify: '' });
    } else {
      this.setState({
        pleaseverify: 'Please sign in / verify your account before purchase.'
      });
    }
    // alert('hello');
  };
  closemodal = e => {
    setTimeout(() => {
      this.setState({ show1: e });
    }, 0);
  };
  closemodal2 = e => {
    setTimeout(() => {
      this.setState({ show2: e });
    }, 0);
  };
  closemodal3 = e => {
    setTimeout(() => {
      this.setState({ show3: e });
    }, 0);
  };

  showPurchasepopup2 = () => {
    console.log(this.props.userStatus);
    if (this.props.userStatus === 'verified') {
      this.setState({ show2: true, code: 'y' });
      this.setState({ pleaseverify: '' });
    } else {
      this.setState({
        pleaseverify: 'Please sign in / verify your account before purchase.'
      });
    }
  };
  showPurchasepopup3 = () => {
    if (this.props.userStatus === 'verified') {
      this.setState({ show3: true, code: 'z' });
      this.setState({ pleaseverify: '' });
    } else {
      this.setState({
        pleaseverify: 'Please sign in / verify your account before purchase.'
      });
    }
  };
  render() {
    return (
      <div>
        {this.props.meeting ? (
          <Container>
            <p
              style={{
                fontWeight: 'bolder',
                color: '#ed1c24',
                textAlign: 'center'
              }}
            >
              {this.state.pleaseverify}
            </p>
            <Row className="mt-3">
              <Col sm={12} md={4}>
                <Card style={{ width: '18rem' }}>
                  <div className="cardimg">
                    <Card.Img src={require('../../../Images/img.png')} />

                    <h3>10+</h3>
                  </div>
                  <Card.Body>
                    <Card.Text>
                      <div className="monthdrop" style={{ display: 'flex' }}>
                        <Form.Control
                          style={{
                            height: '20px',
                            margin: '0px',
                            width: '65%'
                          }}
                          className="startTime"
                          type="text"
                          value={this.state.tenhoursvalue}
                          onChange={this.settenhours}
                          name="tenhours"
                          placeholder="ENTER HOURS"
                        />
                        <p className="ml-3 mt-3" style={{ color: '#ed1c24' }}>
                          HR
                        </p>
                      </div>
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer>
                    <div className="cardbtn">
                      <Button
                        className="Purchasecard"
                        onClick={this.showPurchasepopup1}
                      >
                        Purchase
                        {this.props.type === 'small' ? (
                          <PurchaseDetailsModal
                            hours={this.state.tenhoursvalue}
                            show={this.state.show1}
                            type={this.props.type}
                            code={'MRSG10'}
                            room={this.props.room}
                            closemodal={this.closemodal}
                          />
                        ) : (
                          <PurchaseDetailsModal
                            hours={this.state.tenhoursvalue}
                            show={this.state.show1}
                            type={this.props.type}
                            code={'MRLG10'}
                            room={this.props.room}
                            closemodal={this.closemodal}
                          />
                        )}
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>

              <Col sm={12} md={4}>
                <Card style={{ width: '18rem' }}>
                  <div className="cardimg">
                    <Card.Img src={require('../../../Images/img.png')} />
                    <h3>30+</h3>
                  </div>
                  <Card.Body>
                    <Card.Text>
                      <div className="monthdrop" style={{ display: 'flex' }}>
                        <Form.Control
                          style={{
                            height: '20px',
                            margin: '0px',
                            width: '65%'
                          }}
                          className="startTime"
                          type="text"
                          value={this.state.thirtyvalue}
                          onChange={this.setthirtyhours}
                          name="thirtyhours"
                          placeholder="ENTER HOURS"
                        />
                        <p className="ml-3 mt-3" style={{ color: '#ed1c24' }}>
                          HR
                        </p>
                      </div>
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer>
                    <div className="cardbtn">
                      <Button
                        className="Purchasecard"
                        onClick={this.showPurchasepopup2}
                      >
                        Purchase
                        {this.props.type === 'small' ? (
                          <PurchaseDetailsModal
                            hours={this.state.thirtyvalue}
                            show={this.state.show2}
                            type={this.props.type}
                            code={'MRSG30'}
                            room={this.props.room}
                            closemodal={this.closemodal2}
                          />
                        ) : (
                          <PurchaseDetailsModal
                            hours={this.state.thirtyvalue}
                            show={this.state.show2}
                            type={this.props.type}
                            code={'MRLG30'}
                            room={this.props.room}
                            closemodal={this.closemodal2}
                          />
                        )}
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>

              <Col sm={12} md={4}>
                <Card style={{ width: '18rem' }}>
                  <div className="cardimg">
                    <Card.Img src={require('../../../Images/img.png')} />
                    <h3>50+</h3>
                  </div>
                  <Card.Body>
                    <Card.Text>
                      <div className="monthdrop" style={{ display: 'flex' }}>
                        <Form.Control
                          style={{
                            height: '20px',
                            margin: '0px',
                            width: '65%'
                          }}
                          className="startTime"
                          type="text"
                          value={this.state.fiftyvalue}
                          onChange={this.setfiftyhours}
                          name="fiftyhours"
                          placeholder="ENTER HOURS"
                        />
                        <p className="ml-3 mt-3" style={{ color: '#ed1c24' }}>
                          HR
                        </p>
                      </div>
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer>
                    <div className="cardbtn">
                      <Button
                        className="Purchasecard"
                        onClick={this.showPurchasepopup3}
                      >
                        Purchase
                        {this.props.type === 'small' ? (
                          <PurchaseDetailsModal
                            hours={this.state.fiftyvalue}
                            show={this.state.show3}
                            type={this.props.type}
                            code={'MRSG50'}
                            room={this.props.room}
                            closemodal={this.closemodal3}
                          />
                        ) : (
                          <PurchaseDetailsModal
                            hours={this.state.fiftyvalue}
                            show={this.state.show3}
                            type={this.props.type}
                            code={'MRLG50'}
                            room={this.props.room}
                            closemodal={this.closemodal3}
                          />
                        )}
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
            <p
              style={{
                fontWeight: 'bolder',
                color: '#ed1c24',
                textAlign: 'center'
              }}
            >
              {this.state.pleaseverify}
            </p>
            <Row className="mt-3">
              <Col sm={12} md={4}>
                <Card style={{ width: '18rem' }}>
                  <div className="cardimg">
                    <Card.Img src={require('../../../Images/img.png')} />
                    <h3>10+</h3>
                  </div>
                  <Card.Body>
                    <Card.Text>
                      <div className="monthdrop" style={{ display: 'flex' }}>
                        <Form.Control
                          style={{
                            height: '20px',
                            margin: '0px',
                            width: '65%'
                          }}
                          className="startTime"
                          type="text"
                          value={this.state.tenhoursvalue}
                          onChange={this.settenhours}
                          name="tenhours"
                          placeholder="ENTER HOURS"
                        />
                        <p className="ml-3 mt-3" style={{ color: '#ed1c24' }}>
                          HR
                        </p>
                      </div>
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer>
                    <div className="cardbtn">
                      <Button
                        className="Purchasecard"
                        onClick={this.showPurchasepopup1}
                      >
                        Purchase
                        {this.props.type === 'small' ? (
                          <PurchaseDetailsModal
                            hours={this.state.tenhoursvalue}
                            show={this.state.show1}
                            type={this.props.type}
                            code={'TRSG10'}
                            room={this.props.room}
                            closemodal={this.closemodal}
                          />
                        ) : (
                          <PurchaseDetailsModal
                            hours={this.state.tenhoursvalue}
                            show={this.state.show1}
                            type={this.props.type}
                            code={'TRLG10'}
                            room={this.props.room}
                            closemodal={this.closemodal}
                          />
                        )}
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>

              <Col sm={12} md={4}>
                <Card style={{ width: '18rem' }}>
                  <div className="cardimg">
                    <Card.Img src={require('../../../Images/img.png')} />
                    <h3>30+</h3>
                  </div>
                  <Card.Body>
                    <Card.Text>
                      <div className="monthdrop" style={{ display: 'flex' }}>
                        <Form.Control
                          style={{
                            height: '20px',
                            margin: '0px',
                            width: '65%'
                          }}
                          className="startTime"
                          type="text"
                          value={this.state.thirtyvalue}
                          onChange={this.setthirtyhours}
                          name="thirtyhours"
                          placeholder="ENTER HOURS"
                        />

                        <p className="ml-3 mt-3" style={{ color: '#ed1c24' }}>
                          HR
                        </p>
                      </div>
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer>
                    <div className="cardbtn">
                      <Button
                        className="Purchasecard"
                        onClick={this.showPurchasepopup2}
                      >
                        Purchase
                        {this.props.type === 'small' ? (
                          <PurchaseDetailsModal
                            hours={this.state.thirtyvalue}
                            show={this.state.show2}
                            type={this.props.type}
                            code={'TRSG30'}
                            room={this.props.room}
                            closemodal={this.closemodal2}
                          />
                        ) : (
                          <PurchaseDetailsModal
                            hours={this.state.thirtyvalue}
                            show={this.state.show2}
                            type={this.props.type}
                            code={'TRLG30'}
                            room={this.props.room}
                            closemodal={this.closemodal2}
                          />
                        )}
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>

              <Col sm={12} md={4}>
                <Card style={{ width: '18rem' }}>
                  <div className="cardimg">
                    <Card.Img src={require('../../../Images/img.png')} />
                    <h3>50+</h3>
                  </div>
                  <Card.Body>
                    <Card.Text>
                      <div className="monthdrop" style={{ display: 'flex' }}>
                        <Form.Control
                          style={{
                            height: '20px',
                            margin: '0px',
                            width: '65%'
                          }}
                          className="startTime"
                          type="text"
                          value={this.state.fiftyvalue}
                          onChange={this.setfiftyhours}
                          name="fiftyhours"
                          placeholder="ENTER HOURS"
                        />
                        <p className="ml-3 mt-3" style={{ color: '#ed1c24' }}>
                          HR
                        </p>
                      </div>
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer>
                    <div className="cardbtn">
                      <Button
                        className="Purchasecard"
                        onClick={this.showPurchasepopup3}
                      >
                        Purchase
                        {this.props.type === 'small' ? (
                          <PurchaseDetailsModal
                            hours={this.state.fiftyvalue}
                            show={this.state.show3}
                            type={this.props.type}
                            code={'TRSG50'}
                            room={this.props.room}
                            closemodal={this.closemodal3}
                          />
                        ) : (
                          <PurchaseDetailsModal
                            hours={this.state.fiftyvalue}
                            show={this.state.show3}
                            type={this.props.type}
                            code={'TRLG50'}
                            room={this.props.room}
                            closemodal={this.closemodal3}
                          />
                        )}
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}
