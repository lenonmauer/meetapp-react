import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Creators as LoginActions } from '../../store/ducks/login';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;

  const route = p => (props.isLogged ? (
    <Component {...p} />
  ) : (
    <Redirect to={{ pathname: '/' }} />
  ));

  return <Route {...rest} render={p => route(p)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLogged: state.login.logged,
});

const mapDispatchToProps = dispatch => bindActionCreators(LoginActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute);
