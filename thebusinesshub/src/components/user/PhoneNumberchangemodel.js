import React, { Component } from 'react';
import {Modal , Button  , Form} from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import '../stylesheets/ChangesmodelCSS.css';
 class PhoneNumberchangemodel extends Component {

    constructor(props){
        super(props)

        this.state={
            NewPhoneNumber:'',
        }
    }
    

    handleUserInput = e => {
        this.setState({NewPhoneNumber: e.target.value });
        console.log(e.target.value)
      };

      changephonenumber=()=>{
        axios.defaults.headers.common['authorization'] =localStorage.userToken;
        axios.post('http://18.185.138.12:5000/api/accounts/changephone' , 
        {
          Account:{
            id:this.props.user.id,
            phoneNumber:this.state.NewPhoneNumber
    }
        }
        )
        .then(
          res=>{
            this.props.user.phone=this.state.NewPhoneNumber
            console.log(res)
          }
        ).catch(err=>console.log(err))
        
      }
  render() {
    return (
        <Modal className="userdatachanemodel"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
    <p>Change Phone Number</p>  
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <Form >
          <Form.Group>
          <Form.Control
          noValidate
          required
          type="number"
          onChange={this.handleUserInput}
          value={this.state.NewPhoneNumber}
          name="phoneNumber"
          placeholder="NEW PHONE NUMBER"
        />
            </Form.Group>
            </Form>
        </Modal.Body>

        <Modal.Footer >
                    <Button onClick={this.changephonenumber}  className="savebtn" >SAVE</Button>
                    </Modal.Footer>
                    </Modal>
    );
  }
}
const mapStateToProps = state=>({
    user:state.auth.user
    });

export default connect(mapStateToProps)(PhoneNumberchangemodel)
