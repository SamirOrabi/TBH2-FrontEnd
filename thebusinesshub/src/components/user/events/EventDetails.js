import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import InviteToEvent from '../../sections/InviteToEvent';
import { formatDate } from 'react-day-picker/moment';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDetails: '',
      show: false,
      myerror: '',
      cancleMe: false
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  hideModal = e => {
    setTimeout(() => {
      this.setState({ show: e });
    }, 300);
  };
  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/events/showevent', {
        Event: {
          id: this.props.match.params.id
        }
      })
      .then(res => {
        this.setState({ eventDetails: res.data.events });
        console.log(res);
      });
    // .catch(err => console.log(err));
  }
  onReg = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/events/registerevent', {
        Account: {
          id: this.props.user.id
        },
        Event: {
          id: this.props.match.params.id
        }
      })
      .then(res => {
        // console.log(res);
        if (res.data.code === 0) {
          this.setState({ cancleMe: true });
        }
        if (res.data.code === 130) {
          this.setState({
            myerror:
              'There is no remaining places left but you are now on queue list'
          });
        } else if (res.data.code === 109) {
          this.setState({
            myerror: 'please register and verify your account first'
          });
        } else {
          this.setState({
            myerror: res.data.error
          });
        }
      });
    // .catch(err => console.log(err));
  };

  onCancel = e => {
    // console.log('hey');
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/events/cancelregisterationbyeventid', {
        Account: {
          id: this.props.user.id
        },
        Event: {
          id: e.target.id
        }
      })
      .then(res => {
        // console.log(res);
        if (res.data.code === 0) {
          this.setState({ cancleMe: false });
        }
        if (res.data.error) {
          this.setState({
            myerror: res.data.error
          });
        }
      });
  };

  render() {
    return (
      <div>
        <h1 className="text-center pb-3"> Event Details</h1>

        <Container className="pb-4">
          <h5> Event Name : {this.state.eventDetails.name}</h5>
          <p>Date From:{formatDate(this.state.eventDetails.dateFrom)}</p>
          <p>Date To:{formatDate(this.state.eventDetails.dateTo)}</p>
          <p>Collaborators: {this.state.eventDetails.collaborators}</p>
          <p>Type: {this.state.eventDetails.type}</p>
          <p>State: {this.state.eventDetails.state}</p>
          <p>Description: {this.state.eventDetails.description}</p>
          <p>Price: {this.state.eventDetails.price}</p>
          <p>Link: {this.state.eventDetails.link}</p>
          <p>amount Of People: {this.state.eventDetails.amountOfPeople}</p>
          <p>max Number Of People: {this.state.eventDetails.maxNoOfPeople}</p>
          <p>facebook Page: {this.state.eventDetails.facebookPage}</p>
          <p>instagram Page: {this.state.eventDetails.instagramPage}</p>

          {this.state.cancleMe === false ? (
            this.state.eventDetails.amountOfPeople ===
            this.state.eventDetails.maxNoOfPeople ? (
              <Button
                id={this.state.eventDetails.id}
                onClick={this.onReg}
                className="mx-1 my-2"
              >
                {' '}
                Put in Queue
              </Button>
            ) : (
              <Button
                id={this.state.eventDetails.id}
                onClick={this.onReg}
                className="mx-1 my-2"
              >
                Register
              </Button>
            )
          ) : (
            <Button
              id={this.state.eventDetails.id}
              onClick={this.onCancel}
              className="mx-1 my-2"
            >
              Cancel
            </Button>
            // console.log('heyy')
          )}
          <Button className="mx-1" onClick={this.handleShow}>
            Invite
            <InviteToEvent
              show={this.state.show}
              hideModal={this.hideModal}
              eventId={this.props.match.params.id}
            />
          </Button>

          {this.state.myerror ? (
            <p style={{ color: 'red' }}>
              {' '}
              <i className="fas fa-exclamation-triangle px-2"></i>
              {this.state.myerror}
            </p>
          ) : null}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(EventDetails);
