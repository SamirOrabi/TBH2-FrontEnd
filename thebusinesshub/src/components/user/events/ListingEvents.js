import React, { Component } from 'react';
import { Container, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
 class ListingEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    
    };
  }
  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios.post('https://cubexs.net/tbhapp/events/showallevents').then(res => {
      this.setState({ events: res.data.events });
      console.log(res);
    });
    // .catch(err => console.log(err));


    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/accounts/getprofile', {
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        this.setState({ profileData: res.data.profile });
      })
  }

  onReg = e => {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios.post('https://cubexs.net/tbhapp/events/showallevents').then(res => {
      this.setState({ events: res.data.events });
      console.log(res);
    });
    // .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1 className="text-center pb-3">All Events</h1>
        {this.state.events.map(event => {
          return (
            <Container className="pb-4">
              <h5> Event Name : {event.name}</h5>
              <p>Date From:{event.dateFrom}</p>
              <p>Date To:{event.dateTo}</p>
              <p>Collaborators: {event.collaborators}</p>
              <p>Type: {event.type}</p>
              <p>State: {event.state}</p>
              <Button className="mx-1 my-2">Register</Button>
              <Button className="mx-1">Invite</Button>
              <Button className="mx-1">Details</Button>
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