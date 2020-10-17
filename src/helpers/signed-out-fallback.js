import React from 'react';
import { connect } from 'react-redux';

const Switch = (props) => {
  const { Component, FallbackComponent, authed, isLoaded, ...rest } = props;

  if (!isLoaded) return null;
  if (!authed) return <FallbackComponent {...rest} />;
  return <Component {...rest} />;
};

const ConnectedSwitch = connect(({ firebase: { auth } }) => ({
  isLoaded: auth.isLoaded,
  authed: !!auth && !!auth.uid,
}))(Switch);

const signedOutFallback = (Component, FallbackComponent) => {
  return (props) => (
    <ConnectedSwitch
      {...props}
      FallbackComponent={FallbackComponent}
      Component={Component}
    />
  );
};

export default signedOutFallback;
