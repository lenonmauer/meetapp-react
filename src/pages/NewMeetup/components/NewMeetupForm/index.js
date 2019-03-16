import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UploadActions } from '../../../../store/ducks/upload';

import {
  Container, Date, FormGroup,
} from './styles';

import Upload from '../Upload';

import {
  Input, InputLabel, Button, Checkbox, ValidationError,
} from '../../../../components';

class NewMeetupForm extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.values.photo === null && prevProps.values.photo !== null) {
      this.props.resetUpload();
    }
  }

  componentWillUnmount() {
    this.props.resetUpload();
  }

  handleCheckboxChange = (options, field, value) => {
    const { setFieldValue } = this.props;

    if (options.find(option => option === value)) {
      setFieldValue(field, options.filter(cat => cat !== value));
    }
    else {
      setFieldValue(field, [...options, value]);
    }
  };

  render() {
    const {
      values,
      handleSubmit,
      handleChange,
      errors,
      categories,
      setFieldValue,
    } = this.props;

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
            <Upload onFileChange={file => setFieldValue('photo', file ? file._id : '')} />
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
                onChange={() => this.handleCheckboxChange(values.categories, 'categories', category.id)}
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

NewMeetupForm.propTypes = {
  values: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  setFieldValue: PropTypes.func.isRequired,
  resetUpload: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  ...UploadActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(NewMeetupForm);
