// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { ClubAvatar } from 'src/components/avatar';
import { ClubMeta } from './components/clubMeta';
import { PrimaryButton } from 'src/components/button';
import {
  ProfileContainer,
  ActionsRowContainer,
  ProfileAvatarContainer,
  CoverPhoto,
} from './style';

export const ClubCard = (props) => {
  const { club, id } = props;

  return (
    <ProfileContainer data-cy="club-profile-card">
      <Link to={`/${club.id || id}`}>
        <CoverPhoto src={club.coverPhoto} />
      </Link>

      <ProfileAvatarContainer>
        <ClubAvatar showHoverProfile={false} size={60} club={club} id={id} />
      </ProfileAvatarContainer>

      <ClubMeta club={club} id={id} />

      <ActionsRowContainer>
        <PrimaryButton to={`/${club.id || id}`}>View more info</PrimaryButton>
      </ActionsRowContainer>
    </ProfileContainer>
  );
};
