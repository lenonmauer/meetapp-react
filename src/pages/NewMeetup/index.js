import React, { Component } from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { CategoriesActions } from '../../store/ducks/categories';
import { MeetupActions } from '../../store/ducks/meetup';
import { UploadActions } from '../../store/ducks/upload';

import Upload from './components/Upload';

import {
  Input, InputLabel, Button, Checkbox, ValidationError, Spinner,
} from '../../components';

import { Container, Date, FormGroup } from './styles';

import validationSchema from './validationSchema';

class NewMeetup extends Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoriesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.values.photo === null && prevProps.values.photo !== null) {
      this.props.resetUpload();
    }
  }

  componentWillUnmount() {
    this.props.resetUpload();
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

  handleFileChange = (file) => {
    const { setFieldValue } = this.props;
    /* eslint-disable-next-line */
    setFieldValue('photo', file ? file._id : '');
  };

  render() {
    const {
      loadingCategories,
      categories,
      handleSubmit,
      values,
      handleChange,
      errors,
    } = this.props;

    if (loadingCategories) {
      return <Spinner marginTop="30px" />;
    }

    return (
      <Container>
        <form onSubmit={handleSubmit} autoComplete="off">
          <FormGroup>
            <InputLabel>Título</InputLabel>
            <Input
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Digite o título do meetup"
            />
            <ValidationError when={!!errors.title} message={errors.title} />
          </FormGroup>

          <FormGroup>
            <InputLabel>Descrição</InputLabel>
            <Input
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Descreva seu meetup"
            />
            <ValidationError when={!!errors.description} message={errors.description} />
          </FormGroup>

          <FormGroup>
            <InputLabel>Data e hora do início</InputLabel>
            <Date
              name="date"
              mask="11/11/1111 11:11"
              value={values.date}
              onChange={handleChange}
              placeholder="informe a data de início do meetup"
            />
            <ValidationError when={!!errors.date} message={errors.date} />
          </FormGroup>

          <FormGroup>
            <InputLabel>Imagem</InputLabel>
            <Upload onFileChange={this.handleFileChange} />
            <ValidationError when={!!errors.photo} message={errors.photo} />
          </FormGroup>

          <FormGroup>
            <InputLabel>Localização</InputLabel>
            <Input
              name="localization"
              value={values.localization}
              onChange={handleChange}
              placeholder="Onde seu meetup vai acontecer?"
            />
            <ValidationError when={!!errors.localization} message={errors.localization} />
          </FormGroup>

          <FormGroup>
            <InputLabel>Tema do meetup</InputLabel>
            {categories.map(category => (
              <Checkbox
                key={category.id}
                id={`category-${category.id}`}
                value={category.id}
                checked={!!values.categories.find(cat => cat === category.id)}
                onChange={() => this.handleCheckboxChange(category.id)}
              >
                {category.name}
              </Checkbox>
            ))}
            <ValidationError when={!!errors.categories} message={errors.categories} />
          </FormGroup>

          <Button>Salvar</Button>
        </form>
      </Container>
    );
  }
}

NewMeetup.propTypes = {
  getCategoriesRequest: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  loadingCategories: PropTypes.bool.isRequired,
  resetUpload: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    localization: PropTypes.string,
    photo: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  errors: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  categories: state.categories.data,
  loadingCategories: state.categories.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...CategoriesActions,
    ...MeetupActions,
    ...UploadActions,
  },
  dispatch,
);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFormik({
    mapPropsToValues: ({ values }) => values || {
      title: '',
      description: '',
      date: '',
      localization: '',
      photo: null,
      categories: [],
    },

    validationSchema,

    validateOnChange: false,
    validateOnBlur: false,

    handleSubmit: (values, { props }) => props.postMeetupRequest(values, props.resetForm),
  }),
)(NewMeetup);
