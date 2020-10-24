import * as React from 'react';
import {
  Container,
  MetaContainer,
  TextRow,
  MetaTitle,
  MetaTitleText,
  MetaSubtitle,
  Divider,
  MetaSubtitleLocked,
  MetaSubtitleWatercooler,
  MetaSubtitlePinned,
} from './style';
import Timestamp from './timestamp';

class Header extends React.Component {
  render() {
    const { active, channel, id, user } = this.props;

    return (
      <Container active={active}>
        <MetaContainer>
          <TextRow>
            {user && user.name ? (
              <MetaTitle>{user.name}</MetaTitle>
            ) : (
              <MetaTitleText>Anonymous</MetaTitleText>
            )}

            <Divider>·</Divider>
            <Timestamp {...this.props} />
          </TextRow>

          <TextRow>
            <MetaSubtitle to={`/${id}/${channel.id}`}>
              # {channel.data().name}
            </MetaSubtitle>
          </TextRow>
        </MetaContainer>
      </Container>
    );
  }
}

export default Header;
