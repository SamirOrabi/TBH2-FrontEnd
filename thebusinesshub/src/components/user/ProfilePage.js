import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import VerifyBy from '../sections/VerifyBy';
import 'react-datez/dist/css/react-datez.css';
import { ReactDatez } from 'react-datez';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: [],
      profile: [],
      isEmpty: true,
      isDisabled: false,
      verifyerror: '',
      showverify: false,
      show: false,
      show1: false,
      firstnamefontWeight: 'normal',
      firstnamebackgroundColor: 'transparent',
      firstnametransform: '',
      lastnamefontWeight: 'normal',
      lastnamebackgroundColor: 'transparent',
      lastnametransform: '',
      genderbackgroundColor: 'transparent',
      gendertransform: '',
      genderfontweight: 'normal',
      validationerror: '',
      modalnote: '',
      dateInput: '',
      datevalidationerror: '',
      namewarn: ''
    };
  }
  handleChangedate = value => {
    this.setState({ dateInput: value });
    this.state.profile.birthdate = value;
  };

  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/getprofile', {
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        this.setState({ profileInfo: res.data });
        this.setState({ profile: res.data.profile });
      });
  }

  OnChangefirstname = e => {
    this.setState({
      [e.target.name]: e.target.value,
      firstnamefontWeight: 'bold',
      firstnamebackgroundColor: '#9e9e9e54',
      firstnametransform: 'scale(1.02)'
    });
    this.state.profile.firstName = e.target.value;
  };

  OnChangelastname = e => {
    this.setState({
      [e.target.name]: e.target.value,
      lastnamefontWeight: 'bold',
      lastnamebackgroundColor: '#9e9e9e54',
      lastnametransform: 'scale(1.02)'
    });
    this.state.profile.lastName = e.target.value;
  };

  OnChangegender = e => {
    this.setState({
      gender: e.target.value,
      genderbackgroundColor: '#9e9e9e54',
      gendertransform: 'scale(1.02)',
      genderfontweight: 'bold'
    });
    this.state.profile.gender = e.target.value;
  };

  OnEditProfile = e => {
    e.preventDefault();

    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    let request = {};
    request.id = this.props.user.id;
    if (this.state.profile.firstName)
      request.firstName = this.state.profile.firstName;

    if (this.state.profile.lastName)
      request.lastName = this.state.profile.lastName;

    if (this.state.profile.gender) request.gender = this.state.profile.gender;

    if (this.state.profile.birthdate)
      request.birthdate = this.state.profile.birthdate;

    axios
      .post('https://cubexs.net/tbhapp/accounts/updateprofile', {
        Account: request
      })
      .then(res => {
        if (res.data.code === 105) {
          this.setState({ verifyerror: res.data.error, validationerror: '' });
        } else if (
          res.data.code === 101 &&
          this.state.profileInfo.state === 'verified'
        ) {
          this.setState({ verifyerror: '', validationerror: res.data.error });
        } else if (
          res.data.code === 127 &&
          this.state.profileInfo.state === 'verified'
        ) {
          this.setState({ datevalidationerror: res.data.error });
        } else {
          this.setState({ datevalidationerror: '', validationerror: '' });
        }

        if (
          (this.state.profile.firstName === '' ||
            this.state.profile.lastName === '') &&
          this.state.profileInfo.state === 'verified'
        ) {
          this.setState({ namewarn: 'Name Cannot be empty' });
        } else {
          this.setState({ namewarn: '' });
        }
        if (
          res.data.code === 0 &&
          this.state.profile.firstName !== '' &&
          this.state.profile.lastName !== ''
        ) {
          this.setState({
            modalnote: 'Your data Updated Successfully',
            show1: false
          });
          this.setState({ show: true });
          setTimeout(() => {
            this.setState({ show: false });
          }, 1600);
        }
      })
      // .catch(err => console.log(err));
  };

  verifyhere = e => {
    return <VerifyBy />;
  };
  render() {
    return (
      <div className="profilePage">
        <h1 className="firstChardivprofile">
          {this.props.user.username.charAt(0).toUpperCase()}
        </h1>
        <h3 style={{ textAlign: 'center' }} className="pt-1">
          {this.props.user.username}
        </h3>
        <p style={{ textAlign: 'center', color: '#7e7e7e' }} className="pb-5">
          {this.state.profile.email}
        </p>
        <Container>
          <Row>
            <Col sm={12} md={5}>
              <Form.Label
                className="pl-3"
                style={{ fontWeight: this.state.firstnamefontWeight }}
              >
                FIRST NAME
              </Form.Label>
              <Form.Group>
                <Form.Control
                  noValidate
                  type="text"
                  style={{
                    color: '#000',
                    fontWeight: this.state.firstnamefontWeight,
                    backgroundColor: this.state.firstnamebackgroundColor,
                    transform: this.state.firstnametransform
                  }}
                  onChange={this.OnChangefirstname}
                  value={this.state.profile.firstName}
                  name="firstName"
                />
              </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col sm={12} md={5}>
              <Form.Label
                className="pl-3"
                style={{ fontWeight: this.state.lastnamefontWeight }}
              >
                LAST NAME
              </Form.Label>
              <Form.Group>
                <Form.Control
                  noValidate
                  type="text"
                  style={{
                    color: '#000',
                    fontWeight: this.state.lastnamefontWeight,
                    backgroundColor: this.state.lastnamebackgroundColor,
                    transform: this.state.lastnametransform
                  }}
                  onChange={this.OnChangelastname}
                  value={this.state.profile.lastName}
                  name="lastName"
                />
              </Form.Group>
            </Col>
          </Row>
          {this.state.namewarn ? (
            <div className="pt-2 text-center m-auto">
              <span style={{ color: '#ed1c24', fontWeight: 'bold' }}>
                <i className="fas fa-exclamation-triangle px-2"></i>
                {this.state.namewarn}
              </span>
            </div>
          ) : null}
          {this.state.validationerror ? (
            <div className="pt-2 text-center m-auto">
              <span style={{ color: '#ed1c24', fontWeight: 'bold' }}>
                <i className="fas fa-exclamation-triangle px-2"></i>
                {this.state.validationerror}
              </span>
            </div>
          ) : null}
          <Row className="pt-4">
            <Col sm={12} md={4}>
              {' '}
              <Form.Label className="pl-3">BIRTHDATE</Form.Label>
              <div className="deadlineInput">
                <ReactDatez
                  placeholder="Select your birthdate"
                  name="dateInput"
                  handleChange={this.handleChangedate}
                  value={this.state.profile.birthdate}
                  allowPast={true}
                />
              </div>
            </Col>{' '}
            <Col md={2}></Col>
            <Col sm={12} md={4}>
              <Form.Label
                className="pl-3"
                style={{ fontWeight: this.state.genderfontweight }}
              >
                GENDER
              </Form.Label>
              <div className="genderdrop">
                <select
                  style={{
                    backgroundColor: this.state.genderbackgroundColor,
                    transform: this.state.gendertransform
                  }}
                  className="browser-default"
                  value={this.state.profile.gender}
                  onChange={this.OnChangegender}
                  name="gender"
                >
                  <option selected disabled>
                    Gender
                  </option>
                  <option name="Male" value="Male">
                    {' '}
                    Male{' '}
                  </option>
                  <option name="Female" value="Female">
                    {' '}
                    Female{' '}
                  </option>
                </select>
              </div>
            </Col>
          </Row>{' '}
          {this.state.datevalidationerror ? (
            <div className="pt-2">
              <span style={{ color: '#ed1c24', fontWeight: 'bold' }}>
                <i className="fas fa-exclamation-triangle px-2"></i> WARNING:
                User {this.state.datevalidationerror}
              </span>
            </div>
          ) : null}
          {this.state.verifyerror ? (
            <div className="pt-5 text-center m-auto">
              <span style={{ color: '#ed1c24', fontWeight: 'bold' }}>
                <i className="fas fa-exclamation-triangle px-2"></i> WARNING:
                {this.state.verifyerror} before any updates
              </span>
            </div>
          ) : null}
          <Row style={{ textAlign: 'center', margin: 'auto' }}>
            <Button className="profilesaveBtn" onClick={this.OnEditProfile}>
              SAVE
            </Button>
          </Row>{' '}
        </Container>
        <Modal className="mt-2 firstnameupdatesnackbar" show={this.state.show}>
          <div id="snackbar">{this.state.modalnote}</div>
        </Modal>
      </div>
    );
  }
}
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(ProfilePage));
