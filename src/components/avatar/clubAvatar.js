import * as React from 'react';
import AvatarImage from './image';
import { Container, AvatarLink } from './style';
import ConditionalWrap from 'src/components/conditionalWrap';

class Avatar extends React.Component {
  render() {
    const {
      club,
      size = 32,
      isClickable = true,
      mobilesize,
      style,
      id,
    } = this.props;

    const src = club.pfp;

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
            <AvatarLink to={`/${club.id || id}`}>{children}</AvatarLink>
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
