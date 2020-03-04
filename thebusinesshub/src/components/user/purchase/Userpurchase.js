import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/bookingsCss.css';
import { Table, Container } from 'react-bootstrap';
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
        console.log(this.state.userpurchase);
      });
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
