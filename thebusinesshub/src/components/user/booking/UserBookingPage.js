import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../stylesheets/bookingsCss.css';
import { Table, Container, Button, Modal } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import EditSlot from './EditSlot';
import { Transition, animated } from 'react-spring/renderprops';

class UserBookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userbook: [],
      show: false,
      showedit: null
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
        this.setState({ userbook: res.data.bookings });
        // this.state.userbook.map(info => {
        //   this.setState({ [info.id]: false });
        // });
      });
  }

  CancelPendingBook = id => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/bookings/cancelpending', {
        Account: {
          id: this.props.user.id
        },
        Booking: {
          id: id.target.id
        }
      })
      .then(res => {
        this.setState({ userbook: this.state.userbook });
        if (res.data.code === 0) {
          this.setState({ show: true });
          setTimeout(() => {
            this.setState({ show: false });
          }, 1600);
        }
      });
  };

  openeditTimeSlotModal = id => {
    this.setState({ showedit: id });
  };

  hideModal = () => {
    this.setState({ showedit: null });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState, this.state)) {
      axios.defaults.headers.common['authorization'] = localStorage.userToken;
      axios
        .post('https://cubexs.net/tbhapp/bookings/showmybookings', {
          Account: {
            id: this.props.user.id
          }
        })
        .then(res => {
          this.setState({ userbook: res.data.bookings });
        });
    }
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
                <h5 className="py-2">HISTORY</h5>
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
                        book.date > todaydate && (
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
                                  alt="vodafone"
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
                <h5 className="py-2">UPCOMING</h5>
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
                        book.date <= todaydate && (
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
                                <img
                                  alt="vodafone"
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
                            {book.status === 'canceled' || book.status==='expired' ||book.status==='confirmed' ? (
                              <td
                                style={{
                                  textTransform: 'uppercase',
                                  color: '#ed1c24'
                                }}
                              >
                                {book.status}
                              </td>
                            ) : (
                              <React.Fragment>
                                <td style={{ textTransform: 'uppercase' }}>
                                  {book.status}
                                </td>
                                <td>
                                  <Button
                                    id={book.id}
                                    onClick={this.CancelPendingBook}
                                    className="cancelbtn"
                                  >
                                    {/* <i class="far fa-window-close"></i> */}
                                    Cancel
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    id={book.id}
                                    onClick={() =>
                                      this.openeditTimeSlotModal(book.id)
                                    }
                                    className="cancelbtn"
                                  >
                                    {/* <i class="fas fa-edit"></i> */}
                                    Edit
                                  </Button>

                                  <Modal
                                    show={this.state.showedit === book.id}
                                    onHide={this.hideModal}
                                  >
                                    <Modal.Body className="verifyby">
                                      <EditSlot
                                        slotdate={book.date.substring(0, 10)}
                                        id={book.id}
                                        book={book}
                                        hideModal={this.hideModal}
                                      />
                                    </Modal.Body>
                                  </Modal>
                                </td>
                              </React.Fragment>
                            )}{' '}
                          </tr>
                        )
                    )}{' '}
                  </tbody>
                </Table>
              </React.Fragment>
              <Modal
                className="mt-2 firstnameupdatesnackbar"
                show={this.state.show}
              >
                <div id="snackbar">Your book is canceled successfully</div>
              </Modal>
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
