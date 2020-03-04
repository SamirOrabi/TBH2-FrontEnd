import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../stylesheets/ChangesmodelCSS.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { EmailErrors, EmailErrorsIcon } from '../../layout/FormErrors';
class EmailChangesmodel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEmail: '',
      emailerror: '',
      EmailmodalShow: false,
      emailErros: '',
      emailErrors: { email: '' },
      emailValid: false,
      formValid: false
    };
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ newEmail: e.target.value });
    this.validateField(name, value);
  };
  validateField(fieldName, value) {
    let emailValidationErrors = this.state.emailErrors;
    let emailValid = this.state.emailValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        emailValidationErrors.email = emailValid ? '' : ' is invalid';
        if (value === 0) {
        }
        break;
      default:
        break;
    }

    this.setState(
      {
        emailErrors: emailValidationErrors,

        emailValid: emailValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid
    });
  }
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
          this.props.onHide();
          this.setState({newEmail:''})
        }
      })

      // .catch(err => console.log(err));
  };

  enter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.changeEmail();
    }
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
                onKeyDown={this.enter}
                onChange={this.handleUserInput}
                value={this.state.newEmail}
                name="email"
                placeholder="NEW E-MAIL"
              />
              <div className="icontringale">
                <EmailErrorsIcon emailErrors={this.state.emailErrors} />
              </div>{' '}
            </Form.Group>
            <EmailErrors emailErrors={this.state.emailErrors} />
          </Form>
          {this.state.emailerror ? (
            <span
              className="pl-3"
              style={{ color: '#ed1c24', fontWeight: 'bold' }}
            >
              {' '}
              {/* <i className="fas fa-exclamation-triangle px-2"></i>{' '} */}
              {this.state.emailerror}
            </span>
          ) : null}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.changeEmail} className="savebtn">
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
