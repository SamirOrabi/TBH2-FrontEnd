import React, { Component } from 'react';
import { Container , Card , Button  ,Row , Col,Form} from 'react-bootstrap';
import '../../stylesheets/purchasecardCSS.css';
export default class Purchasecard extends Component {
constructor(props){
  super(props);
  this.state={
 
    tenhoursvalue:'',
    thirtyvalue:'',
    fiftyvalue:'',
    showPurchasepopup:false
  }
}

  settenhours = e => {
     this.setState({tenhoursvalue:e.target.value})
     console.log(e.target.value)
  };

  setthirtyhours = e => {
    this.setState({thirtyvalue:e.target.value})
    console.log(this.state.thirtyvalue)
 };

 setfiftyhours = e => {
  this.setState({fiftyvalue:e.target.value})
  console.log(this.state.fiftyvalue)
};


 

  showPurchasepopup(){
    this.setState({showPurchasepopup:true})
  }

  render() {
    console.log(this.state.tenhoursvalue)
    console.log(this.state.thirtyvalue)

    return (
      
      <div>
      <Container>
      <Row>
             <Col sm={12} md={4}>
          <Card style={{ width: '18rem' }}>
      <div className="cardimg">
         <Card.Img  src={require('../../../Images/img.png')} />
     
         </div>
  <Card.Body>
    <Card.Text>
    
                <div className="monthdrop">
                <Form.Control
               style={{ height: '20px', margin: '0px' , width:'50%' }}
               className="startTime"
              type="text"
              value={this.state.tenhoursvalue}
              onChange={this.settenhours}
              name='tenhours'
              
            />
         
     

                      </div>
    </Card.Text>
  </Card.Body>
  <Card.Footer>
    <div className="cardbtn"> 
    <Button className="Purchasecard"
     onClick={this.showPurchasepopup}>Purchase</Button></div>
    
  </Card.Footer>
</Card>     
</Col>
   


<Col sm={12} md={4}>
          <Card style={{ width: '18rem' }}>
      <div className="cardimg">
         <Card.Img  src={require('../../../Images/img.png')} />
         </div>
  <Card.Body>
    <Card.Text>
    
                <div className="monthdrop">
                <Form.Control
               style={{ height: '20px', margin: '0px' , width:'50%' }}
               className="startTime"
              type="text"
              value={this.state.thirtyvalue}
              onChange={this.setthirtyhours}
              name='thirtyhours'
              
            />
         
     

                      </div>
    </Card.Text>
  </Card.Body>
  <Card.Footer>
    <div className="cardbtn"> 
    <Button className="Purchasecard"
     onClick={this.showPurchasepopup}>Purchase</Button></div>
    
  </Card.Footer>
</Card>     
</Col>



<Col sm={12} md={4}>
          <Card style={{ width: '18rem' }}>
      <div className="cardimg">
     

         <Card.Img  src={require('../../../Images/img.png')} />
     
         </div>
  <Card.Body>
    <Card.Text>
    
                <div className="monthdrop">
                <Form.Control
               style={{ height: '20px', margin: '0px' , width:'50%' }}
               className="startTime"
              type="text"
              value={this.state.fiftyvalue}
              onChange={this.setfiftyhours}
              name='fiftyhours'
              
            />
         
     

                      </div>
    </Card.Text>
  </Card.Body>
 
  <Card.Footer>
    <div className="cardbtn"> 
    <Button className="Purchasecard"
     onClick={this.showPurchasepopup}>Purchase</Button></div>
    
  </Card.Footer>
</Card>     
</Col>
         
        
         </Row> 
      </Container>
      </div>
    );
  }
}
