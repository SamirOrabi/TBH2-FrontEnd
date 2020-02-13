import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Test1 from '../sections/Test1';

import { withRouter } from 'react-router-dom';
import VerifyBy from '../sections/VerifyBy';
class Contact extends Component {
  componentDidMount() {
    console.log('here in contact');
    console.log(this.props.user.id);
  }
  render() {
    return (
      <div>
        {/* <VerifyBy /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});
export default connect(mapStateToProps)(withRouter(Contact));
