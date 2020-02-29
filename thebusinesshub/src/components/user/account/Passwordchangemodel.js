import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ForgetPassword from '../../sections/ForgetPassword';
import { connect } from 'react-redux';
import '../../stylesheets/ChangesmodelCSS.css';
class Passwordchangemodel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldpassword: '',
      newPassword: '',
      ConfirmPassword: '',
      error: '',
      passerror: '',
      show: false
    };
  }
  handleShow = () => {
    this.setState({ show: true });
  };
  hideModal = e => {
    setTimeout(() => {
      this.setState({ show: e });
    }, 1600);
  };

  hideModal2 = e => {
    // this.setState({ show: false });

    setTimeout(() => {
      this.setState({ show: e });
    }, 0);
  };

  handleconfirmpasswordUserInput = e => {
    this.setState({ ConfirmPassword: e.target.value });

    if (e.target.value !== this.state.newPassword) {
      this.setState({ passerror: 'password does not match ' });
    } else {
      this.setState({ passerror: '' });
    }
  };

  handlenewpasswordUserInput = e => {
    this.setState({ newPassword: e.target.value });
  };

  handlepasswordUserInput = e => {
    this.setState({ oldpassword: e.target.value });
  };

  changePassword = () => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    if (this.state.newPassword === this.state.ConfirmPassword) {
      axios
        .post('https://cubexs.net/tbhapp/accounts/changePassword', {
          Credentials: {
            password: this.state.oldpassword,
            newPassword: this.state.newPassword
          },
          Account: { id: this.props.user.id }
        })
        .then(res => {
          if (res.data.error) {
            this.setState({ error: res.data.error, passerror: '' });
          } else {
            this.props.onHide();
            this.setState({newPassword:''})
            this.setState({oldpassword:''})
            this.setState({ConfirmPassword:''})
          }
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ passerror: 'Please Confirm your password', error: '' });
    }
  };

  enter = e => {
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        e.preventDefault();

        this.changePassword();
      }
    });
  };

  componentDidMount() {
    this.enter();
  }

  render() {
    return (
      <div>
        <Modal
          className="userdatachanemodel"
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
            <Form onSubmit={this.changePassword}>
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
                <div className="icontringale"> </div>{' '}
              </Form.Group>{' '}
              <div className="modalforgetdev text-right">
                {' '}
                <Button onClick={this.handleShow}>
                  Forget Password?
                  <ForgetPassword
                    show={this.state.show}
                    hideModal={this.hideModal}
                    hideModal2={this.hideModal2}
                  />
                </Button>
              </div>{' '}
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
                <div className="icontringale"> </div>{' '}
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
                <div className="icontringale"></div>{' '}
              </Form.Group>
              {this.state.passerror ? (
                <span
                  className="pl-3"
                  style={{ color: '#ed1c24', fontWeight: 'bold' }}
                >
                  {' '}
                  <i className="fas fa-exclamation-triangle px-2"></i>{' '}
                  {this.state.passerror}
                </span>
              ) : null}
              {this.state.error ? (
                <span
                  className="pl-3"
                  style={{ color: '#ed1c24', fontWeight: 'bold' }}
                >
                  {' '}
                  <i className="fas fa-exclamation-triangle px-2"></i>{' '}
                  {this.state.error}
                </span>
              ) : null}
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="submit"
              onClick={this.changePassword}
              className="savebtn"
            >
              SAVE
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(Passwordchangemodel);
