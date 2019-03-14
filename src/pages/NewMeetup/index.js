import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CategoriesActions } from '../../store/ducks/categories';
import { MeetupActions } from '../../store/ducks/meetup';
import { UploadActions } from '../../store/ducks/upload';

import {
  Container, Date, FormGroup,
} from './styles';
import Upload from './components/Upload';

import {
  Input, InputLabel, Spinner, Button, Checkbox,
} from '../../components';

class NewMeetup extends Component {
  state = {
    title: '',
    description: '',
    date: '',
    localization: '',
    photo: null,
    categories: [],
  }

  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoriesRequest();
    }
  }

  componentWillUnmount() {
    this.props.resetUpload();
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onCheckboxChanged = (event) => {
    const { checked, value } = event.target;
    const { categories } = this.state;

    if (checked) {
      this.setState({
        categories: [...categories, value],
      });
    }
    else {
      this.setState({
        categories: categories.filter(cat => cat !== value),
      });
    }
  }

  onFileChange = (file) => {
    this.setState({ photo: file ? file._id : null });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.postMeetupRequest(this.state, this.resetForm);
  }


  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      date: '',
      localization: '',
      photo: null,
      categories: [],
    });

    this.props.resetUpload();
  }

  render() {
    const { loadingCategories, categories } = this.props;

    if (loadingCategories) {
      return <Spinner marginTop="30px" />;
    }

    return (
      <Container>
        <form onSubmit={this.onSubmit} autoComplete="off">
          <FormGroup>
            <InputLabel>Título</InputLabel>
            <Input
              name="title"
              value={this.state.title}
              onChange={this.onInputChange}
              placeholder="Digite o título do meetup"
            />
          </FormGroup>

          <FormGroup>
            <InputLabel>Descrição</InputLabel>
            <Input
              name="description"
              value={this.state.description}
              onChange={this.onInputChange}
              placeholder="Descreva seu meetup"
            />
          </FormGroup>

          <FormGroup>
            <InputLabel>Data e hora do início</InputLabel>
            <Date
              name="date"
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]}
              value={this.state.date}
              onChange={this.onInputChange}
              placeholder="informe a data de início do meetup"
            />
          </FormGroup>

          <FormGroup>
            <InputLabel>Imagem</InputLabel>
            <Upload onFileChange={this.onFileChange} />
          </FormGroup>

          <FormGroup>
            <InputLabel>Localização</InputLabel>
            <Input
              name="localization"
              value={this.state.localization}
              onChange={this.onInputChange}
              placeholder="Onde seu meetup vai acontecer?"
            />
          </FormGroup>

          <FormGroup>
            <InputLabel>Tema do meetup</InputLabel>
            {categories.map(category => (
              <Checkbox
                key={category.id}
                id={`category-${category.id}`}
                value={String(category.id)}
                checked={!!this.state.categories.find(cat => cat === category.id)}
                onChange={this.onCheckboxChanged}
              >
                {category.name}
              </Checkbox>
            ))}
          </FormGroup>

          <Button>Salvar</Button>
        </form>
      </Container>
    );
  }
}

NewMeetup.propTypes = {
  getCategoriesRequest: PropTypes.func.isRequired,
  postMeetupRequest: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  loadingCategories: PropTypes.bool.isRequired,
  resetUpload: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  categories: state.categories.data,
  loadingCategories: state.categories.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...CategoriesActions,
  ...MeetupActions,
  ...UploadActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewMeetup);
