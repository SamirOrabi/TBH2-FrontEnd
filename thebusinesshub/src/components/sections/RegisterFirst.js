import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';

import axios from 'axios';
import isEqual from 'lodash/isEqual';

class RegisterFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showme: this.props.showbar
    };
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        {this.state.showme !== false ? (
          <Container className="alertVerify m-auto">
            <Row className="text-center m-auto">
              <Col sm={12}>
                <Button>
                  <i className="fas fa-exclamation-triangle px-2"></i>
                  <span>
                    {' '}
                    USER NOT FOUND , You need to Register BY GOOGLE/FACEBOOK
                    FIRST{' '}
                  </span>
                </Button>
              </Col>
            </Row>
          </Container>
        ) : null}
      </div>
    );
  }
}

export default RegisterFirst;
