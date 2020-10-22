import React, { useState } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'src/components/error';
import { isAdmin } from '../profileCards/components/clubActions';
import Icon from 'src/components/icon';
import { OutlineButton, PrimaryOutlineButton } from 'src/components/button';
import Tooltip from 'src/components/tooltip';
import {
  ChannelRow,
  ChannelContent,
  Label,
  Description,
  ChannelActions,
} from './style';

const Channel = (props) => {
  const {
    channel,
    club,
    id,
    auth,
    name,
    description,
    children,
    isActive,
  } = props;
  if (!channel) return null;

  const renderAction = () => {
    const chevron = <Icon glyph="view-forward" size={24} />;
    if (!auth.uid) return chevron;

    if (isAdmin(club, auth.uid)) {
      return (
        <React.Fragment>
          <Tooltip content="Go to settings">
            <span style={{ marginLeft: '8px', display: 'flex' }}>
              <OutlineButton
                to={`/${club.id || id}/${channel.id}/settings`}
                size={'small'}
                style={{ padding: '4px' }}
              >
                <Icon
                  style={{ marginTop: '-1px' }}
                  glyph="settings"
                  size={24}
                />
              </OutlineButton>
            </span>
          </Tooltip>
        </React.Fragment>
      );
    }
  };

  return (
    <ErrorBoundary>
      <ChannelRow isActive={isActive}>
        <Link to={`/${club.id || id}/${channel.id}?tab=posts`}>
          <ChannelContent>
            {name && (
              <Label title={name}>
                {channel.isPrivate && (
                  <Icon glyph="private-outline" size={14} />
                )}
                # {name}
              </Label>
            )}

            {description && <Description>{description}</Description>}
          </ChannelContent>
        </Link>

        <ChannelActions>
          {renderAction()}
          {children}
        </ChannelActions>
      </ChannelRow>
    </ErrorBoundary>
  );
};

export const ChannelListItem = compose(
  connect(({ firebase: { auth } }) => ({ auth })),
)(Channel);
