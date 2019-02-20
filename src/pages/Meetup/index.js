import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MeetupActions } from '../../store/ducks/meetup';
import { SubscriptionActions } from '../../store/ducks/subscription';

import { Spinner, Button } from '../../components';

import {
  Container, Thumbnail, Content, Title, MembersCount, Description, HeldIn, Location, ButtonWrapper, SubscriptMessage,
} from './styles';

class Meetup extends Component {
  state = {
    subscript: false,
  }

  componentDidMount() {
    this.props.getMeetupRequest(this.props.match.params.id);
  }

  setSubscript = () => {
    this.setState({
      subscript: true,
    });
  }

  renderSubscriptionButton = () => {
    const { meetup, loadingSubscription } = this.props;

    return (
      loadingSubscription
        ? <Spinner />
        : (
          <ButtonWrapper>
            <Button
              onClick={() => this.props.postSubscriptionRequest(meetup.id, this.setSubscript)}
            >
          Inscreva-se
            </Button>
          </ButtonWrapper>
        )
    );
  }

  render() {
    const { meetup, loadingMeetup } = this.props;
    const isSubscript = this.state.subscript || (meetup && meetup.subscript);

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
          {
            isSubscript
              ? (
                <SubscriptMessage>
                  Estou inscrito neste meetup.
                </SubscriptMessage>
              )
              : this.renderSubscriptionButton()
          }
        </Content>
      </Container>
    );
  }
}

Meetup.defaultProps = {
  meetup: null,
};

Meetup.propTypes = {
  getMeetupRequest: PropTypes.func.isRequired,
  postSubscriptionRequest: PropTypes.func.isRequired,
  loadingMeetup: PropTypes.bool.isRequired,
  meetup: PropTypes.shape({
    photo_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    members_count: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    localization: PropTypes.string.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const sanitizeMeetup = (meetup) => {
  if (!meetup || !meetup.id) {
    return null;
  }

  return meetup;
};

const mapStateToProps = state => ({
  meetup: sanitizeMeetup(state.meetup.data),
  loadingMeetup: state.meetup.loading,
  loadingSubscription: state.subscription.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...MeetupActions,
  ...SubscriptionActions,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meetup);
