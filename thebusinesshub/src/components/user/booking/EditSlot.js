import React, { Component } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { formatDate } from 'react-day-picker/moment';
import isEqual from 'lodash/isEqual';

import { withRouter } from 'react-router-dom';
let roomID;
class EditSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slot: '',
      show2: false,
      tbhdata: [],
      allslots: [
        '09AM',
        '10AM',
        '11AM',
        '12PM',
        '01PM',
        '02PM',
        '03PM',
        '04PM',
        '05PM',
        '06PM',
        '07PM',
        '08PM'
      ],
      selectedslot: '',
      busyslots: [],
      myerror: ''
    };
  }

  handleClose = e => {
    this.props.hideModal(false);
  };

  componentDidMount() {
    console.log(this.props.roomNumber);

    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/bookings/showcalendar', {
        BookingDate: {
          from: this.props.slotdate,
          to: this.props.slotdate
        }
      })
      .then(res => {
        this.setState({ tbhdata: res.data.bookings });
      });
  }
  OnChangeSlot = e => {
    this.setState({
      selectedslot: e.target.value
    });
  };
  editTimeSlot = id => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/bookings/editbookingtiming', {
        Account: {
          id: this.props.user.id
        },
        Booking: {
          id: this.props.id,
          slot: [this.state.selectedslot],
          date: formatDate(this.props.slotdate)
        }
      })

      .then(res => {
        if (res.data.code === 0) {
          this.setState({ show2: true });
          setTimeout(() => {
            this.setState({ show2: false });

            this.props.hideModal(false);
          }, 1900);
        } else {
          this.setState({ myerror: 'Slot is not allowed to be empty' });
        }
      });
    // .catch(err => console.log(err));
  };

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState, this.state)) {
      axios.defaults.headers.common['authorization'] = localStorage.userToken;
      axios
        .post('https://cubexs.net/tbhapp/bookings/showcalendar', {
          BookingDate: {
            from: this.props.slotdate,
            to: this.props.slotdate
          }
        })
        .then(res => {
          this.setState({ tbhdata: res.data.bookings });
        });
    }
  }

  render() {
    this.state.tbhdata.map((slot, i) => {
      roomID = slot.roomNumber;
      if (this.props.roomNumber === slot.roomNumber) {
        this.state.busyslots.push(slot.slot);
      }
    });
    this.diff = (arr1, arr2) => {
      var newArray = arr2.concat(arr1);
      var newestArray = [];
      for (var i = 0; i < newArray.length; i++) {
        if (arr1.indexOf(newArray[i]) === -1) {
          newestArray.push(newArray[i]);
        }
        if (arr2.indexOf(newArray[i]) === -1) {
          newestArray.push(newArray[i]);
        }
      }

      return newestArray;
    };
    return (
      <Container className="w-50">
        <div>
          <h4>Change slot time</h4>
          <div>
            <div className="slotdrop">
              <select
                className="browser-default"
                name="selectedslot"
                value={this.state.selectedslot}
                onChange={this.OnChangeSlot}
              >
                <option selected>Choose Slot</option>
                {this.diff(this.state.allslots, this.state.busyslots).map(
                  slot => (
                    <option value={slot} name={slot}>
                      {slot}
                    </option>
                  )
                )}
              </select>
            </div>
            <Button onClick={this.editTimeSlot} className="mt-3 cancelbtn">
              Confirm
            </Button>
            <Modal className=" firstnameupdatesnackbar" show={this.state.show2}>
              <div id="snackbar">Slot Edited Successfully!</div>
            </Modal>
          </div>
        </div>
        <p style={{ fontWeight: 'bold' }} className="mt-4">
          {this.state.myerror}
        </p>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});
export default connect(mapStateToProps)(withRouter(EditSlot));
