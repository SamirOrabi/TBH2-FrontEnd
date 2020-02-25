import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../stylesheets/bookingsCss.css';
import { Table, Container } from 'react-bootstrap';
class UserBookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userbook: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/bookings/showmybookings', {
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        console.log(res.data.bookings);

        this.setState({ userbook: res.data.bookings });
      });
  }

  render() {
    const today = new Date();
    var todaydate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    return (
      <Container>
        {this.state.userbook ? (
          this.state.userbook.length === 0 ? (
            <h1 className="nobookings">You have no bookings yet</h1>
          ) : (
            <div className="bookingtable">
              <div className="tabletype">
                {' '}
                <h5 className="py-2">UPCOMING</h5>
              </div>
              <React.Fragment>
                <Table className="upcometable">
                  <thead>
                    <tr>
                      <th>ROOM</th>
                      <th>DATE</th>
                      <th>SLOT</th>
                      <th>NUMBER OF PEOPLE</th>
                      <th>PAYMENT METHOD</th>
                      <th>PACKAGE CODE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>{' '}
                  <tbody>
                    {this.state.userbook.map(
                      (book, i) =>
                        (book.date = todaydate || book.date > todaydate) && (
                          <tr key={i} className="text-center bookingstr">
                            <td>{book.roomType}</td>
                            <td>{book.date.substring(0, 10)}</td>
                            <td>{book.slot}</td>
                            <td>{book.amountOfPeople}</td>
                            {book.paymentMethod === 'cash' ? (
                              <td>
                                <i
                                  class="far fa-money-bill-alt fa-2x"
                                  style={{ color: '#ed1c24' }}
                                ></i>
                              </td>
                            ) : (
                              <td>
                                {' '}
                                <img
                                  src={require('../../../Images/vodafone.png')}
                                  style={{ width: '50px', height: '50px' }}
                                />
                              </td>
                            )}{' '}
                            {book.packageCode === '' ? (
                              <td>---</td>
                            ) : (
                              <td>{book.packageCode}</td>
                            )}
                            {book.status === 'canceled' ? (
                              <td
                                style={{
                                  textTransform: 'uppercase',
                                  color: '#ed1c24'
                                }}
                              >
                                {book.status}
                              </td>
                            ) : (
                              <td style={{ textTransform: 'uppercase' }}>
                                {book.status}
                              </td>
                            )}
                          </tr>
                        )
                    )}{' '}
                  </tbody>
                </Table>
              </React.Fragment>
              <div className="tabletype mt-5">
                <h5 className="py-2">HISTORY</h5>
              </div>
              <React.Fragment>
                <Table className="historytable">
                  <thead>
                    <tr>
                      <th>ROOM</th>
                      <th>DATE</th>
                      <th>SLOT</th>
                      <th>NUMBER OF PEOPLE</th>
                      <th>PAYMENT METHOD</th>
                      <th>PACKAGE CODE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userbook.map(
                      (book, i) =>
                        book.date < todaydate && (
                          <tr key={i} className="text-center bookingstr">
                            <td>{book.roomType}</td>
                            {console.log('ahahha')}
                            {console.log(book.date)}
                            <td>{book.date.substring(0, 10)}</td>
                            <td>{book.slot}</td>
                            <td>{book.amountOfPeople}</td>
                            {book.paymentMethod === 'cash' ? (
                              <td>
                                <i
                                  class="far fa-money-bill-alt fa-2x"
                                  style={{ color: '#ed1c24' }}
                                ></i>
                              </td>
                            ) : (
                              <td>
                                <img
                                  src={require('../../../Images/vodafone.png')}
                                  style={{ width: '70px', height: '70px' }}
                                />
                              </td>
                            )}
                            {book.packageCode === '' ? (
                              <td>---</td>
                            ) : (
                              <td>{book.packageCode}</td>
                            )}
                            {book.status === 'canceled' ? (
                              <td
                                style={{
                                  textTransform: 'uppercase',
                                  color: '#ed1c24'
                                }}
                              >
                                {book.status}
                              </td>
                            ) : (
                              <td style={{ textTransform: 'uppercase' }}>
                                {book.status}
                              </td>
                            )}{' '}
                          </tr>
                        )
                    )}{' '}
                  </tbody>
                </Table>
              </React.Fragment>
            </div>
          )
        ) : (
          <h1 className="nobookings">You have no bookings yet</h1>
        )}
      </Container>
    );
  }
}
const mapStatetoProps = state => ({
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(UserBookingPage));
