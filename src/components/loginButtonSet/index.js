// @flow
import React from 'react';
import { OutlineButton } from 'src/components/button';
import { withRouter } from 'react-router';
import { Container } from './style';
import { GoogleSigninButton } from './google';

const LoginButtonSet = (props) => {
  const { onClick, newUser, loading, onlyButton } = props;

  return (
    <Container>
      <GoogleSigninButton
        loading={loading}
        onClickHandler={onClick}
        newUser={newUser}
      />

      {!onlyButton && (
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ padding: '16px' }} />
          <OutlineButton
            css={{ width: '100%' }}
            to={newUser ? `/login` : `/new/user`}
          >
            {newUser
              ? 'Existing user? Click here to log in'
              : 'New to Foundry? Click here to sign up.'}
          </OutlineButton>
        </div>
      )}
    </Container>
  );
};

export default withRouter(LoginButtonSet);
