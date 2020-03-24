import React, { Component } from 'react';
// import Navb from '../layout/Navb';
import { connect } from 'react-redux';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
class Home extends Component {
  componentDidMount() {
    console.log('here');
    if (this.props.location.search !== '') {
      axios
        .get(
          'https://cubexs.net/tbhapp/accounts/confirmverifyemail' +
            this.props.location.search
        )
        .then(res => {
          console.log('ress verify email');
          // this.setState({ showbar: false });
          console.log(res);
        });
    }
  }
  render() {
    return <section className="homepage"></section>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});
export default connect(mapStateToProps)(withRouter(Home));
