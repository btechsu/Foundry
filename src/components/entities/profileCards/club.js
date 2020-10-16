import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ClubAvatar } from 'src/components/avatar';
import { ClubMeta } from './components/clubMeta';
import { PrimaryButton, OutlineButton } from 'src/components/button';
import { ClubActions } from './components/clubActions';
import { ProfileContainer, ProfileAvatarContainer, CoverPhoto } from './style';

const IsInClub = (clubsArray, clubID) => {
  var temp = [];
  clubsArray.forEach((element) => {
    if (element.id === clubID) temp.push(element.id);
  });

  if (temp.length === 0) return false;
  else return true;
};

const ClubCard = (props) => {
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

      <ClubActions club={club} id={id} />
    </ProfileContainer>
  );
};

export default connect(({ firebase: { profile } }) => ({ profile }))(ClubCard);
