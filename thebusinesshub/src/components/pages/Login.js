import React, { Component } from 'react';
import SignInUp from '../forms/SignInUp';
import '../stylesheets/loginCSS.css';
import { Container, Row } from 'react-bootstrap';
export default class Login extends Component {
  render() {
    return (
      <div className="bg">
        <Container>
          <SignInUp />
        </Container>
        <Row className="justify-content-end m-0">
          <div className="featuerslisticon">
            <p
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '12px',
                margin: '7px'
              }}
            >
              SOCIAL
            </p>
            <a
              href="https://www.facebook.com/thebusinesshub.space/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fab  fa-facebook-f"
                style={{ padding: '4px 6px' }}
              ></i>
            </a>

            <a
              href="https://www.instagram.com/thebusinesshub.space/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab  p-1 fa-instagram"></i>
            </a>

            <a
              href="https://www.instagram.com/thebusinesshub.space/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab p-1 fa-linkedin-in"></i>
            </a>
          </div>
        </Row>
      </div>
    );
  }
}
