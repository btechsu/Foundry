import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Tooltip from 'src/components/tooltip';
import compose from 'recompose/compose';
import { MIN_WIDTH_TO_EXPAND_NAVIGATION } from 'src/components/layout';
import Icon from 'src/components/icon';
import { getAccessibilityActiveState } from './accessibility';
import { NavigationContext } from 'src/helpers/navigation-context';
import { AvatarGrid, AvatarLink, Label, IconWrapper, RedDot } from './style';

const NotificationsTab = (props) => {
  const { count = 1, isActive, match } = props;

  const isWideViewport =
    window && window.innerWidth > MIN_WIDTH_TO_EXPAND_NAVIGATION;

  return (
    <NavigationContext.Consumer>
      {({ setNavigationIsOpen }) => (
        <Tooltip
          content="Notifications"
          placement={'left'}
          isEnabled={!isWideViewport}
        >
          <AvatarGrid isActive={isActive}>
            <AvatarLink
              to={'/notifications'}
              data-cy="navigation-notifications"
              onClick={() => setNavigationIsOpen(false)}
              {...getAccessibilityActiveState(
                match && match.url.includes('/notifications'),
              )}
            >
              <IconWrapper>
                <Icon glyph="notification" />
                {count > 0 && <RedDot />}
              </IconWrapper>

              <Label>Notifications</Label>
            </AvatarLink>
          </AvatarGrid>
        </Tooltip>
      )}
    </NavigationContext.Consumer>
  );
};

const map = (state) => ({ count: state.notifications.notifications });

export default compose(
  // $FlowIssue
  connect(map),
  withRouter,
)(NotificationsTab);
