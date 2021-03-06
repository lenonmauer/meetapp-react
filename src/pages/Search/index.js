import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MeetupActions } from '../../store/ducks/meetup';

import { Spinner } from '../../components';

import MeetupItem from '../../components/MeetupItem';

import {
  Container, MeetupSection, MeetupWrapper, Title,
  EmptyMessage, SearchContainer, SearchInput, MeetupsContainer,
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
    const { subscriptions, next, recommended } = meetups;

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
                      subscriptions.length
                        ? subscriptions.map(meetup => <MeetupItem key={meetup._id} {...meetup} />)
                        : <EmptyMessage>Nenhum meetup encontrado nesta seção.</EmptyMessage>
                    }
                  </MeetupWrapper>
                </MeetupSection>

                <MeetupSection>
                  <Title>Próximos meetups</Title>
                  <MeetupWrapper>
                    {
                      next.length
                        ? next.map(meetup => <MeetupItem key={meetup._id} {...meetup} />)
                        : <EmptyMessage>Nenhum meetup encontrado nesta seção.</EmptyMessage>
                    }
                  </MeetupWrapper>
                </MeetupSection>

                <MeetupSection>
                  <Title>Recomendados</Title>
                  <MeetupWrapper>
                    {
                      recommended.length
                        ? recommended.map(meetup => <MeetupItem key={meetup._id} {...meetup} />)
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

const sanitizeMeetups = (data) => {
  if (!data || !data.recommended) {
    return {
      subscriptions: [],
      next: [],
      recommended: [],
    };
  }

  const addCount = meetups => meetups.map(meetup => ({
    ...meetup,
    members_count: meetup.subscriptions.length,
  }));

  return {
    subscriptions: addCount(data.subscriptions),
    next: addCount(data.next),
    recommended: addCount(data.recommended),
  };
};

Search.defaultProps = {
  meetups: null,
};

Search.propTypes = {
  searchMeetupsRequest: PropTypes.func.isRequired,
  loadingMeetups: PropTypes.bool.isRequired,
  meetups: PropTypes.shape({
    subscriptions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      members_count: PropTypes.number,
      photo: PropTypes.shape({
        url: PropTypes.string,
      }).isRequired,
    })),
    next: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      members_count: PropTypes.number,
      photo: PropTypes.shape({
        url: PropTypes.string,
      }).isRequired,
    })),
    recommended: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      members_count: PropTypes.number,
      photo: PropTypes.shape({
        url: PropTypes.string,
      }).isRequired,
    })),
  }),
};

const mapStateToProps = state => ({
  meetups: sanitizeMeetups(state.meetup.data),
  loadingMeetups: state.meetup.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
