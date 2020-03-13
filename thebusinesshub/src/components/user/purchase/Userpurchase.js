import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import isEqual from 'lodash/isEqual';
import '../../stylesheets/bookingsCss.css';
import { Table, Container, Button } from 'react-bootstrap';
class Userpurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userpurchase: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/packages/viewpackagesforuser', {
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        this.setState({ userpurchase: res.data.packages });
      });
  }

  CancelPendingPurchase = e => {
    console.log(e.target.id);
    axios.defaults.headers.common['authorization'] = localStorage.userToken;
    axios
      .post('https://cubexs.net/tbhapp/packages/cancelpackage', {
        Package: {
          code: e.target.id,
          status: 'canceled'
        },
        Account: {
          id: this.props.user.id
        }
      })
      .then(res => {
        this.setState({ userpurchase: this.state.userpurchase });

        console.log(res);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (isEqual(prevState.userpurchase, this.state.userpurchase)) {
      axios.defaults.headers.common['authorization'] = localStorage.userToken;
      axios
        .post('https://cubexs.net/tbhapp/packages/viewpackagesforuser', {
          Account: {
            id: this.props.user.id
          }
        })
        .then(res => {
          this.setState({ userpurchase: res.data.packages });
        });
    }
  }

  render() {
    return (
      <div>
        <Container>
          {this.state.userpurchase ? (
            this.state.userpurchase.length === 0 ? (
              <h1 className="nobookings">You have no purchase yet</h1>
            ) : (
              <div className="bookingtable">
                <div className="tabletype"> </div>

                <div className="tabletype mt-5">
                  <h5 className="py-2">UPCOMING</h5>
                </div>
                <React.Fragment>
                  <Table className="historytable">
                    <thead>
                      <tr>
                        <th>Package</th>
                        <th>Code</th>
                        <th>status</th>
                        <th>price</th>
                        <th>room type</th>
                        <th>Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.userpurchase.map((purchase, i) => (
                        <tr key={i} className="text-center bookingstr">
                          <td>{purchase.package}</td>
                          <td>{purchase.code}</td>
                          <td>{purchase.status}</td>
                          <td>{purchase.price}</td>
                          <td>{purchase.roomType}</td>
                          <td>{purchase.remaining}</td>
                          {purchase.status === 'pending' ? (
                            <td>
                              <Button
                                id={purchase.code}
                                onClick={this.CancelPendingPurchase}
                                className="cancelbtn"
                              >
                                {/* <i class="far fa-window-close"></i> */}
                                Cancel
                              </Button>
                            </td>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </React.Fragment>
              </div>
            )
          ) : (
            <h1 className="nobookings">You have no purchase yet</h1>
          )}
        </Container>
      </div>
    );
  }
}
const mapStatetoProps = state => ({
  user: state.auth.user
});
export default connect(mapStatetoProps)(withRouter(Userpurchase));
