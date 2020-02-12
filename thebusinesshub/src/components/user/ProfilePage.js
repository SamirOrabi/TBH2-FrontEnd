// import React, { Component } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { NavLink, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import DatePicker from 'react-date-picker';
// import axios from 'axios';

// let editedFName;
// let chosenGender;
// class ProfilePage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       gender: '',
//       birthDate: new Date(),
//       profileInfo: []
//     };
//   }

//   componentDidMount() {
//     axios.defaults.headers.common['authorization'] = localStorage.userToken;
//     axios
//       .post('http://18.185.138.12:5000/api/accounts/getprofile', {
//         Account: {
//           ownerId: this.props.user.id
//         }
//       })
//       .then(res => {
//         this.setState({ profileInfo: res.data.profile });
//         console.log(this.state.profileInfo);
//       });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState === this.state) {
//       axios.defaults.headers.common['authorization'] = localStorage.userToken;
//       axios
//         .post('http://18.185.138.12:5000/api/accounts/getprofile', {
//           Account: {
//             ownerId: this.props.user.id
//           }
//         })
//         .then(res => {
//           this.setState({ profileInfo: res.data.profile });
//           console.log(editedFName);
//         });
//     }
//   }

//   OnChangefirstname = e => {
//     this.setState({ [e.target.name]: e.target.value });
//     editedFName = e.target.value;
//     this.props.user.firstName = editedFName;
//   };
//   onChangeBirthDate = birthDate => this.setState({ birthDate });

//   onSelectGender = e => {
//     this.setState({ [this.state.gender.name]: e.target.value });
//     chosenGender = e.target.value;
//     console.log(chosenGender);
//   };

//   OnEditProfile = e => {
//     e.preventDefault();

//     axios.defaults.headers.common['authorization'] = localStorage.userToken;

//     let request = {};
//     request.ownerId = this.state.profileInfo.ownerId;
//     if (this.state.birthDate) request.birthdate = this.state.birthDate;
//     if (chosenGender) request.gender = chosenGender;
//     if (this.state.profileInfo.firstName)
//       request.firstName = this.state.profileInfo.firstName;

//     axios
//       .post('http://18.185.138.12:5000/api/accounts/updateprofile', {
//         Account: request
//       })
//       .then(res => {
//         this.props.user.firstName = editedFName;
//         this.state.profileInfo.firstName = this.props.user.firstName;
//         console.log(res);
//         console.log(editedFName);
//       })
//       .catch(err => console.log(err));
//   };
//   render() {
//     return (
//       <div className="profilePage">
//         <h1 className="firstChardivprofile">
//           {this.props.user.firstName.substring(0, 1)}
//         </h1>
//         <h3 style={{ textAlign: 'center' }} className="pt-1">
//           {this.state.profileInfo.username}
//         </h3>
//         <p style={{ textAlign: 'center', color: '#7e7e7e' }} className="pb-5">
//           {this.state.profileInfo.email}
//         </p>
//         <Container>
//           <Row>
//             <Col sm={12} md={5}>
//               {' '}
//               <Form.Label className="pl-3">FIRST NAME</Form.Label>
//               <Form.Group>
//                 <Form.Control
//                   noValidate
//                   required
//                   type="text"
//                   name="name"
//                   value={this.props.user.firstName}
//                   onChange={this.OnChangefirstname}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={1}></Col>
//             <Col sm={12} md={5}>
//               {' '}
//               <Form.Label className="pl-3">LAST NAME</Form.Label>
//               <Form.Group>
//                 <Form.Control
//                   noValidate
//                   required
//                   type="text"
//                   name="name"
//                   value={this.state.profileInfo.lastName}
//                 />
//               </Form.Group>{' '}
//             </Col>
//           </Row>

//           <Row className="pt-4">
//             <Col sm={12} md={4}>
//               {' '}
//               <Form.Label className="pl-3">BIRTHDATE</Form.Label>
//               <div className="deadlineInput">
//                 <DatePicker
//                   onChange={this.onChangeBirthDate}
//                   value={this.state.birthDate}
//                 />{' '}
//               </div>
//             </Col>
//             <Col md={2}></Col>
//             <Col sm={12} md={3}>
//               <Form.Label className="pl-3">GENDER</Form.Label>
//               <div className="genderdrop">
//                 <select
//                   className="browser-default"
//                   value={this.state.gender.value}
//                   onChange={this.onSelectGender}
//                   name={this.state.gender.name}
//                 >
//                   <option selected disabled>
//                     Gender
//                   </option>
//                   <option name="Male" value="Male">
//                     {' '}
//                     Male{' '}
//                   </option>
//                   <option name="Female" value="Female">
//                     {' '}
//                     Female{' '}
//                   </option>
//                 </select>
//               </div>
//             </Col>
//           </Row>
//           <Row style={{ textAlign: 'center', margin: 'auto' }}>
//             {' '}
//             <Button className="profilesaveBtn" onClick={this.OnEditProfile}>
//               SAVE
//             </Button>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }
// const mapStatetoProps = state => ({
//   isAuth: state.auth.isAuth,
//   user: state.auth.user
// });
// export default connect(mapStatetoProps)(withRouter(ProfilePage));

import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import axios from 'axios';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: [],
      birthDate: Date(this.props.user.birthdate)
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
    this.setState({ [e.target.name]: e.target.value });
    this.state.profileInfo.firstName = e.target.value;
    console.log(this.state.profileInfo.firstName);
  };

  OnChangelastname = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.profileInfo.lastName = e.target.value;
    console.log(this.state.profileInfo.lastName);
  };

  OnChangegender = e => {
    this.setState({ gender: e.target.value });
    this.state.profileInfo.gender = e.target.value;
    console.log(this.state.profileInfo.gender);
  };

  OnChangeBirthDate = birthDate => {
    this.setState({ birthDate: birthDate });
    this.state.profileInfo.birthdate = birthDate;
    console.log(birthDate);
  };
  OnEditProfile = e => {
    e.preventDefault();

    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    if (this.props.user.status === 'pending') {
      
    } else {
      let request = {};
      request.ownerId = this.state.profileInfo.ownerId;
      if (this.state.profileInfo.firstName)
        request.firstName = this.state.profileInfo.firstName;

      if (this.state.profileInfo.lastName)
        request.lastName = this.state.profileInfo.lastName;

      if (this.state.profileInfo.gender)
        request.gender = this.state.profileInfo.gender;

      if (this.state.profileInfo.birthdate)
        request.birthdate = this.state.profileInfo.birthdate;

      axios
        .post('http://18.185.138.12:5000/api/accounts/updateprofile', {
          Account: request
        })
        .then(res => {
          console.log(res);
          console.log(this.state.profileInfo.firstName);
        })
        .catch(err => console.log(err));
    }
  };
  render() {
    return (
      <div className="profilePage">
        <Container>
          <Row>
            <Col sm={12} md={5}>
              <Form.Label className="pl-3">FIRST NAME</Form.Label>
              <Form.Group>
                <Form.Control
                  noValidate
                  type="text"
                  onChange={this.OnChangefirstname}
                  value={this.state.profileInfo.firstName}
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
                  onChange={this.OnChangelastname}
                  value={this.state.profileInfo.lastName}
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
                <DatePicker
                  onChange={this.OnChangeBirthDate}
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
                  value={this.state.profileInfo.gender}
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
