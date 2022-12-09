import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Navigate to="/" />;
  }
}

function mapDispatchtoProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchtoProps)(Logout);
