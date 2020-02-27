import React, { Component } from 'react';
import { Col, Container, Row ,Button} from 'react-bootstrap';
import img from '../../../Images/img.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../stylesheets/BookdetailsCSS.css';
import Rooms from '../booking/Rooms';

export default class BookDetails extends Component {


componentDidMount(){
console.log( "props from book details")
console.log(this.props)
this.test()
  }

  test=()=>{
    this.props.detailsfun("testtttttttttt")
  }

  render() {
    const settings = {
      customPaging: function(i) {
        return (
          <Container className="bookdetails ">
            <Row>
              <Col sm={6}>
                <a>
                  <img alt="img1"
                    src={require(`./img0${i + 1}.png`)}
                    style={{ width: '70px', height: '70px' }}
                  />
                </a>
              </Col>
            </Row>
          </Container>
        );
      },

      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>
        <Container>
          <Row className="m-auto">
            <Col className="m-auto pl-4" md={5} sm={12}>
              <Slider {...settings}>
                <div>
                  <img src={require('./img01.png')} className="img-fluid" alt="img" />
                </div>

                <div>
                  <img src={require('./img02.png')} className="img-fluid" alt="img1" />
                </div>

                <div>
                  <img src={require('./img03.png')} className="img-fluid" alt="img2" />
                </div>

                <div>
                  <img src={require('./img04.png')} className="img-fluid" alt="img3" />
                </div>
              </Slider>
            </Col>
            <Col className="m-auto" md={7} sm={12}>
              <Rooms
                showPayment={this.props.showPayment}
                // startDate={this.props.startDate}
                startTime={this.props.startTime}
                endTime={this.props.endTime}
                roomId={this.props.roomId}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
