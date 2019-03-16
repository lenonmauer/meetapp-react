import React, { Component } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CategoriesActions } from '../../store/ducks/categories';
import { MeetupActions } from '../../store/ducks/meetup';

import { Spinner } from '../../components';

import NewMeetupForm from './components/NewMeetupForm';
import validationSchema from './validationSchema';

class NewMeetup extends Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoriesRequest();
    }
  }

  render() {
    const { loadingCategories, categories, postMeetupRequest } = this.props;

    if (loadingCategories) {
      return <Spinner marginTop="30px" />;
    }

    return (
      <Formik
        initialValues={{
          title: '',
          description: '',
          date: '',
          localization: '',
          photo: null,
          categories: [],
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { resetForm }) => postMeetupRequest(values, resetForm)}
        render={formikProps => (
          <NewMeetupForm
            {...formikProps}
            categories={categories}
          />
        )}
      />

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
};

const mapStateToProps = state => ({
  profile: state.profile,
  categories: state.categories.data,
  loadingCategories: state.categories.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...CategoriesActions,
  ...MeetupActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewMeetup);
