import React, { Component } from 'react';
import VerifyBy from '../sections/VerifyBy';
// import Navb from '../layout/Navb';
import { connect } from 'react-redux';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props) {
      console.log('home');

      console.log(this.props);
    }
  }
  render() {
    return (
      <section className="homepage">
        {' '}
        <VerifyBy />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});
export default connect(mapStateToProps)(withRouter(Home));
