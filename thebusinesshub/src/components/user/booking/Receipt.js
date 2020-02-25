
import React, { Component } from 'react';
import { Container, Col, Row,Table,Button } from 'react-bootstrap';
import '../../stylesheets/ReceiptCSS.css';
export default class Receipt extends Component {
    render() {
      return (
          <div>
              <Container>
                  <Row>

                  <Col sm={1}></Col>
                      <Col sm={11}>
                      <div className="receipt">
          <h2>Receipt For Ahmed orabi</h2>
          </div>
                      </Col>
                  </Row>

                  <Row>
                      <Col sm={12}>
                      

        <React.Fragment>
                <Table>
                  <thead>
                    <tr>
                      <th>ROOM</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Slot</th>
                      <th>Number of people </th>
                      <th>Package code</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  
                        <tbody>
                          <tr  className="text-center bookingstr  mb-5">
                            <td>meeting room</td>
                            <td>66/66</td>
                            <td>66/666</td>
                            <td>9 am</td>
                            <td>6</td>
                              <td>tytytyt</td>
                        
                              <td>554</td>
                           
                          </tr>
                        </tbody>
                   
                 
                </Table>
              </React.Fragment>
                      </Col>
                  </Row>

                  <Row>
                      <Col sm={12}>
                      <div className="receipt">
                    <h6>   <i class="fas fa-square-full"></i>You can pay via: Vodafone Cash or visit our work space</h6>
          <div style={{display:'flex'}}  className="mt-3"><p><i class="fas fa-square-full"></i> Call before cancellation, by at least five days.</p></div>
          <div style={{display:'flex'}}  className="mt-3"><p><i class="fas fa-square-full"></i> Cancellation within five days of the workshop will have a fine of 25% of the total amount.</p></div>
          <div style={{display:'flex'}}  className="mt-3"><p><i class="fas fa-square-full"></i> We are not responsible for the loss and/or damage of any personal belongings.</p></div>
          
                      </div>
                      </Col>
                  </Row>

                  <Row>
            <Col sm={12} className="text-right">

                
            <Button
              type="submit"
              className=" printbtn my-4 mr-5"
            >
        <i class="fas fa-print"></i>
            </Button>
            <Button
              type="submit"
              className="my-4 nextBtn mr-5"
            >
         DONE
            </Button>

          </Col>
            </Row>
              </Container>

          </div>
      )
    }
}