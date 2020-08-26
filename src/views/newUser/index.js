// @flow
import * as React from 'react';
import * as actions from '@actions/auth';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import FullscreenView from '@components/fullscreenView';
import LoginButtonSet from '@components/loginButtonSet';
import { Error } from '@components/formElements';
import {
  LargeTitle,
  LargeSubtitle,
  FullscreenContent,
  CodeOfConduct,
} from './style';
import { setTitlebarProps } from '@actions/titlebar';

class NewUser extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setTitlebarProps({ title: 'Login' }));

    return this.props.cleanUp();
  }

  render() {
    const { redirectPath, loading, signUp, error } = this.props;

    return (
      <FullscreenView closePath={redirectPath || '/'}>
        <FullscreenContent
          data-cy="signup-page"
          style={{ justifyContent: 'center' }}
        >
          <LargeTitle>Sign up</LargeTitle>
          <LargeSubtitle>
            New accounts on Foundry can only be created by signing up with your
            Brooklyn Tech email.
          </LargeSubtitle>

          <LoginButtonSet newUser onClick={signUp} loading={loading} />
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
  signUp: actions.signUp,
  cleanUp: actions.clean,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(NewUser);
