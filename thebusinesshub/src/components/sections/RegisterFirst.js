import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
class RegisterFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showme: this.props.showbar
    };
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        {this.props.showbar !== false ? (
          <Container className="alertVerify m-auto">
            <Row className="text-center m-auto">
              <Col sm={12}>
                <Button>
                  <i className="fas fa-exclamation-triangle px-2"></i>
                  <span>
                    {' '}
                    User Not Found , You need to Register by Google/Facebook
                    first{' '}
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
