// @flow
import * as React from 'react';
import AvatarImage from './image';
import { Container, AvatarLink } from './style';
import ConditionalWrap from '@components/conditionalWrap';

class Avatar extends React.Component {
  render() {
    const {
      club,
      size = 32,
      isClickable = true,
      mobilesize,
      style,
    } = this.props;

    const src = club.profilePhoto;

    const clubFallback = '/img/default_club.svg';
    const source = [src, clubFallback];

    return (
      <Container
        size={size}
        mobilesize={mobilesize}
        style={style}
        type={'club'}
      >
        <ConditionalWrap
          condition={isClickable}
          wrap={(children) => (
            <AvatarLink to={`/${club.id}`}>{children}</AvatarLink>
          )}
        >
          <AvatarImage
            src={source}
            size={size}
            mobilesize={mobilesize}
            type={'club'}
            alt={club.name}
          />
        </ConditionalWrap>
      </Container>
    );
  }
}

class AvatarHandler extends React.Component {
  render() {
    return <Avatar {...this.props} />;
  }
}

export default AvatarHandler;