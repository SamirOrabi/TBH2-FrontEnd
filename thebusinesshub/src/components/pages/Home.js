import React, { Component } from 'react';
// import Navb from '../layout/Navb';
import { connect } from 'react-redux';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import VerifyBarAlert from '../sections/VerifyBarAlert';
class Home extends Component {
 
  render() {
    return (
      <section className="homepage">
        <VerifyBarAlert />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});
export default connect(mapStateToProps)(withRouter(Home));
