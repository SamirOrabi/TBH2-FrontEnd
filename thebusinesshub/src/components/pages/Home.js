import React, { Component } from 'react';
import VerifyBy from '../sections/VerifyBy';

import Navb from '../layout/Navb';
export default class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
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
