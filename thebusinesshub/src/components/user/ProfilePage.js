import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProfilePage extends Component {
  render() {
    return (
      <div className="profilePage">
        <h1 className="firstChardiv">
          {this.props.user.firstName.substring(0, 1)}
        </h1>
        <h3 style={{ textAlign: 'center' }}>{this.props.user.username}</h3>
        <p style={{ textAlign: 'center' }}>{this.props.user.email}</p>
        <Container>
          <Row>
            <Col sm={12} md={5}>
              {' '}
              <Form.Label className="pl-3">FIRST NAME</Form.Label>
              <Form.Group>
                <Form.Control
                  noValidate
                  required
                  type="text"
                  name="name"
                  value={this.props.user.firstName}
                />
              </Form.Group>{' '}
            </Col>
            <Col md={1}></Col>
            <Col sm={12} md={5}>
              {' '}
              <Form.Label className="pl-3">LAST NAME</Form.Label>
              <Form.Group>
                <Form.Control
                  noValidate
                  required
                  type="text"
                  name="name"
                  value={this.props.user.lastName}
                />
              </Form.Group>{' '}
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
export default connect(mapStatetoProps)(withRouter(ProfilePage));
