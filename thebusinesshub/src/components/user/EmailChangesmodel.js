import React, { Component } from 'react';
import {Modal , Button  , Form} from 'react-bootstrap';
import '../stylesheets/ChangesmodelCSS.css';
import {connect} from 'react-redux';
import axios from 'axios';



class EmailChangesmodel extends Component {
    constructor(props) {
        super(props)

        this.state = {
              newEmail:'' ,
              

        }
    }

    handleUserInput = e => {
      this.setState({newEmail: e.target.value });
      console.log(e.target.value)
    };
    changeEmail=()=>{
      axios.defaults.headers.common['authorization'] =localStorage.userToken;
      axios.post('http://18.185.138.12:5000/api/accounts/changeemail' , 
      {
        Account:{
          id:this.props.user.id,
          email:this.state.newEmail
  }
      }
      )
      .then(
        res=>{
          this.props.user.email=this.state.newEmail
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
        <p>CHANGE EMAIL</p>  
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             
              <Form >
              <Form.Group>
              <Form.Control
              noValidate
              required
              type="text"
              onChange={this.handleUserInput}
              value={this.state.newEmail}
              name="email"
              placeholder="NEW E-MAIL"
            />
                </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer >
                        <Button onClick={this.changeEmail} className="savebtn" >SAVE</Button>
                        </Modal.Footer>
            {/* {this.props.modalShow ?
                        <Modal.Footer >
                        <Button  onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>
  : this.props.modalShow ?       
            <Modal.Footer >
  <Button  onClick={this.props.onHide1}>Close</Button>                   </Modal.Footer>

          :                       <Modal.Footer >
    <Button  onClick={this.props.onHide2}>Close</Button>                   </Modal.Footer>

            } */}
          </Modal>
        )
    }
}




  const mapStateToProps = state=>({
    user:state.auth.user
    })


export default connect(mapStateToProps)(EmailChangesmodel)
