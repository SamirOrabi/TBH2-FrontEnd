import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { formatDate } from 'react-day-picker/moment';
import InviteToEvent from '../../sections/InviteToEvent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myerror: '',
      show: false
    };
  }
  onReg = e => {
    // console.log(e.target.id);
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/events/registerevent', {
        Account: {
          id: this.props.user.id
        },
        Event: {
          id: this.props.id
        }
      })
      .then(res => {
        console.log(res);
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
  handleShow = () => {
    this.setState({ show: true });
  };
  hideModal = e => {
    setTimeout(() => {
      this.setState({ show: e });
    }, 300);
  };
  render() {
    return (
      <div>
        <Container
          style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }}
          className="pb-4 my-4 eventsCard w-50"
        >
          <h5> Event Name : {this.props.name}</h5>
          <h5> Event id : {this.props.id}</h5>
          <p>Date From:{formatDate(this.props.dateFrom)}</p>
          <p>Date To: {formatDate(this.props.dateTo)}</p>
          <p>Collaborators: {this.props.collaborators}</p>
          <p>Type: {this.props.type}</p>
          <p>State: {this.props.state}</p>
          {this.props.amountOfPeople === this.props.maxNoOfPeople ? (
            <Button
              id={this.props.id}
              onClick={this.onReg}
              className="mx-1 my-2"
            >
              Put in Queue
            </Button>
          ) : (
            <Button
              id={this.props.id}
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
              eventId={this.props.id}
            />
          </Button>
          <Link to={`/eventDetails/${this.props.id}`}>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(EventCard);
