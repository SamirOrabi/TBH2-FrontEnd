import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import ProfilePage from './ProfilePage';
import UserBoardSideNav from './UserBoardSideNav';
import AccountSettings from './AccountSettings';
import '../stylesheets/userCss.css';

export default class UserBoard extends Component {
  componentDidMount() {
    console.log(this.props.location);
  }
  render() {
    return (
      <Container fluid className="userboard">
        <Row>
          <Col sm="12" md={3}>
            <UserBoardSideNav />
          </Col>
          <Col
            sm={12}
            md={9}
            style={{
              borderTop: '1px solid #eee',
              borderLeft: '1px solid #eee'
            }}
          >
            {this.props.location.pathname.substring(11) === 'Profile' && (
              <ProfilePage />
            )}
            {this.props.location.pathname.substring(11) ===
              'Account-Settings' && <AccountSettings />}
          </Col>
        </Row>
      </Container>
    );
  }
}
