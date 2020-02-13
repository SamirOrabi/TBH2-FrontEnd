import React, { Component } from 'react';
import SignUp from './SignUp';
import '../stylesheets/forms.css';
import { Container } from 'react-bootstrap';
import SignInForm from './SignInForm';
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

  render() {
    return (
      <div className="signupinbackground">
        {' '}
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <div class="FormsContainer" id="FormsContainer">
            <div class="form-container sign-up-container">
              {' '}
              <SignInForm />
            </div>
            <div class="form-container sign-in-container">
              <SignUp handleSignIn={this.changepanel} />
            </div>
            <div class="overlay-container">
              <div class="overlay">
                <div class="overlay-panel overlay-left">
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
                <div class="overlay-panel overlay-right">
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
