import React from 'react';
import { ChannelActions } from './components/channelActions';
import { ChannelMeta } from './components/channelMeta';
import { ChannelCommunityMeta } from './components/channelCommunityMeta';
import { ProfileContainer } from './style';

export const ChannelProfileCard = (props) => {
  const { channel, hideActions, hideCommunityMeta } = props;

  return (
    <ProfileContainer data-cy="channel-profile-card">
      {!hideCommunityMeta && <ChannelCommunityMeta channel={channel} />}
      <ChannelMeta channel={channel} />
      {!hideActions ? (
        <ChannelActions channel={channel} />
      ) : (
        <div style={{ paddingBottom: '12px' }} />
      )}
    </ProfileContainer>
  );
};