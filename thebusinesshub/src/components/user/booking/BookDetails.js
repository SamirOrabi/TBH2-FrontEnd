import React, { Component } from 'react';
import {Col , Container , Img} from 'react-bootstrap';
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default class BookDetails extends Component {
  render() {
    const settings = {
        customPaging: function(i) {
          return (
            <a>
              {/* <Img /> */}
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1};

    return (
      <div >
        <Container>
  <Col sm={6}>
  <Slider {...settings}>
          <div>
            <img  />
          </div>
          <div>
            <img />
          </div>
          <div>
            <img />
          </div>
          <div>
            <img />
          </div>
        </Slider>
 
  </Col>
  <Col sm={6}>calender</Col>
  </Container>
      </div>
    );


  }
}
