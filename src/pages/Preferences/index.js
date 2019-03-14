import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Button, Checkbox, InputLabel, Spinner,
} from '../../components';

import { ProfileActions } from '../../store/ducks/profile';
import { CategoriesActions } from '../../store/ducks/categories';

import {
  Container, Box, DisplayName, Text, CategoriesWrapper,
} from './styles';

class Preferences extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    const { profile } = this.props;

    if (localStorage.getItem('@meetapp/first_login')) {
      localStorage.removeItem('@meetapp/first_login');
    }

    if (profile) {
      this.updateStateFromProps(profile.categories);
    }
    else {
      this.props.getProfileRequest();
      this.props.getCategoriesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const { profile } = this.props;

    if (!prevProps.profile && !!profile) {
      this.updateStateFromProps(profile.categories);
    }
  }

  updateStateFromProps = (categories) => {
    this.setState({ categories });
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

  onSubmit = () => {
    const { categories } = this.state;

    this.props.setPreferencesRequest({ categories });

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
        <Box>
          <DisplayName>Olá, {profile.name}</DisplayName>
          <Text>
            Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para
            selecionarmos os melhores meetups pra você:
          </Text>

          <InputLabel>Preferências</InputLabel>

          <CategoriesWrapper>
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
          </CategoriesWrapper>

          {
          loadingProfile ? <Spinner /> : <Button type="button" onClick={this.onSubmit}>Continuar</Button>
        }

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
