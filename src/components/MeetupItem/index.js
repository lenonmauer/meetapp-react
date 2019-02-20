import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Thumbnail, Content, TextWrapper, Title, MembersCount, Button, Icon,
} from './styles';

const MeetupItem = ({
  id, title, members_count, photo_url,
}) => (
  <Container>
    <Thumbnail src={photo_url} alt="Visualizar" />
    <Content>
      <TextWrapper>
        <Title>{title}</Title>
        <MembersCount>{members_count} membros</MembersCount>
      </TextWrapper>
      <Button to={`/meetup/${id}`}>
        <Icon className="material-icons">chevron_right</Icon>
      </Button>
    </Content>
  </Container>
);

MeetupItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  members_count: PropTypes.number.isRequired,
  photo_url: PropTypes.string.isRequired,
};

export default MeetupItem;
