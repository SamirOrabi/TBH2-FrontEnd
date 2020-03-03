import React, { Component } from 'react';
import {
  Container,
  Card,
  Button,
  FormControl,
  Row,
  Col
} from 'react-bootstrap';
import '../../stylesheets/purchasecardCSS.css';
import PurchaseDetailsModal from './PurchaseDetailsModal';
export default class Purchasecard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hrsNumber: '',
      cards: [
        { img: '../../../Images/img.png', HRS: '+10' },
        { img: '../../../Images/bg.png', HRS: '+50' },
        { img: '../../../Images/img.png', HRS: '+100' }
      ],
      show: false
    };
  }

  sethoursNumber = e => {
    this.setState({ hrsNumber: e.target.value });
  };

  showPurchasepopup = () => {
    this.setState({ show: true });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Container>
          <Row>
            {this.state.cards.map((card, i) => (
              <Col sm={12} md={4}>
                <Card style={{ width: '18rem' }}>
                  <div className="cardimg">
                    <Card.Img src={card.img} />
                    {card.HRS}
                  </div>
                  <Card.Body>
                    <Card.Text>
                      <div className="monthdrop">
                        <FormControl
                          style={{
                            height: '20px',
                            margin: '0px',
                            width: '50%'
                          }}
                          className="startTime"
                          type="number"
                          name="hrsNumber"
                          value={this.state.hrsNumber}
                          onChange={this.sethoursNumber}
                          min="1"
                          max="5"
                        />
                      </div>
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer>
                    <div className="cardbtn">
                      <Button
                        className="Purchasecard"
                        onClick={this.showPurchasepopup}
                      >
                        Purchase
                        <PurchaseDetailsModal
                          hours={this.state.hrsNumber}
                          show={this.state.show}
                        />
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}
