import React, { Component } from 'react';
import {Modal , Button  , Form} from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import '../stylesheets/ChangesmodelCSS.css';
 class Passwordchangemodel extends Component {

  constructor(props) {
    super(props)

    this.state = {
          password:'',
          newPassword:'' ,
          ConfirmPassword:''
          

    }
}


handleconfirmpasswordUserInput = e => {
  this.setState({ConfirmPassword: e.target.value });
  console.log(e.target.value)
};

handlenewpasswordUserInput = e => {
  this.setState({newPassword: e.target.value });
  console.log(e.target.value)
};

handlepasswordUserInput = e => {
  this.setState({password: e.target.value });
  console.log(e.target.value)
};

changePassword=()=>{
  axios.defaults.headers.common['authorization'] =localStorage.userToken;
  axios.post('http://18.185.138.12:5000/api/accounts/changepassword' , 
  {
    Credentials:{
      id:this.props.user.id,
      password: this.state.password,
      newPassword:this.state.newPassword
}
  }
  )
  .then(
    res=>{
      // this.props.user.password=this.state.newPassword
      console.log(res)
    }
  ).catch(err=>console.log(err))
  
}
  render() {
    return (
     
        <Modal  className="userdatachanemodel"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
    <p>CHANGE PASSWORD</p>  
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <Form >
          <Form.Group className="formgroupmargin">
            <Form.Control
              noValidate
              required
              type="password"
              onChange={this.handlepasswordUserInput}
              value={this.state.password}
              name="password"
              placeholder=" CURRENT PASSWORD"
            />{' '}
            <div className="icontringale">
              {' '}
             
            </div>{' '}
          </Form.Group>{' '}

          <Form.Group className="formgroupmargin">
            <Form.Control
              noValidate
              required
              type="password"
              onChange={this.handlenewpasswordUserInput}
              value={this.state.newPassword}
              name="password"
              placeholder=" NEW PASSWORD"
            />{' '}
            <div className="icontringale">
              {' '}
           
            </div>{' '}
          </Form.Group>{' '}

          <Form.Group className="formgroupmargin">
            <Form.Control
              noValidate
              required
              type="password"
              onChange={this.handleconfirmpasswordUserInput}
              value={this.state.ConfirmPassword}
              name="password"
              placeholder="CONFIRM NEW PASSWORD"
            />{' '}
            <div className="icontringale">
              {' '}
             
            </div>{' '}
          </Form.Group>{' '}
            </Form>
        </Modal.Body>

        <Modal.Footer >
                    <Button onClick={this.changePassword}  className="savebtn" >SAVE</Button>
                    </Modal.Footer>
                    </Modal>
    );
  }
}



const mapStateToProps = state=>({
  user:state.auth.user
  })
export default connect(mapStateToProps)(Passwordchangemodel)