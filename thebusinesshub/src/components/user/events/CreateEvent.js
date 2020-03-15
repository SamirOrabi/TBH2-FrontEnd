import React, { Component } from 'react';
import { Button, Form, Container, Col, Modal } from 'react-bootstrap';
import 'react-datez/dist/css/react-datez.css';
import { ReactDatez } from 'react-datez';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      datefrom: '',
      dateto: '',
      type: '',
      price: '',
      file: '',
      myerror: '',
      show2: false
    };
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleChangestartdate = value => {
    this.setState({ datefrom: value });
  };
  handleChangeenddate = value => {
    this.setState({ dateto: value });
  };

  setFile = e => {
    this.setState({ file: e.target.files[0] });
  };

  createEvent = e => {
    e.preventDefault();

    const eventdata = new FormData();
    eventdata.set(
      'Event',
      `{
      "name":"${this.state.name}",
      "dateFrom":"${this.state.datefrom}",
      "dateTo":"${this.state.dateto}",
      "type":"${this.state.type}",
      "price":"${this.state.price}",
      "description":"${this.state.description}"
    }`
    );
    eventdata.append('Account', `{"id":${this.props.user.id}}`);
    if (this.state.file) {
      eventdata.append('file1', this.state.file);
    }

    axios({
      method: 'post',
      url: 'https://cubexs.net/tbhapp/events/createeventform',
      data: eventdata,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: localStorage.userToken
      }
    }).then(res => {
      console.log(res);
      if (res.data.code === 0) {
        this.setState({ show2: true });
        setTimeout(() => {
          this.setState({ show2: false });
        }, 1900);
      } else {
        this.setState({ myerror: res.data.error });
      }
    });
  };
  render() {
    return (
      <div>
        <Container>
          <Form>
            <Form.Group>
              <Form.Control
                required
                type="text"
                onChange={this.handleUserInput}
                value={this.state.name}
                name="name"
                placeholder="Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                required
                type="text"
                onChange={this.handleUserInput}
                value={this.state.description}
                name="description"
                placeholder="Description"
              />
            </Form.Group>

            <div className="deadlineInput">
              <ReactDatez
                placeholder="Event will start on"
                name="datefrom"
                handleChange={this.handleChangestartdate}
                value={this.state.datefrom}
                allowPast={false}
              />
            </div>
            <div className="deadlineInput mt-3">
              <ReactDatez
                placeholder="Event will end on..."
                name="datefrom"
                handleChange={this.handleChangeenddate}
                value={this.state.dateto}
                allowPast={false}
              />
            </div>
            <Form.Group>
              <Form.Control
                required
                type="text"
                onChange={this.handleUserInput}
                value={this.state.type}
                name="type"
                placeholder="Type"
              />
            </Form.Group>
            <Button variant="contained" component="label">
              Upload File
              <input
                onChange={this.setFile}
                type="file"
                // style={{ display: 'none' }}
              />
            </Button>
            <Form.Group>
              <Form.Control
                required
                type="number"
                onChange={this.handleUserInput}
                value={this.state.price}
                name="price"
                placeholder="Price"
              />
            </Form.Group>

            <Col sm={12} className="text-center">
              <Button
                type="submit"
                className="my-4 cancelbtn"
                onClick={this.createEvent}
              >
                Create
              </Button>
              <Modal className=" feedBack" show={this.state.show2}>
                <div id="snackbar">Event Created Successfully!</div>
              </Modal>
            </Col>
          </Form>
          <p style={{ fontWeight: 'bold', color: '#ed1c24' }} className="mt-4">
            {this.state.myerror}
          </p>
        </Container>
      </div>
    );
  }
}
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(CreateEvent));
