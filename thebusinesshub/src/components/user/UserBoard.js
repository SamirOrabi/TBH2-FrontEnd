import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import ProfilePage from './ProfilePage';
import UserBoardSideNav from './UserBoardSideNav';
import AccountSettingsPage from './AccountSettingsPage';
import '../stylesheets/userCss.css';
import UserBookingPage from './booking/UserBookingPage';
import Userpurchase from './purchase/Userpurchase'
export default class UserBoard extends Component {
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
              'Account-Settings' && <AccountSettingsPage />}
            {this.props.location.pathname.substring(11) === 'Booking' && (
              <UserBookingPage />
            )}

            {this.props.location.pathname.substring(11) === 'purchase' && (
              <Userpurchase />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
