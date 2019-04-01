import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withFormik } from 'formik';

import { ProfileActions } from '../../store/ducks/profile';
import { CategoriesActions } from '../../store/ducks/categories';

import {
  InputLabel, Button, ValidationError, Spinner, Checkbox,
} from '../../components';

import {
  Container, Box, DisplayName, Text, CategoriesWrapper,
} from './styles';

import validationSchema from './validationSchema';

class Preferences extends Component {
  componentDidMount() {
    if (localStorage.getItem('@meetapp/first_login')) {
      localStorage.removeItem('@meetapp/first_login');
    }

    this.props.getProfileRequest();
    this.props.getCategoriesRequest();
  }

  handleCheckboxChange = (value) => {
    const {
      setFieldValue,
      values: { categories: options },
    } = this.props;
    const field = 'categories';

    if (options.find(option => option === value)) {
      setFieldValue(field, options.filter(cat => cat !== value));
    }
    else {
      setFieldValue(field, [...options, value]);
    }
  };

  render() {
    const {
      profile,
      categories,
      loadingProfile,
      loadingCategories,
      handleSubmit,
      values,
      errors,
    } = this.props;

    if (!profile || loadingCategories) {
      return <Spinner marginTop="100px" />;
    }

    return (
      <Container>
        <Box>
          <DisplayName>Olá, {profile.name}</DisplayName>

          <Text>
            Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para
            selecionarmos os melhores meetups pra você:
          </Text>

          <Fragment>
            <InputLabel>Preferências</InputLabel>

            <CategoriesWrapper>
              {categories.map(category => (
                <Checkbox
                  key={category.id}
                  id={`category-${category.id}`}
                  value={category.id}
                  checked={values.categories.includes(category.id)}
                  onChange={() => this.handleCheckboxChange(category.id)}
                >
                  {category.name}
                </Checkbox>
              ))}

              <ValidationError when={!!errors.categories} message={errors.categories} />
            </CategoriesWrapper>

            {loadingProfile ? (
              <Spinner />
            ) : (
              <Button type="button" onClick={handleSubmit}>
                Continuar
              </Button>
            )}
          </Fragment>
        </Box>
      </Container>
    );
  }
}

Preferences.defaultProps = {
  profile: null,
};

Preferences.propTypes = {
  getProfileRequest: PropTypes.func.isRequired,
  getCategoriesRequest: PropTypes.func.isRequired,
  loadingCategories: PropTypes.bool.isRequired,
  loadingProfile: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    password: PropTypes.string,
    password_confirmation: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile.data,
  categories: state.categories.data,
  loadingCategories: state.categories.loading,
  loadingProfile: state.profile.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...CategoriesActions,
    ...ProfileActions,
  },
  dispatch,
);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFormik({
    mapPropsToValues: ({ values, profile }) => values || {
      categories: profile ? profile.categories : [],
    },

    handleSubmit: (values, { props }) => props.setPreferencesRequest(values),

    validationSchema,
    validateOnChange: false,
    enableReinitialize: true,
    validateOnBlur: false,
  }),
)(Preferences);
