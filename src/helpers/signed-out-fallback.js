// @flow
import React from 'react';
import { connect } from 'react-redux';
import { LoadingView } from '@views/viewHelpers';
import { isLoaded } from 'react-redux-firebase';

const Switch = (props) => {
  const { Component, FallbackComponent, authed, ...rest } = props;
  
  if (!isLoaded) return <LoadingView />;
  if (!authed && isLoaded()) return <FallbackComponent {...rest} />;
  return <Component {...rest} />;
};

const ConnectedSwitch = connect(({ firebase: { auth } }) => ({
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