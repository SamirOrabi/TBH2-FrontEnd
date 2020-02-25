
import React, { Component } from 'react';
import { Container, Col, Row,  } from 'react-bootstrap';
export default class Receipt extends Component {
    render() {
      return (
          <div>
              <Container>
                  <Row>

                  <Col sm={1}></Col>
                      <Col sm={11}>
                      <div className="Policies">
          <h2>Receipt For Ahmed orabi</h2>
          </div>
                      </Col>
                  </Row>

                  <Row>
                      <Col sm={12}>
                          <div style={{display:'flex' , justifyContent:'space-between'}}>
                              <p>ROOM</p>
                              <p>START DATE</p>
                              <p>END DATE</p>
                              <p>SOLT</p>
                              <p>NUMBER OF PEOPLE</p>
                              <p>PACKAGE CODE</p>
                              <p>PRICE</p>
                              
                          </div>
                      </Col>
                  </Row>
              </Container>

          </div>
      )
    }
}