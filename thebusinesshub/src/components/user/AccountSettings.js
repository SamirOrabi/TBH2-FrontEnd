import React, { Component } from 'react';
import { Container, Col, Row , Button , ButtonToolbar } from 'react-bootstrap';
import EmailChangesmodel from './EmailChangesmodel';
import PhoneNumberchangemodel from './PhoneNumberchangemodel';
import Passwordchangemodel from './Passwordchangemodel';
import '../stylesheets/AccountCSS.css';
import {connect} from 'react-redux';
import axios from 'axios';



class AccountSettings extends Component {
  constructor(props){
     super(props);
     this.state = {
      EmailmodalShow:false,
      PhoneNumbermodalShow:false,
      changepasswordmodalShow:false , 
profileData:[],
      

}


  }

  componentDidMount(){
      axios.defaults.headers.common['authorization'] =localStorage.userToken;
      axios.post('http://18.185.138.12:5000/api/accounts/getprofile' , 
      {
        Account:{
          ownerId:this.props.user.id,
  }
      }
      )
      .then(res => {
        console.log( 'getdatafromgetprofile',res.data.pofile)
        this.setState({profileData:res.data.profile})
        console.log(res.data);
      }).catch(err=>console.log(err))
      
  
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.user.id){
      
  //   if (this.state.profile === prevState.profile) {
      
  //      axios.defaults.headers.common['authorization'] =localStorage.userToken;
  //       axios.post('http://18.185.138.12:5000/api/accounts/getprofile' , 
  //       {
  //         Account:{
  //           ownerId:this.props.user.id,
  //   }
  //       }
  //       )
  //       .then(res => {
         
  //         this.setState({profileData:res.data.profile})
  //         console.log('new result',res)
  //       });
      
  //      }
  //   }
  // }

  componentWillUnmount=()=>{
    console.log('destroyyyyyyyyyyyyyy')
   
  }
  
 

    render() {
      
   
      console.log(this.props.user)
      let addModelClose =  ()=> this.setState({EmailmodalShow:false})
      let addModelClose1 = ()=> this.setState({PhoneNumbermodalShow:false})
      let addModelClose2 = ()=> this.setState({changepasswordmodalShow:false})

        return (
            <Container className="accountsettings">
                <Row>
                    <Col sm={0}></Col>
                <Col sm={8}>
                 <h3 >ACCOUNT SETTINGS </h3>
               </Col>
               </Row>
               <Row>
                   <Col sm={2}></Col>
              
<Col sm={8}  style={{padding:'5%'}}>
  <div className="changedValue">
    <div className="label">
        <p className="ml-3">E-MAIL</p>
        </div>
        
        <div className="emailValue">
        <p className="mr-3">{this.state.profileData.email}
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
        <p className="mr-3">{this.state.profileData.phoneNumber}</p>
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
