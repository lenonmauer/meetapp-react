import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import {
  Spinner,
} from '../../components';

import {
  Container, Box, DisplayName, Text,
} from './styles';

import { ProfileActions } from '../../store/ducks/profile';
import { CategoriesActions } from '../../store/ducks/categories';

import PreferencesForm from './components/PreferencesForm';

import validationSchema from './validationSchema';

class Preferences extends Component {
  componentDidMount() {
    if (localStorage.getItem('@meetapp/first_login')) {
      localStorage.removeItem('@meetapp/first_login');
    }

    this.props.getProfileRequest();
    this.props.getCategoriesRequest();
  }

  render() {
    const {
      profile, categories, loadingProfile, loadingCategories, setPreferencesRequest,
    } = this.props;

    if (!profile || loadingCategories) {
      return (<Spinner marginTop="100px" />);
    }

    return (
      <Container>
        <Box>
          <DisplayName>Olá, {profile.name}</DisplayName>

          <Text>
            Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para
            selecionarmos os melhores meetups pra você:
          </Text>

          <Formik
            initialValues={{
              categories: profile.categories,
            }}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={values => setPreferencesRequest(values)}
            render={formikProps => (
              <PreferencesForm
                {...formikProps}
                categories={categories}
                loading={loadingProfile}
              />
            )}
          />
        </Box>
      </Container>
    );
  }
}

Preferences.defaultProps = {
  profile: {},
};

Preferences.propTypes = {
  getProfileRequest: PropTypes.func.isRequired,
  getCategoriesRequest: PropTypes.func.isRequired,
  setPreferencesRequest: PropTypes.func.isRequired,
  loadingCategories: PropTypes.bool.isRequired,
  loadingProfile: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }),
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile.data,
  categories: state.categories.data,
  loadingCategories: state.categories.loading,
  loadingProfile: state.profile.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...CategoriesActions,
  ...ProfileActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
