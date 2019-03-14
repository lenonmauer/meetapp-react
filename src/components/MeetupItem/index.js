import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Thumbnail, Content, TextWrapper, Title, MembersCount, Button, Icon,
} from './styles';

const MeetupItem = ({
  _id, title, members_count, photo,
}) => (
  <Container>
    <Thumbnail src={photo.url} alt="Visualizar" />
    <Content>
      <TextWrapper>
        <Title>{title}</Title>
        <MembersCount>{members_count} membros</MembersCount>
      </TextWrapper>
      <Button to={`/meetup/${_id}`}>
        <Icon className="material-icons">chevron_right</Icon>
      </Button>
    </Content>
  </Container>
);

MeetupItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  members_count: PropTypes.number.isRequired,
  photo: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default MeetupItem;
