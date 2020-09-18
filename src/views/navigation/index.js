// @flow
import React from 'react';
// import * as actions from 'src/actions/auth';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import Tooltip from 'src/components/tooltip';
import { isViewingMarketingPage } from 'src/helpers/is-viewing-marketing-page';
import {
  Overlay,
  NavigationWrapper,
  NavigationGrid,
  AvatarGrid,
  AvatarLink,
  Label,
  IconWrapper,
  Divider,
  DesktopMenuIconsCover,
} from './style';
import Icon from 'src/components/icon';
import NavHead from './navHead';
import NotificationsTab from './notificationsTab';
import { Skip, getAccessibilityActiveState } from './accessibility';
import { NavigationContext } from 'src/helpers/navigation-context';
import { MIN_WIDTH_TO_EXPAND_NAVIGATION } from 'src/components/layout';

const Navigation = (props) => {
  const { authed, isLoaded, history } = props;
  const isMarketingPage = isViewingMarketingPage(history, authed);
  if (isMarketingPage) return null;
  const isWideViewport =
    window && window.innerWidth > MIN_WIDTH_TO_EXPAND_NAVIGATION;

  if (isLoaded && !authed) {
    return (
      <NavigationContext.Consumer>
        {({ navigationIsOpen, setNavigationIsOpen }) => (
          <NavigationWrapper data-cy="navigation-bar" isOpen={navigationIsOpen}>
            <Overlay
              isOpen={navigationIsOpen}
              onClick={() => setNavigationIsOpen(false)}
            />

            <NavigationGrid isOpen={navigationIsOpen}>
              <DesktopMenuIconsCover />

              <Route path="/clubs">
                {({ match }) => (
                  <Tooltip
                    content="Clubs"
                    placement={'left'}
                    isEnabled={!isWideViewport}
                  >
                    <AvatarGrid isActive={!!match}>
                      <AvatarLink
                        to={'/clubs'}
                        data-cy="navigation-clubs"
                        onClick={() => setNavigationIsOpen(false)}
                        {...getAccessibilityActiveState(!!match)}
                      >
                        <IconWrapper>
                          <Icon glyph="explore" />
                        </IconWrapper>

                        <Label>Clubs</Label>
                      </AvatarLink>
                    </AvatarGrid>
                  </Tooltip>
                )}
              </Route>

              <Divider />

              <Route path="/login">
                {({ match }) => (
                  <Tooltip
                    content="Log in or sign up"
                    placement={'left'}
                    isEnabled={!isWideViewport}
                  >
                    <AvatarGrid isActive={!!match}>
                      <AvatarLink
                        to={'/login'}
                        data-cy="navigation-login"
                        onClick={() => setNavigationIsOpen(false)}
                        {...getAccessibilityActiveState(!!match)}
                      >
                        <IconWrapper>
                          <Icon glyph="door-enter" />
                        </IconWrapper>

                        <Label>Log in or sign up</Label>
                      </AvatarLink>
                    </AvatarGrid>
                  </Tooltip>
                )}
              </Route>
            </NavigationGrid>
          </NavigationWrapper>
        )}
      </NavigationContext.Consumer>
    );
  }

  if (isLoaded && authed) {
    return (
      <NavigationContext.Consumer>
        {({ navigationIsOpen, setNavigationIsOpen }) => (
          <NavigationWrapper data-cy="navigation-bar" isOpen={navigationIsOpen}>
            <NavHead {...props} />
            <Skip />

            <Overlay
              isOpen={navigationIsOpen}
              onClick={() => setNavigationIsOpen(false)}
            />

            <NavigationGrid isOpen={navigationIsOpen}>
              <DesktopMenuIconsCover />
              <Route path="/notifications">
                {({ match }) => <NotificationsTab isActive={!!match} />}
              </Route>

              <Route path="/clubs">
                {({ match }) => (
                  <Tooltip
                    content="Clubs"
                    placement={'left'}
                    isEnabled={!isWideViewport}
                  >
                    <AvatarGrid
                      isActive={
                        match && match.url === '/clubs' && match.isExact
                      }
                    >
                      <AvatarLink
                        to={'/clubs'}
                        data-cy="navigation-clubs"
                        onClick={() => setNavigationIsOpen(false)}
                        {...getAccessibilityActiveState(
                          match && match.url === '/clubs' && match.isExact,
                        )}
                      >
                        <IconWrapper>
                          <Icon glyph="explore" />
                        </IconWrapper>

                        <Label>Clubs</Label>
                      </AvatarLink>
                    </AvatarGrid>
                  </Tooltip>
                )}
              </Route>

              <Divider />

              <Divider />
              <Route path="/new/club">
                {({ match }) => (
                  <Tooltip
                    content="Submit a club"
                    placement={'left'}
                    isEnabled={!isWideViewport}
                  >
                    <AvatarGrid
                      isActive={
                        match && match.url === '/new/club' && match.isExact
                      }
                    >
                      <AvatarLink
                        to={'/new/club'}
                        data-cy="navigation-new-club"
                        {...getAccessibilityActiveState(
                          match && match.url === '/new/club' && match.isExact,
                        )}
                      >
                        <IconWrapper>
                          <Icon glyph="plus" />
                        </IconWrapper>

                        <Label>Submit a club</Label>
                      </AvatarLink>
                    </AvatarGrid>
                  </Tooltip>
                )}
              </Route>
            </NavigationGrid>
          </NavigationWrapper>
        )}
      </NavigationContext.Consumer>
    );
  }

  return <NavigationWrapper />;
};

export default compose(
  connect(({ firebase: { auth } }) => ({
    isLoaded: auth.isLoaded,
    authed: !!auth && !!auth.uid,
    // logout: actions.signOut,
  })),
  withRouter,
)(Navigation);
