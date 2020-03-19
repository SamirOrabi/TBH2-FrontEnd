import React, { Component } from 'react';
import { Container, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDate } from 'react-day-picker/moment';
import InviteToEvent from '../../sections/InviteToEvent';

class ListingEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      show: false,
      myerror: ''
    };
  }
  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios.post('https://cubexs.net/tbhapp/events/showallevents').then(res => {
      this.setState({ events: res.data.events });
      console.log(res);
    });
    // .catch(err => console.log(err));
  }
  handleShow = () => {
    this.setState({ show: true });
  };
  onReg = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/events/registerevent', {
        Account: {
          id: this.props.user.id
        },
        Event: {
          id: e.target.id
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.code === 130) {
          this.setState({
            myerror:
              'There is no remaining places left but you are now on queue list'
          });
        } else {
          this.setState({
            myerror: res.data.error
          });
        }
      });
    // .catch(err => console.log(err));
  };

  hideModal = e => {
    setTimeout(() => {
      this.setState({ show: e });
    }, 300);
  };
  render() {
    return (
      <div>
        <h1 className="text-center pb-3">All Events</h1>
        {this.state.events.map(event => {
          return (
            <Container
              style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }}
              className="pb-4 eventsCard w-50"
            >
              <h5> Event Name : {event.name}</h5>
              <p>Date From:{formatDate(event.dateFrom)}</p>
              <p>Date To: {formatDate(event.dateTo)}</p>
              <p>Collaborators: {event.collaborators}</p>
              <p>Type: {event.type}</p>
              <p>State: {event.state}</p>
              {event.amountOfPeople === event.maxNoOfPeople ? (
                <Button
                  id={event.id}
                  onClick={this.onReg}
                  className="mx-1 my-2"
                >
                  Put in Queue
                </Button>
              ) : (
                <Button
                  id={event.id}
                  onClick={this.onReg}
                  className="mx-1 my-2"
                >
                  Register
                </Button>
              )}

              <Button className="mx-1" onClick={this.handleShow}>
                Invite
                <InviteToEvent
                  show={this.state.show}
                  hideModal={this.hideModal}
                  eventId={event.id}
                />
              </Button>
              <Link to={`/eventDetails/${event.id}`}>
                {' '}
                <Button className="mx-1"> Details</Button>
              </Link>
              {this.state.myerror ? (
                <p style={{ color: 'red' }}>
                  {' '}
                  <i className="fas fa-exclamation-triangle px-2"></i>
                  {this.state.myerror}
                </p>
              ) : null}
            </Container>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(ListingEvents);
