import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
class Test1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log('here in test');

    console.log(this.props.user);
  }

  render() {
    return <Container className="mt-5 w-50"></Container>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});
export default connect(mapStateToProps)(withRouter(Test1));
