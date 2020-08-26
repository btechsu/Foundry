// @flow
import * as React from 'react';
import * as actions from '@actions/auth';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import Icon from '@components/icon';
import FullscreenView from '@components/fullscreenView';
import LoginButtonSet from '@components/loginButtonSet';
import { Error } from '@components/formElements';
import {
  LargeTitle,
  LargeSubtitle,
  UpsellIconContainer,
  FullscreenContent,
  CodeOfConduct,
} from './style';
import { setTitlebarProps } from '@actions/titlebar';

class Login extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setTitlebarProps({ title: 'Login' }));

    return this.props.cleanUp();
  }

  render() {
    const {
      redirectPath,
      signinType = 'signin',
      loading,
      login,
      error,
    } = this.props;

    const viewTitle =
      signinType === 'login' ? 'Welcome back!' : 'Sign in to get started';

    const viewSubtitle =
      signinType === 'login'
        ? "We're happy to see you again - sign in below to get started!"
        : 'Foundry is a place where Tech students can share, discuss, and grow together. Sign in below to get in on the conversation.';

    return (
      <FullscreenView closePath={redirectPath || '/'}>
        <FullscreenContent
          data-cy="login-page"
          style={{ justifyContent: 'center' }}
        >
          <UpsellIconContainer>
            <Icon glyph={'emoji'} size={64} />
          </UpsellIconContainer>
          <LargeTitle>{viewTitle}</LargeTitle>
          <LargeSubtitle>{viewSubtitle}</LargeSubtitle>

          <LoginButtonSet loading={loading} onClick={() => login()} />
          {error && <Error style={{ textAlign: 'center' }}>{error}</Error>}

          <CodeOfConduct>
            By using Foundry, you agree to our{' '}
            <Link to={'/privacy'}>Privacy Policy</Link> and{' '}
            <Link to={'/terms'}>Terms of Service</Link>.
          </CodeOfConduct>
        </FullscreenContent>
      </FullscreenView>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  login: actions.signIn,
  cleanUp: actions.clean,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
