import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../stylesheets/bookingsCss.css';
import { Table } from 'react-bootstrap';
class BookingPage extends Component {
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
    return (
      <div>
        {this.state.userbook.length === 0 && (
          <h1 className="nobookings">You have no bookings yet</h1>
        )}
        {this.state.userbook.length > 0 && (
          <div className="bookingtable">
            <Table>
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
                {this.state.userbook.map((book, i) => (
                  <tr key={i} className="text-center bookingstr">
                    <td>{book.roomType}</td>
                    <td>{book.date.substring(0, 10)}</td>
                    <td>{book.slot}</td>
                    <td>{book.amountOfPeople}</td>
                    <td>{book.paymentMethod}</td>
                    {book.packageCode === null ? (
                      <td>-</td>
                    ) : (
                      <td>{book.packageCode}</td>
                    )}{' '}
                    <td>{book.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}
const mapStatetoProps = state => ({
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(BookingPage));
