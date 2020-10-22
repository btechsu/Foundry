import * as React from 'react';
import { Img, FallbackImg, LoadingImg } from './style';
import VisibilitySensor from 'react-visibility-sensor';

export default class Image extends React.Component {
  render() {
    const { type, size, mobilesize } = this.props;
    const { ...rest } = this.props;
    const fallbackSrc =
      type === 'user'
        ? '/img/default_avatar.svg'
        : '/img/default_club.svg';

    return (
      <VisibilitySensor>
        <Img
          {...rest}
          decode={false}
          loader={
            <LoadingImg
              size={size}
              mobilesize={mobilesize}
              type={type}
              src={fallbackSrc}
              alt=""
            />
          }
          unloader={
            <FallbackImg
              size={size}
              mobilesize={mobilesize}
              type={type}
              src={fallbackSrc}
              alt=""
            />
          }
        />
      </VisibilitySensor>
    );
  }
}
