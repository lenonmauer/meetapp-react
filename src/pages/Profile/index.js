import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ProfileActions } from '../../store/ducks/profile';
import { CategoriesActions } from '../../store/ducks/categories';

import {
  Button, Input, InputLabel, Checkbox, Spinner,
} from '../../components';

import {
  Container, Form, InputWrapper, CategoriesWrapper,
} from './styles';

class Profile extends Component {
  state = {
    categories: [],
    name: '',
    password: '',
    password_confirmation: '',
  }

  componentDidMount() {
    const { profile } = this.props;

    if (profile) {
      this.setState(profile);
    }
    else {
      this.props.getProfileRequest();
      this.props.getCategoriesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const { profile } = this.props;

    if (prevProps.profile === null && profile !== null) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(profile);
    }
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
        categories: categories.filter(cat => Number(cat) !== Number(value)),
      });
    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = () => {
    const { categories } = this.state;

    if (!categories.length) {
      return toast.error('Selecione pelo menos uma categoria.');
    }

    this.props.setProfileRequest(this.state);

    return null;
  }

  render() {
    const {
      profile, categories, loadingProfile, loadingCategories,
    } = this.props;

    if (!profile || loadingCategories) {
      return (<Spinner marginTop="100px" />);
    }

    return (
      <Container>
        <Form>
          <InputWrapper>
            <InputLabel>Nome</InputLabel>
            <Input
              type="text"
              placeholder="Digite seu nome"
              value={this.state.name}
              name="name"
              onChange={this.onInputChange}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Senha</InputLabel>
            <Input
              type="password"
              placeholder="Digite sua senha secreta"
              value={this.state.password}
              name="password"
              onChange={this.onInputChange}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Confirmação da senha</InputLabel>
            <Input
              type="password"
              placeholder="Digite sua senha secreta"
              value={this.state.password_confirmation}
              name="password_confirmation"
              onChange={this.onInputChange}
            />
          </InputWrapper>

          <div>
            <InputLabel>Preferências</InputLabel>

            <CategoriesWrapper>
              {categories.map(category => (
                <Checkbox
                  key={category.id}
                  id={`category-${category.id}`}
                  value={String(category.id)}
                  checked={!!this.state.categories.find(cat => Number(cat) === category.id)}
                  onChange={this.onCheckboxChanged}
                >
                  {category.name}
                </Checkbox>
              ))}
            </CategoriesWrapper>
          </div>

          {loadingProfile ? (
            <Spinner />
          ) : (
            <Button type="button" onClick={this.onSubmit}>
              Salvar
            </Button>
          )}
        </Form>
      </Container>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    password: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  setProfileRequest: PropTypes.func.isRequired,
  getProfileRequest: PropTypes.func.isRequired,
  getCategoriesRequest: PropTypes.func.isRequired,
  loadingCategories: PropTypes.bool.isRequired,
  loadingProfile: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
