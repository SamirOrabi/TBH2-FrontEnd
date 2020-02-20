import React, { Component } from 'react';
import {Col , Container , Row } from 'react-bootstrap';
import img from '../../../Images/img.png'
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Slider from "react-slick";

export default class BookDetails extends Component {
  render() {

    
    const settings = {
      customPaging:function(i){
        return (
          <Container>
       
          <a>
             <img src={img} alt="Logo" />
          </a>
         
          </Container>
        );
      } ,
      
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div >
        <Container>
        <Row>
        
    <Col sm={6}>
  <Slider {...settings}>
 
          <div>
          <img src={img} alt="Logo" />
          </div>
      
         
          <div>
          <img src={img} alt="Logo" />
          </div>
         
        
          <div>
          <img src={img} alt="Logo" />
          </div>
       
         
          <div>
          <img src={img} alt="Logo" />
          </div>
        
        </Slider>
 
  </Col>
  <Col sm={6}>calender</Col>
  </Row>
 
  </Container>
      </div>
    );


  }
}
