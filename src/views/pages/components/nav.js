// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { PrimaryButton } from '@components/button';
import Icon from '@components/icon';
import { Link } from 'react-router-dom';
import { Logo } from '@components/logo';
// import { UserAvatar } from 'src/components/avatar';
import Head from '@components/head';
import {
  NavContainer,
  Tabs,
  LogoTab,
  MenuTab,
  LoginTab,
  AuthTab,
  LogoLink,
  AuthLink,
  LoginLink,
  MenuContainer,
  MenuOverlay,
} from '../style';

class Nav extends React.Component {
  state = { menuIsOpen: false };

  toggleMenu() {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  }

  render() {
    return (
      <NavContainer data-cy="navigation-splash">
        <Head
          title={'Foundry'}
          description={'Your one stop shop for all Brooklyn Tech.'}
        >
          <link
            rel="shortcut icon"
            id="dynamic-favicon"
            // $FlowIssue
            href={`${process.env.PUBLIC_URL}/img/favicon.ico`}
          />
        </Head>
        <Tabs>
          <LogoTab
            dark={this.props.dark}
            to="/"
            data-cy="navigation-splash-about"
          >
            <Logo />
            <Icon glyph={'logo'} />
          </LogoTab>
          {this.props.authed ? (
            <AuthTab dark={this.props.dark}>
              <LoginTab
                dark={this.props.dark}
                selected={this.props.location === 'login'}
                to="/"
                data-cy="navigation-splash-login"
              >
                Dashbard
              </LoginTab>
            </AuthTab>
          ) : (
            <React.Fragment>
              <LoginTab
                dark={this.props.dark}
                selected={this.props.location === 'login'}
                to="/login"
                data-cy="navigation-splash-login"
              >
                Log in
              </LoginTab>
              <AuthTab dark={this.props.dark}>
                <Link to="/new/user">
                  <PrimaryButton
                    data-cy="navigation-splash-signin"
                    style={{
                      fontWeight: '700',
                      fontSize: '16px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Sign up
                  </PrimaryButton>
                </Link>
              </AuthTab>
            </React.Fragment>
          )}
          <MenuTab dark={this.props.dark} open={this.state.menuIsOpen}>
            <Icon
              glyph={this.state.menuIsOpen ? 'view-close' : 'menu'}
              onClick={() => this.toggleMenu()}
            />
            <MenuContainer open={this.state.menuIsOpen}>
              <LogoLink to="/">
                <Logo />
              </LogoLink>
              {this.props.authed ? (
                <AuthLink to={'/'}>
                  <span>Return home</span>
                </AuthLink>
              ) : (
                <React.Fragment>
                  <LoginLink to={'/login'}>
                    <span>Log in</span>
                  </LoginLink>
                  <AuthLink to={'/new/user'}>
                    <span>Sign up</span>
                  </AuthLink>
                </React.Fragment>
              )}
            </MenuContainer>
            <MenuOverlay
              onClick={() => this.toggleMenu()}
              open={this.state.menuIsOpen}
            />
          </MenuTab>
        </Tabs>
      </NavContainer>
    );
  }
}

export default compose(
  connect(({ firebase: { auth } }) => ({
    authed: !!auth && !!auth.uid,
  })),
)(Nav);
