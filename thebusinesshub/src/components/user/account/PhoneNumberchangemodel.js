import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import '../../stylesheets/ChangesmodelCSS.css';
class PhoneNumberchangemodel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NewPhoneNumber: '',
      phoneerror: ''
    };
  }

  handleUserInput = e => {
    this.setState({ NewPhoneNumber: e.target.value });
    console.log(e.target.value);
  };

  changephonenumber = () => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/changePhone', {
        Account: {
          id: this.props.user.id,
          phoneNumber: this.state.NewPhoneNumber
        }
      })
      .then(res => {
        this.props.user.phone = this.state.NewPhoneNumber;
        console.log(res.data.error)
        if (res.data.code===101 ) {
          this.setState({ phoneerror: 'Phone number must contain 11 numbers only' });
        } 
        else if (res.data.code===102 ) {
          this.setState({ phoneerror: res.data.error });

        }
        else {
          this.setState({ phoneerror: '' });
          this.props.onHide()
        }
      })
      .catch(err => console.log(err));
  };
  render() {
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
            <p>Change Phone Number</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          </Form>{' '}
          {this.state.phoneerror ? (
            <span
              className="pl-3"
              style={{ color: '#ed1c24', fontWeight: 'bold' }}
            >
              {' '}
              <i className="fas fa-exclamation-triangle px-2"></i>{' '}
              {this.state.phoneerror}
            </span>
          ) : null}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.changephonenumber} className="savebtn">
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

export default connect(mapStateToProps)(PhoneNumberchangemodel);
