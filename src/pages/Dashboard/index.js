import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MeetupActions } from '../../store/ducks/meetup';

import { Spinner } from '../../components';

import MeetupItem from '../../components/MeetupItem';

import {
  Container, MeetupSection, MeetupWrapper, Title, EmptyMessage,
} from './styles';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getMeetupsRequest();
  }

  render() {
    const { meetups, loadingMeetups } = this.props;
    const { enrollments, next, recommended } = meetups;

    if (loadingMeetups) {
      return <Spinner marginTop="30px" />;
    }

    return (
      <Container>
        <MeetupSection>
          <Title>Inscrições</Title>
          <MeetupWrapper>
            {
              enrollments.length
                ? enrollments.map(meetup => <MeetupItem key={meetup.id} {...meetup} />)
                : <EmptyMessage>Nenhum meetup encontrado nesta seção.</EmptyMessage>
            }
          </MeetupWrapper>
        </MeetupSection>

        <MeetupSection>
          <Title>Próximos meetups</Title>
          <MeetupWrapper>
            {
              next.length
                ? next.map(meetup => <MeetupItem key={meetup.id} {...meetup} />)
                : <EmptyMessage>Nenhum meetup encontrado nesta seção.</EmptyMessage>
            }

          </MeetupWrapper>
        </MeetupSection>

        <MeetupSection>
          <Title>Recomendados</Title>
          <MeetupWrapper>
            {
              recommended.length
                ? recommended.map(meetup => <MeetupItem key={meetup.id} {...meetup} />)
                : <EmptyMessage>Nenhum meetup encontrado nesta seção.</EmptyMessage>
            }

          </MeetupWrapper>
        </MeetupSection>
      </Container>
    );
  }
}

const formatMeetups = (meetups) => {
  if (!meetups || !meetups.enrollments) {
    return {
      enrollments: [],
      next: [],
      recommended: [],
    };
  }

  const mergeCount = meetup => ({
    ...meetup,
    members_count: meetup.__meta__.subscriptions_count,
  });

  return {
    enrollments: meetups.enrollments.map(mergeCount),
    next: meetups.next.map(mergeCount),
    recommended: meetups.recommended.map(mergeCount),
  };
};

Dashboard.defaultProps = {
  meetups: null,
};

Dashboard.propTypes = {
  getMeetupsRequest: PropTypes.func.isRequired,
  loadingMeetups: PropTypes.bool.isRequired,
  meetups: PropTypes.shape({
    enrollments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      members_count: PropTypes.number,
      photo_url: PropTypes.string,
    })),
    next: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      members_count: PropTypes.number,
      photo_url: PropTypes.string,
    })),
    recommended: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      members_count: PropTypes.number,
      photo_url: PropTypes.string,
    })),
  }),
};

const mapStateToProps = state => ({
  meetups: formatMeetups(state.meetup.data),
  loadingMeetups: state.meetup.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
