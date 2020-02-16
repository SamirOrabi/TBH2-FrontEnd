import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import VerifyBy from '../sections/VerifyBy';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
let subBirthDate;
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      profileInfo: [],
      profile: [],
      selectedDay: undefined,
      isEmpty: true,
      isDisabled: false
    };
  }

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      selectedDay,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true
    });
    this.state.profile.birthdate = this.state.selectedDay;
  }

  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios.post('https://cubexs.net/tbhapp/accounts/getprofile' , {
    Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        this.setState({ profileInfo: res.data });
        this.setState({ profile: res.data.profile });
        // this.setState({ selectedDay: res.data.profile.birthdate });
        console.log(this.state.profileInfo);
      });
  }

  OnChangefirstname = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.profile.firstName = e.target.value;
    this.props.user.firstName = this.state.profile.firstName;
    console.log(this.state.profileInfo.profile.firstName);
  };

  OnChangelastname = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.profile.lastName = e.target.value;
    console.log(this.state.profileInfo.lastName);
  };

  OnChangegender = e => {
    this.setState({ gender: e.target.value });
    this.state.profile.gender = e.target.value;
    console.log(this.state.profile.gender);
  };

  // OnChangeBirthDate = birthDate => {
  //   // birthDate.preventDefault();
  //   console.log('ehhhhhhhh');
  //   this.setState({ birthDate });
  //   console.log(birthDate);
  // };

  OnEditProfile = e => {
    e.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    let request = {};
    request.ownerId = this.state.profile.ownerId;
    if (this.state.profile.firstName)
      request.firstName = this.state.profile.firstName;

    if (this.state.profile.lastName)
      request.lastName = this.state.profile.lastName;

    if (this.state.profile.gender) request.gender = this.state.profile.gender;

    if (this.state.selectedDay) request.birthdate = this.state.selectedDay;

    axios
      .post('http://18.185.138.12:5000/api/accounts/updateprofile', {
        Account: request
      })
      .then(res => {
        console.log(res);
        console.log(this.state.selectedDay.toLocaleDateString());
      })
      .catch(err => console.log(err));
  };
  render() {
    if (this.state.profile.birthdate) {
      subBirthDate = this.state.profile.birthdate.substring(0, 10);
      console.log(subBirthDate);
    }
    return (
      <div className="profilePage">
        {this.state.profileInfo.state === 'pending' && <VerifyBy />}
        <h1 className="firstChardivprofile">
          {this.props.user.firstName.substring(0, 1)}
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
              <Form.Label className="pl-3">FIRST NAME</Form.Label>
              <Form.Group>
                <Form.Control
                  noValidate
                  type="text"
                  style={{ color: '#000' }}
                  onChange={this.OnChangefirstname}
                  value={this.state.profile.firstName}
                  name="firstName"
                />
              </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col sm={12} md={5}>
              <Form.Label className="pl-3">LAST NAME</Form.Label>
              <Form.Group>
                <Form.Control
                  noValidate
                  type="text"
                  style={{ color: '#000' }}
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
                {/* <DatePicker
                  // format='MM-dd-yyyy'
                  onChange={value => this.OnChangeBirthDate(value)}
                  // value={moment().format(this.state.birthDate)}
                  // value={this.state.profile.birthdate}
                  // onSelect={() => this.OnChangeBirthDate()} //when day is clicked
                  showTimeSelect
                  value={this.state.profile.birthdate}
                  // selected={this.state.birthDate}
                />{' '} */}

                <DayPickerInput
                  value={subBirthDate}
                  onDayChange={this.handleDayChange}
                  dayPickerProps={{
                    selectedDays: this.state.selectedDay,
                    disabledDays: {
                      daysOfWeek: [0, 6]
                    }
                  }}
                />
              </div>
            
            </Col>
            <Col md={2}></Col>
            <Col sm={12} md={4}>
              <Form.Label className="pl-3">GENDER</Form.Label>
              <div className="genderdrop">
                <select
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
          </Row>
          <Row style={{ textAlign: 'center', margin: 'auto' }}>
            <Button className="profilesaveBtn" onClick={this.OnEditProfile}>
              SAVE
            </Button>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(ProfilePage));
