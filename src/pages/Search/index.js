import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MeetupActions } from '../../store/ducks/meetup';

import { Spinner } from '../../components';

import MeetupItem from '../../components/MeetupItem';

import {
  Container, MeetupSection, MeetupWrapper, Title, EmptyMessage, SearchContainer, SearchInput, MeetupsContainer,
} from './styles';

class Search extends Component {
  state = {
    search: '',
  }

  componentWillMount() {
    this.searchWithDelay = _.debounce(() => {
      this.props.searchMeetupsRequest(this.state.search);
    }, 700);
  }

  componentDidMount() {
    this.props.searchMeetupsRequest(this.state.search);
  }

  onInputChange = (event) => {
    this.setState({
      search: event.target.value,
    });

    this.searchWithDelay();
  }

  render() {
    const { meetups, loadingMeetups } = this.props;
    const { enrollments, next, recommended } = meetups;

    return (
      <Container>
        <SearchContainer>
          <i className="material-icons">search</i>
          <SearchInput onChange={this.onInputChange} placeholder="Buscar meetups" />
        </SearchContainer>

        {
          loadingMeetups
            ? <Spinner marginTop="30px" />
            : (
              <MeetupsContainer>
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
              </MeetupsContainer>
            )
        }

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

Search.defaultProps = {
  meetups: null,
};

Search.propTypes = {
  searchMeetupsRequest: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
