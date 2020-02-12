import React, { Component } from 'react';
import { Container, Col, Row , Button , ButtonToolbar } from 'react-bootstrap';
import EmailChangesmodel from './EmailChangesmodel';
import PhoneNumberchangemodel from './PhoneNumberchangemodel';
import Passwordchangemodel from './Passwordchangemodel';
import '../stylesheets/AccountCSS.css';
import {connect} from 'react-redux';



class AccountSettings extends Component {
  constructor(props){
     super(props);
     this.state = {
      EmailmodalShow:false,
      PhoneNumbermodalShow:false,
      changepasswordmodalShow:false

}
  }
    render() {
      
      console.log(this.props.user)
      let addModelClose =  ()=> this.setState({EmailmodalShow:false})
      let addModelClose1 = ()=> this.setState({PhoneNumbermodalShow:false})
      let addModelClose2 = ()=> this.setState({changepasswordmodalShow:false})

        return (
            <Container className="accountsettings">
                <Row>
                    <Col sm={1}></Col>
                <Col sm={8}>
                 <h3 >ACCOUNT SETTINGS </h3>
               </Col>
               </Row>
               <Row>
                   <Col sm={3}></Col>
              
<Col sm={9}  style={{padding:'5%'}}>
  <div className="changedValue">
    <div className="label">
        <p className="ml-3">E-MAIL</p>
        </div>
        
        <div className="emailValue">
        <p className="mr-3">{this.props.user.email}
        </p>
        <ButtonToolbar>
      <Button className="changeemailbtn"
      onClick={()=>this.setState({EmailmodalShow:true})}
      >CHANGE</Button>
    </ButtonToolbar>
        </div>


        <div className="label">
        <p className="ml-3">PHONE NUMBER</p>
        </div>

        <div className="emailValue">
        <p className="mr-3">{this.props.user.phone}</p>
        <ButtonToolbar>
      <Button className="changeemailbtn"
      onClick={()=>this.setState({PhoneNumbermodalShow:true})}
      >CHANGE</Button>
    </ButtonToolbar>
        </div>

        
        <div className="label">
        <p className="ml-3">PASSWORD</p>
        </div>

        <div className="emailValue">
      <p className="mr-3">*********</p>
      <ButtonToolbar>
      <Button className="changeemailbtn"
      onClick={()=>this.setState({changepasswordmodalShow:true})}
      >CHANGE</Button>
    </ButtonToolbar>
        </div>
        </div>
        </Col>
        </Row>   
       <EmailChangesmodel show={this.state.EmailmodalShow } onHide={addModelClose} />
       <PhoneNumberchangemodel show={this.state.PhoneNumbermodalShow}  onHide={addModelClose1} />
       <Passwordchangemodel show={this.state.changepasswordmodalShow}  onHide={addModelClose2} />

      </Container>
        )
    }
}


 const mapStateToProps=state=>({
   user:state.auth.user ,
 })

export default connect(mapStateToProps)(AccountSettings) 
