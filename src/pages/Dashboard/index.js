import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from './styles';

class Dashboard extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <Container>Dashboard</Container>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Dashboard);
