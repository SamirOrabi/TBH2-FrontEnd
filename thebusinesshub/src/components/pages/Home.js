import React, { Component } from 'react';
// import Navb from '../layout/Navb';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
class Home extends Component {
 
  render() {
    return (
      <section className="homepage">
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});
export default connect(mapStateToProps)(withRouter(Home));
