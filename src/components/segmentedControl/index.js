import React from 'react';
import { StyledSegmentedControl, StyledSegment } from './style';
import { Link } from 'react-router-dom';

export const SegmentedControl = (props) => {
  const {
    sticky = true,
    stickyOffset = 0,
    mobileSticky = true,
    mobileStickyOffset = 0,
    ...rest
  } = props;
  return (
    <StyledSegmentedControl
      sticky={sticky}
      mobileSticky={mobileSticky}
      stickyOffset={stickyOffset}
      mobileStickyOffset={mobileStickyOffset}
      {...rest}
    />
  );
};

export const Segment = (props) => {
  const { isActive = false, hideOnDesktop = false, to, ...rest } = props;

  const component = (
    <StyledSegment
      isActive={isActive}
      hideOnDesktop={hideOnDesktop}
      {...rest}
    />
  );

  if (to) {
    return <Link to={to}>{component}</Link>;
  }

  return component;
};
