import React, { Component } from 'react';
import { Tab, Tabs ,Container,Row ,Col} from 'react-bootstrap';
import Purchasecard2 from './Purchasecard2';
import '../../stylesheets/PurchasetabsCSS.css';
export default class PurchaseTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSmall: true,
      showBig: false,
      meeting: 'meeting',
      training: 'training',
      type: 'small',
      codeone: 'MRSG10',
      codetwo: 'MRSG30',
      codethree: 'MRSG50',
      smallColor:'#ed1c24',
      smallborder:'1px solid #ed1c24'

    };
  }

  onchangeType = e => {
    if (e.target.id === 'uncontrolled-tab-example-tab-big') {
      this.setState({
        type: 'big',
        codeone: 'MRLG10',
        codetwo: 'MRLG30',
        codethree: 'MRLG50'
      });
    } else {
      this.setState({
        type: 'small',
        codeone: 'MRSG10',
        codetwo: 'MRSG30',
        codethree: 'MRSG50'
      });
    }
  };

  render() {
    return (
      <div>
        <Container className="tabsheader">
          <Row>
            <Col sm={12}>
            <h1>Meeting Room</h1>

            <Tabs
          onClick={this.onchangeType}
          defaultActiveKey="small"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="small" title="SMALL GROUP">
            <Purchasecard2
              meeting={this.state.meeting}
              type={this.state.type}
              room="meeting room"
              // style={{
              //   color:this.state.smallColor,
              //   borderLeft:this.state.smallborder
              // }}
              
            />
          </Tab>
          <Tab eventKey="big" id="big" title="BIG GROUP">
            <Purchasecard2
              meeting={this.state.meeting}
              type={this.state.type}
              room="meeting room"
            />
          </Tab>
        </Tabs>






        <div className="mt-5"></div>
        <h1>Training Room</h1>
        <Tabs
          onClick={this.onchangeType}
          defaultActiveKey="small"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="small" title="SMALL GROUP">
            <Purchasecard2
              training={this.state.training}
              type={this.state.type}
              room="training room"
            />
          </Tab>
          <Tab eventKey="big" id="big" title="BIG GROUP">
            <Purchasecard2
              training={this.state.training}
              type={this.state.type}
              room="training room"
            />
          </Tab>
        </Tabs>
            </Col>
          </Row>
        </Container>
       
      
       
      </div>
    );
  }
}
