import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LoginActions } from '../../store/ducks/login';

class Logout extends Component {
  componentWillMount() {
    localStorage.removeItem('@meetapp/token');
    this.props.logout();
  }

  render() {
    return <Redirect to={{ pathname: '/' }} />;
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(LoginActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
