import React, { Component } from 'react';
import SignUp from './SignUp';
import '../stylesheets/forms.css';
import { Container } from 'react-bootstrap';
import SignInForm from './SignInForm';
import axios from 'axios';
export default class SignInUp extends Component {
  handleSignUp = e => {
    const container = document.getElementById('FormsContainer');
    container.classList.add('right-panel-active');
  };

  handleSignIn = e => {
    const container = document.getElementById('FormsContainer');
    container.classList.remove('right-panel-active');
  };

  changepanel = e => {
    if (e) {
      this.handleSignUp();
    }
  };

  componentDidMount() {
    if (this.props.location.search !== '') {
      axios
        .get(
          'https://cubexs.net/tbhapp/accounts/confirmverifyemail' +
            this.props.location.search
        )
        .then(res => {
          // console.log('ress verify');
          // this.setState({ showbar: false });
          console.log(res);
        });
    }
  }

  render() {
    return (
      <div className="signupinbackground">
        {' '}
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="FormsContainer" id="FormsContainer">
            <div className="form-container sign-up-container">
              {' '}
              <SignInForm />
            </div>
            <div className="form-container sign-in-container">
              <SignUp handleSignIn={this.changepanel} />
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <Container>
                    <div className="overlaytexts">
                      <h1>Welcome Back!</h1>
                      <p>
                        To keep connected to us
                        <br /> please use your personal information
                      </p>{' '}
                      <div className="ORdiv">
                        <p>OR</p>
                      </div>
                      <p style={{ marginTop: '30px' }}>CREATE A NEW ACCOUNT</p>
                      <button id="signUp" onClick={this.handleSignIn}>
                        SIGN UP
                      </button>
                    </div>
                  </Container>
                </div>
                <div className="overlay-panel overlay-right">
                  <Container>
                    {' '}
                    <div className="overlaytexts">
                      <h1>
                        WELCOME TO OUR
                        <br /> COMMUNITY!
                      </h1>
                      <p>
                        Join us to reserve your spot and get
                        <br /> the latest news
                      </p>
                      <div className="ORdiv">
                        <p>OR</p>
                      </div>
                      <p style={{ marginTop: '30px' }}>
                        SIGN IN WITH YOUR ACCOUNT
                      </p>
                      <button id="SignIn" onClick={this.handleSignUp}>
                        SIGN IN
                      </button>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
