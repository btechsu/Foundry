// @flow
import * as React from 'react';
import { GoogleButton, Label } from './style';
import Icon from 'src/components/icon';

export const GoogleSigninButton = (props) => {
  const { onClickHandler, newUser, loading } = props;

  return (
    <GoogleButton onClick={onClickHandler} preferred disabled={loading}>
      <Icon glyph={'google'} />
      <Label>
        {loading
          ? 'Loading...'
          : newUser
          ? 'Sign up with Brooklyn Tech'
          : 'Sign in with Brooklyn Tech'}
      </Label>
    </GoogleButton>
  );
};
