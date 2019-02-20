import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MeetupActions } from '../../store/ducks/meetup';

import { Spinner, Button } from '../../components';

import {
  Container, Thumbnail, Content, Title, MembersCount, Description, HeldIn, Location, ButtonWrapper,
} from './styles';

class Meetup extends Component {
  componentDidMount() {
    this.props.getMeetupRequest(this.props.match.params.id);
  }

  render() {
    const { meetup, loadingMeetup } = this.props;

    if (!meetup || loadingMeetup) {
      return <Spinner marginTop="30px" />;
    }

    return (
      <Container>
        <Thumbnail src={meetup.photo_url} />
        <Content>
          <Title>{meetup.title}</Title>
          <MembersCount>{meetup.members_count} membros</MembersCount>
          <Description>{meetup.description}</Description>
          <HeldIn>Realizado em:</HeldIn>
          <Location>{meetup.localization}</Location>
          <ButtonWrapper>
            <Button>Inscreva-se</Button>
          </ButtonWrapper>
        </Content>
      </Container>
    );
  }
}

const mergeCount = (meetup) => {
  if (!meetup || !meetup.id) {
    return null;
  }

  return {
    ...meetup,
    members_count: meetup.__meta__.subscriptions_count,
  };
};

const mapStateToProps = state => ({
  meetup: mergeCount(state.meetup.data),
  loadingMeetup: state.meetup.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meetup);
