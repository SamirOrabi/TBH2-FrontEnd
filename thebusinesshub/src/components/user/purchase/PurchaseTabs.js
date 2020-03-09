import React, { Component } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import Purchasecard2 from './Purchasecard2';
import '../../stylesheets/PurchasetabsCSS.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class PurchaseTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userStatus: '',
      showSmall: true,
      showBig: false,
      meeting: 'meeting',
      training: 'training',
      type: 'small',
      codeone: 'MRSG10',
      codetwo: 'MRSG30',
      codethree: 'MRSG50',
      smallColor: '#ed1c24',
      smallborder: '1px solid #ed1c24'
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
  async componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    const getprof = await axios
      .post('https://cubexs.net/tbhapp/accounts/getprofile', {
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        console.log(res.data.state);
        this.setState({ userStatus: res.data.state });
      });
  }
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
                    userStatus={this.state.userStatus}
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
                    userStatus={this.state.userStatus}
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
                    userStatus={this.state.userStatus}
                    training={this.state.training}
                    type={this.state.type}
                    room="training room"
                  />
                </Tab>
                <Tab eventKey="big" id="big" title="BIG GROUP">
                  <Purchasecard2
                    userStatus={this.state.userStatus}
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
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(PurchaseTabs));
