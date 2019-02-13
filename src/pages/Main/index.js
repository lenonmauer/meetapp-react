import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from './styles';

class Main extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <Container>Main</Container>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Main);
