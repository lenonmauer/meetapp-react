import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container, Brand, Navigation, NavigationLink, MenuRightWrapper,
} from './styles';

const Navbar = ({ pathname }) => {
  const show = !['/', '/signup', '/login', '/preferences'].includes(pathname);

  return (
    <Container show={show}>
      <Brand />

      <Navigation>
        <NavigationLink to="/dashboard">Início</NavigationLink>
        <NavigationLink to="/search">Buscar</NavigationLink>
        <NavigationLink to="/new-meetup">Novo meetup</NavigationLink>

        <MenuRightWrapper>
          <NavigationLink to="/profile">
            <i className="material-icons">person_outline</i>
          </NavigationLink>
          <NavigationLink to="/logout">
            <i className="material-icons">exit_to_app</i>
          </NavigationLink>
        </MenuRightWrapper>

      </Navigation>

    </Container>
  );
};

Navbar.propTypes = {
  pathname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});


export default connect(mapStateToProps)(Navbar);
