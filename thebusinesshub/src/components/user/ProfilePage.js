import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import axios from 'axios';

let chosenGender;
class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      gender: '',
      birthDate: new Date(),
      profileInfo: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('http://18.185.138.12:5000/api/accounts/getprofile', {
        Account: {
          ownerId: this.props.user.id
        }
      })
      .then(res => {
        this.setState({ profileInfo: res.data.profile });
        console.log(this.state.profileInfo);
      });
  }

  

  OnChangefirstname = e => {
    const newInfo = this.state.profileInfo;
    this.state.profileInfo.firstName = e.target.value;
    this.setState({ profileInfo: newInfo });
    console.log(e.target.value);
  };
  onChangeBirthDate = birthDate => this.setState({ birthDate });

  onSelectGender = e => {
    this.setState({ [this.state.gender]: e.target.value });
    chosenGender = e.target.value;
    console.log(chosenGender);
  };

  OnEditProfile = e => {
    e.preventDefault();

    axios.defaults.headers.common['authorization'] = localStorage.userToken;

    let request = {};
    request.ownerId = this.props.user.id;
    if (this.state.birthDate) request.birthdate = this.state.birthDate;
    if (chosenGender) request.gender = chosenGender;
    if (this.state.profileInfo.firstName)
      request.firstName = this.state.profileInfo.firstName;

    axios
      .post('http://18.185.138.12:5000/api/accounts/updateprofile', {
        Account: request
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="profilePage">
        <h1 className="firstChardivprofile">
          {this.props.user.firstName.substring(0, 1)}
        </h1>
        <h3 style={{ textAlign: 'center' }} className="pt-1">
          {this.state.profileInfo.username}
        </h3>
        <p style={{ textAlign: 'center', color: '#7e7e7e' }} className="pb-5">
          {this.state.profileInfo.email}
        </p>
        <Container>
          <Row>
            <Col sm={12} md={5}>
              {' '}
              <Form.Label className="pl-3">FIRST NAME</Form.Label>
              <Form.Group>
                <Form.Control
                  noValidate
                  required
                  type="text"
                  name="name"
                  value={this.state.profileInfo.firstName}
                  onChange={this.OnChangefirstname}
                />
              </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col sm={12} md={5}>
              {' '}
              <Form.Label className="pl-3">LAST NAME</Form.Label>
              <Form.Group>
                <Form.Control
                  noValidate
                  required
                  type="text"
                  name="name"
                  value={this.state.profileInfo.lastName}
                />
              </Form.Group>{' '}
            </Col>
          </Row>

          <Row className="pt-4">
            <Col sm={12} md={4}>
              {' '}
              <Form.Label className="pl-3">BIRTHDATE</Form.Label>
              <div className="deadlineInput">
                <DatePicker
                  onChange={this.onChangeBirthDate}
                  value={this.state.birthDate}
                />{' '}
              </div>
            </Col>
            <Col md={2}></Col>
            <Col sm={12} md={3}>
              <Form.Label className="pl-3">GENDER</Form.Label>
              <div className="genderdrop">
                <select
                  className="browser-default"
                  value={this.state.gender.value}
                  onChange={this.onSelectGender}
                  name={this.state.gender.name}
                >
                  <option selected disabled>
                    Gender
                  </option>
                  <option name="" value="Male">
                    {' '}
                    Male{' '}
                  </option>
                  <option name="" value="Female">
                    {' '}
                    Female{' '}
                  </option>
                </select>
              </div>
            </Col>
          </Row>
          <Row style={{ textAlign: 'center', margin: 'auto' }}>
            {' '}
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
