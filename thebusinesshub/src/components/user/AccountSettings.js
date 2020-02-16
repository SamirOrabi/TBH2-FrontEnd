import React, { Component } from 'react';
import { Container, Col, Row, Button, ButtonToolbar } from 'react-bootstrap';
import EmailChangesmodel from './EmailChangesmodel';
import PhoneNumberchangemodel from './PhoneNumberchangemodel';
import Passwordchangemodel from './Passwordchangemodel';
import '../stylesheets/AccountCSS.css';
import { connect } from 'react-redux';
import axios from 'axios';
import isEqual from 'lodash/isEqual';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailmodalShow: false,
      PhoneNumbermodalShow: false,
      changepasswordmodalShow: false,
      profileData: []
    };
  }

  componentDidMount(){
      axios.defaults.headers.common['authorization'] =localStorage.userToken;
      axios.post('https://cubexs.net/tbhapp/accounts/getprofile' , 
      {
        Account:{
          id:this.props.user.id,
  }
      }
      )
      .then(res => {
        console.log('getdatafromgetprofile', res.data.pofile);
        this.setState({ profileData: res.data.profile });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {

      if ( !isEqual(prevState ,this.state)){
       axios.defaults.headers.common['authorization'] =localStorage.userToken;
        axios.post('https://cubexs.net/tbhapp/accounts/getprofile' , 
        {
          Account:{
            id:this.props.user.id,
    }
        }
        )
        .then(res => {
          console.log(res)
     this.setState({profileData:res.data.profile})    
          console.log('new result',res.data.profile)
        }).catch(err => console.log(err));

       }
       
    
  }

 
  
 closeEmailModal=e=>{
  this.setState({EmailmodalShow:!this.state.EmailmodalShow})
 }

 closePhoneModal=e=>{
  this.setState({PhoneNumbermodalShow:!this.state.PhoneNumbermodalShow})
 }

 closePasswordModal=e=>{
  this.setState({changepasswordmodalShow:!this.state.changepasswordmodalShow})
 }

    render() {
      console.log(this.props.user)
     

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
      onClick={this.closeEmailModal}
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
      onClick={this.closePhoneModal}
     
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
      onClick={this.closePasswordModal}
      >CHANGE</Button>
    </ButtonToolbar>
        </div>
        </div>
        </Col> 
        </Row>   
       <EmailChangesmodel show={this.state.EmailmodalShow }  onHide={this.closeEmailModal} />
       <PhoneNumberchangemodel show={this.state.PhoneNumbermodalShow}  onHide={this.closePhoneModal} />
       <Passwordchangemodel show={this.state.changepasswordmodalShow}  onHide={this.closePasswordModal} />

      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(AccountSettings);
