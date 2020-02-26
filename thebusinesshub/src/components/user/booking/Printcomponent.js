import React, { Component } from 'react';
import {Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import Receipt from '../booking/Receipt';

export default class Printcomponent extends Component {

    render(){
        return(
            <div>
               

              <ReactToPrint

          trigger={() => <Button type="submit" className=" printbtn my-4 mr-5">
          <i class="fas fa-print"></i> print
        </Button>}
          content={() => this.componentRef}
        />
   <Receipt  ref={el => (this.componentRef = el)} />

            </div>
        )
    }
}