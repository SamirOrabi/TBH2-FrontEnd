import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Purchasecard from './Purchasecard';
export default class PurchaseTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSmall: true,
      showBig: false,
      type: 'small'
    };
  }

  onchangeType = e => {
    if (e.target.id === 'uncontrolled-tab-example-tab-big') {
      this.setState({ type: 'big' });
      alert('hey');
    } else {
      this.setState({ type: 'small' });
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
            <Purchasecard type={this.state.type} />
          </Tab>
          <Tab eventKey="big" id="big" title="BIG GROUP">
            <Purchasecard type={this.state.type} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
