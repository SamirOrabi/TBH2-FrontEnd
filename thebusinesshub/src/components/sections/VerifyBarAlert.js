import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import VerifyBy from './VerifyBy';
import { connect } from 'react-redux';
import axios from 'axios';
import isEqual from 'lodash/isEqual';

class VerifyBarAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      mystate: 'verified'
    };
  }
  componentDidMount() {
    this.getProfile();
  }
  handleShow = () => {
    this.setState({ show: true });
  };
  closeModal = e => {
    // this.setState({ show: !this.state.show });
    setTimeout(() => {
      this.setState({ show: false });
    }, 0);
  };

  getProfile = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/getprofile', {
        Account: {
          id: this.props.user.id
        }
      })

      .then(res => {
        this.setState({ mystate: res.data.state });
      })
      // .catch(err => console.log(err));
  };

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState, this.state)) {
      this.getProfile();
    }
  }

  render() {
 

    return (
      <div>
        {this.state.mystate !== 'verified' ? (
          <Container className="alertVerify m-auto">
            <Row className="text-center m-auto">
              <Col sm={12}>
                <Button onClick={this.handleShow}>
                  <i className="fas fa-exclamation-triangle px-2"></i>
                  <span> Please verify your phone number </span>
                  <VerifyBy
                    closeModal={this.closeModal}
                    show={this.state.show}
                  />
                </Button>
              </Col>
            </Row>
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(VerifyBarAlert));
