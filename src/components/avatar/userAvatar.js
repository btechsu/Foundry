import * as React from 'react';
import AvatarImage from './image';
import { Container } from './style';
import ConditionalWrap from 'src/components/conditionalWrap';

class Avatar extends React.Component {
  render() {
    const { user, dataCy, size = 32, mobilesize, style } = this.props;

    const src = user.pfp;

    const userFallback = '/img/default_avatar.svg';
    const source = [src, userFallback];

    return (
      <Container
        style={style}
        type={'user'}
        data-cy={dataCy}
        size={size}
        mobileSize={mobilesize}
      >
        <ConditionalWrap
          condition={!!user.name}
          wrap={() => (
            <AvatarImage
              src={source}
              size={size}
              mobilesize={mobilesize}
              type={'user'}
              alt={user.name || 'Anonymous'}
            />
          )}
        >
          <AvatarImage
            src={source}
            size={size}
            mobilesize={mobilesize}
            type={'user'}
            alt={user.name || 'Anonymous'}
          />
        </ConditionalWrap>
      </Container>
    );
  }
}

class AvatarHandler extends React.Component {
  render() {
    if (this.props.user) {
      return <Avatar {...this.props} />;
    }

    return null;
  }
}

export default AvatarHandler;
