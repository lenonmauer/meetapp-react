import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withFormik } from 'formik';

import { ProfileActions } from '../../store/ducks/profile';
import { CategoriesActions } from '../../store/ducks/categories';

import { Container, Form, InputWrapper } from './styles';

import {
  Button, Input, InputLabel, Checkbox, Spinner, ValidationError,
} from '../../components';

import validationSchema from './validationSchema';

class Profile extends Component {
  componentDidMount() {
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
      handleChange,
    } = this.props;

    if (!profile || loadingCategories) {
      return <Spinner marginTop="100px" />;
    }

    return (
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputLabel>Nome</InputLabel>
            <Input
              type="text"
              placeholder="Digite seu nome"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            <ValidationError when={!!errors.name} message={errors.name} />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Senha</InputLabel>
            <Input
              type="password"
              placeholder="Digite sua senha secreta"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <ValidationError when={!!errors.password} message={errors.password} />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Confirmação da senha</InputLabel>
            <Input
              type="password"
              placeholder="Digite sua senha secreta novamente"
              name="password_confirmation"
              value={values.password_confirmation}
              onChange={handleChange}
            />
            <ValidationError
              when={!!errors.password_confirmation}
              message={errors.password_confirmation}
            />
          </InputWrapper>

          <div>
            <InputLabel>Preferências</InputLabel>

            <div>
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
            </div>
            <ValidationError when={!!errors.categories} message={errors.categories} />
          </div>

          {loadingProfile ? <Spinner /> : <Button type="submit">Salvar</Button>}
        </Form>
      </Container>
    );
  }
}

Profile.defaultProps = {
  profile: null,
};

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    password: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  getProfileRequest: PropTypes.func.isRequired,
  getCategoriesRequest: PropTypes.func.isRequired,
  loadingCategories: PropTypes.bool.isRequired,
  loadingProfile: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
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
      name: profile ? profile.name : '',
      password: '',
      password_confirmation: '',
    },

    handleSubmit: (values, { props }) => props.setProfileRequest(values),

    validationSchema,
    validateOnChange: false,
    enableReinitialize: true,
    validateOnBlur: false,
  }),
)(Profile);
