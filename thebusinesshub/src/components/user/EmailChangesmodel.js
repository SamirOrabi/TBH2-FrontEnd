import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../stylesheets/ChangesmodelCSS.css';
import { connect } from 'react-redux';
import axios from 'axios';

class EmailChangesmodel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEmail: '',
      emailerror: '' ,
      EmailmodalShow:false
    };
  }

  handleUserInput = e => {
    this.setState({ newEmail: e.target.value });
    console.log(e.target.value);
  };
  changeEmail = () => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/changeEmail', {
        Account: {
          id: this.props.user.id,
          email: this.state.newEmail
        }
      })
      .then(res => {
        this.props.user.email = this.state.newEmail;
        if (res.data.error) {
          this.setState({ emailerror: res.data.error });
        } else {
          this.setState({ emailerror: '' });
          this.props.onHide()
        }
 
      })
    

      .catch(err => console.log(err));
  };
  render() {
    
  // const handleClose = () =>this.setState({EmailmodalShow:false}) 
    return (
      <Modal  
        className="userdatachanemodel"
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
          <Form>
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
          {this.state.emailerror ? (
            <span
              className="pl-3"
              style={{ color: '#ed1c24', fontWeight: 'bold' }}
            >
              {' '}
              <i className="fas fa-exclamation-triangle px-2"></i>{' '}
              {this.state.emailerror}
            </span>
          ) : null}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.changeEmail}  className="savebtn"   >
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(EmailChangesmodel);
