import React from 'react';
import { connect } from 'react-redux';
import { PrimaryButton, OutlineButton } from 'src/components/button';
import { isInClub } from 'src/helpers/permissions';
import { isAdmin } from 'src/helpers/permissions';
import getComposerLink from 'src/helpers/get-composer-link';
import JoinClub from 'src/components/joinClubWrapper';

const MobileClub = (props) => {
  const { club, id, auth, profile } = props;
  const { pathname, search } = getComposerLink({ clubId: club.id || id });

  if (
    profile.isLoaded &&
    !profile.isEmpty &&
    profile.approved &&
    isInClub(profile.approved, club.id || id)
  ) {
    if (isAdmin(club, auth.uid)) {
      return (
        <OutlineButton
          size={'small'}
          to={{
            pathname,
            search,
          }}
        >
          New post
        </OutlineButton>
      );
    }

    return null;
  }

  if (
    profile.isLoaded &&
    !profile.isEmpty &&
    profile.pending &&
    isInClub(profile.pending, club.id || id)
  ) {
    return null;
  }

  return (
    <JoinClub
      club={club}
      id={id}
      render={({ isLoading }) => (
        <PrimaryButton size={'small'} isLoading={isLoading}>
          {isLoading ? 'Joining...' : 'Join'}
        </PrimaryButton>
      )}
    />
  );
};

export const MobileClubAction = connect(({ firebase: { profile, auth } }) => ({
  auth,
  profile,
}))(MobileClub);

const MobileChannel = (props) => {
  const { club, channel, id, auth } = props;
  const { pathname, search } = getComposerLink({
    clubId: club.id || id,
    channelId: channel ? channel.id : null,
  });

  if (auth.uid && isAdmin(club.id || id, auth.uid)) {
    return (
      <OutlineButton
        size={'small'}
        to={{
          pathname,
          search,
        }}
      >
        New post
      </OutlineButton>
    );
  }

  return null;
};

export const MobileChannelAction = connect(({ firebase: { auth } }) => ({
  auth,
}))(MobileChannel);
