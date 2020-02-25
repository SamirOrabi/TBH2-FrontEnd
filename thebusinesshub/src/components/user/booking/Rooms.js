import React, { Component } from 'react';
import { Container, Row , Col , Form, FormControl , Button} from 'react-bootstrap';
import '../../stylesheets/RoomsCSS.css'
export default class Rooms extends Component {
  render() {
    return (
    <Container className="roomdetails">
 <Form>
<Row>
  <Col sm={12} md={5}>
  <p> START DATE</p>
  <div className="monthdrop">
            
                <select
                  name="month"
                >
                  <option selected disabled>
                    month
                  </option>
                 
                </select>

                <div className="daydrop pl-2">
                <select
                  name="day"
                  className=""
                >
                  <option selected disabled>
                    day
                  </option>
                 
                </select>
              </div>
              </div>
    
</Col>

<Col sm={12} md={5}>
  <p> END DATE</p>
  <div className="monthdrop">
            
                <select
                  name="month"
                >
                  <option selected disabled>
                    month
                  </option>
                 
                </select>

                <div className="daydrop pl-2">
                <select
                  name="day"
                  className=""
                >
                  <option selected disabled>
                    day
                  </option>
                 
                </select>
              </div>
              </div>

</Col>
</Row>


<Row  className="mt-4">
  <Col sm={12} md={5}>
  <p> START TIME</p>
  <div className="monthdrop">

          
  <FormControl style={{height:'60px' , margin:'0px' ,width:'50%'}}
  className="startTime"
   type="number"
   name="startTime" />  

                <div className="daydrop pl-2">

                <select
                  name="month"
                >
                  <option >
                    AM
                  </option>

                  <option>
                    PM
                  </option>
                 
                </select>
              </div>
              </div>
    
</Col>

<Col sm={12} md={5}>
  <p> END TIME</p>
  <div className="monthdrop">
                    
  <FormControl style={{height:'60px' , margin:'0px' ,width:'50%'}}
  className="startTime"
   type="number"
   name="startTime" />  

                <div className="daydrop pl-2">

                <select
                  name="month"
                >
                  <option selected disabled>
                    AM
                  </option>

                  <option selected disabled>
                    PM
                  </option>
                 
                </select>
              </div>
              </div>


             
       
</Col>

</Row>




<Row className="mt-4">
  <Col sm={12} md={5}>
  <p> Room Type</p>
  <div className="roomtypedrop">
            
             
                 <select
                  name="month"
                 >
                  <option >
                  Room Type
                  </option>
                 
                </select>
              </div>
    
</Col>

<Col sm={12} md={6}>
  <p>Number of people</p>
  <div className="monthdrop">
            
  <FormControl style={{height:'60px' , margin:'0px' ,width:'63%'}}
  className="startTime"
   type="number"
   name="startTime" />  

              </div>

</Col>
</Row>

<Col sm={12} className="text-right">
            <Button
              type="submit"
              className="my-4 nextBtn"
            >
              NEXT
            </Button>
          </Col>
</Form>
              </Container>  
     
    );
  }
}
