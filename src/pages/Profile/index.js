import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import { ProfileActions } from '../../store/ducks/profile';
import { CategoriesActions } from '../../store/ducks/categories';

import { Spinner } from '../../components';

import ProfileForm from './components/ProfileForm';
import validationSchema from './validationSchema';

class Profile extends Component {
  componentDidMount() {
    this.props.getProfileRequest();
    this.props.getCategoriesRequest();
  }

  render() {
    const {
      profile, categories, loadingProfile, loadingCategories, setProfileRequest,
    } = this.props;

    if (!profile || loadingCategories) {
      return (<Spinner marginTop="100px" />);
    }

    return (
      <Formik
        initialValues={{
          categories: profile.categories,
          name: profile.name,
          password: '',
          password_confirmation: '',
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => setProfileRequest(values)}
        render={formikProps => (
          <ProfileForm
            {...formikProps}
            categories={categories}
            loading={loadingProfile}
          />
        )}
      />
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
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
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
