import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import VerifyBy from '../sections/VerifyBy';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import 'react-datez/dist/css/react-datez.css';
import { ReactDatez, ReduxReactDatez } from 'react-datez';

let subBirthDate;

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: [],
      profile: [],
      selectedDay: undefined,
      isEmpty: true,
      isDisabled: false,
      verifyerror: '',
      showverify: false,
      show: false,
      show1: false,
      show6: false,
      show12: false,
      show7: false,
      show13: false,
      show8: false,
      show14: false,
      firstnamefontWeight: 'normal',
      firstnamebackgroundColor: 'transparent',
      firstnametransform: '',
      lastnamefontWeight: 'normal',
      lastnamebackgroundColor: 'transparent',
      lastnametransform: '',
      genderbackgroundColor: 'transparent',
      gendertransform: '',
      genderfontweight: 'normal',

      selectedDate: undefined,
      validationerror: '',
      firstNameModal: '',
      lastNameModal: '',
      genderModal: '',
      birthdateModal: '',
      dateInput: ''
    };
  }
  handleChangedate = value => {
    this.setState({ dateInput: value });
    this.state.profile.birthdate = value;
  };
  // handleDayChange(selectedDay, modifiers, dayPickerInput) {
  //   const input = dayPickerInput.getInput();
  //   this.setState({
  //     selectedDay,
  //     isEmpty: !input.value.trim(),
  //     isDisabled: modifiers.disabled === true
  //   });
  //   this.state.profile.birthdate = this.state.selectedDay;
  // }

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
        // this.setState({ selectedDay: res.data.profile.birthdate });
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
    this.setState({ firstNameModal: 'Your First Name Updated Successfully' });

    if (this.props.user.firstName != request.firstName) {
      this.setState({
        show1: false,
        show: true
      });

      setTimeout(() => {
        this.setState({
          show: false
        });
      }, 1600);
    }

    if (this.state.profile.lastName)
      request.lastName = this.state.profile.lastName;
    this.setState({ lastNameModal: 'Your Last Name Updated Successfully' });
    // if (this.props.user.lastName === request.lastName) {
    //   this.setState({
    //     show12: false,
    //     show6: true
    //   });

    //   setTimeout(() => {
    //     this.setState({
    //       show6: false
    //     });
    //   }, 1600);
    // }

    if (this.state.profile.gender) request.gender = this.state.profile.gender;
    this.setState({ genderModal: 'Your gender Updated Successfully' });

    if (this.state.profile.birthdate)
      request.birthdate = this.state.profile.birthdate;
    this.setState({ birthdateModal: 'Your birthdate Updated Successfully' });

    axios
      .post('https://cubexs.net/tbhapp/accounts/updateprofile', {
        Account: request
      })
      .then(res => {
        console.log(res);
        if (res.data.code === 105) {
          this.setState({ verifyerror: res.data.error,validationerror:'' });
        } else if (res.data.code === 101 && this.state.profile.status==='verified') {
          this.setState({ verifyerror: '', validationerror: res.data.error });
        }
      })
      .catch(err => console.log(err));
  };

  verifyhere = e => {
    return <VerifyBy />;
  };
  render() {
    // if (this.state.profile.birthdate) {
    //   if (this.state.profile.birthdate.length > 13) {
    //     subBirthDate = this.state.profile.birthdate.substring(0, 10);
    //   }
    // }
    return (
      <div className="profilePage">
        <h1 className="firstChardivprofile">
          {this.props.user.firstName.charAt(0).toUpperCase() +
            this.props.user.lastName.charAt(0).toUpperCase()}
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
          <Row className="pt-4">
            <Col sm={12} md={4}>
              {' '}
              <Form.Label className="pl-3">BIRTHDATE</Form.Label>
              <div className="deadlineInput">
                {/* <DayPickerInput
                  value={subBirthDate}
                  onDayChange={this.handleDayChange}
                  dayPickerProps={{
                    selectedDays: this.state.selectedDay,
                    disabledDays: {
                      daysOfWeek: [0, 6]
                    }
                  }}
                /> */}

                <ReactDatez
                  name="dateInput"
                  handleChange={this.handleChangedate}
                  value={this.state.profile.birthdate}
                  allowPast={true}
                />
              </div>
            </Col>
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
          {this.state.verifyerror ? (
            <div className="pt-5 text-center m-auto">
              <span style={{ color: '#ed1c24', fontWeight: 'bold' }}>
                <i className="fas fa-exclamation-triangle px-2"></i> WARNING:
                {this.state.verifyerror} before any updates
              </span>
            </div>
          ) : null}
          {this.state.validationerror ? (
            <div className="pt-5 text-center m-auto">
              <span style={{ color: '#ed1c24', fontWeight: 'bold' }}>
                <i className="fas fa-exclamation-triangle px-2"></i>
                {this.state.validationerror} before any updates
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
          <div id="snackbar">{this.state.firstNameModal}</div>
        </Modal>
        <Modal className="mt-2 lastnameupdatesnackbar" show={this.state.show6}>
          <div id="snackbar">{this.state.lastNameModal}</div>
        </Modal>
        <Modal className="mt-2 genderupdatesnackbar" show={this.state.show7}>
          <div id="snackbar">{this.state.genderModal}</div>
        </Modal>
        <Modal className="mt-2 dateupdatesnackbar" show={this.state.show8}>
          <div id="snackbar">{this.state.birthdateModal}</div>
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
