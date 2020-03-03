import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Purchasecard from './Purchasecard';
export default class PurchaseTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSmall: true,
      showBig: false,
      type: 'small',
      codeone: 'MRSG10',
      codetwo: 'MRSG30',
      codethree: 'MRSG50'
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
    console.log(e.target);
  };
  render() {
    return (
      <div>
        <Tabs
          onClick={this.onchangeType}
          defaultActiveKey="small"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="small" title="SMALL GROUP">
            <Purchasecard
              type={this.state.type}
              codeone={this.state.codeone}
              codetwo={this.state.codetwo}
              codethree={this.state.codethree}
            />
          </Tab>
          <Tab eventKey="big" id="big" title="BIG GROUP">
            <Purchasecard
              type={this.state.type}
              codeone={this.state.codeone}
              codetwo={this.state.codetwo}
              codethree={this.state.codethree}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
