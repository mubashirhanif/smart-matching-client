import React, { Component } from 'react';
import './User.css';
import { connect } from 'react-redux';
import { setUsers } from '../../actions/GlobalActions';
import axios from 'axios';

class User extends Component {
  async componentDidMount() {
    const response = await axios.get(`${this.props.url}/users`);
    this.props.setUsers(response.data);
    console.log(this.props.users);
  }
  render() {
    return (
      <div>
        {this.props.users.map((value, index) => {
          return (
            <li key={value._id} >
              Name: {value.name}, Email: {value.email}, DOB: {value.dob}
            </li>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    url: state.url,
    users: state.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: users => { dispatch(setUsers(users)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
