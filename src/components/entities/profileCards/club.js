// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ClubAvatar } from 'src/components/avatar';
import { ClubMeta } from './components/clubMeta';
import { PrimaryButton, OutlineButton } from 'src/components/button';
import {
  ProfileContainer,
  ActionsRowContainer,
  ProfileAvatarContainer,
  CoverPhoto,
} from './style';

const IsInClub = (clubsArray, clubID) => {
  var temp = [];
  clubsArray.forEach((element) => {
    if (element.id === clubID) temp.push(element.id);
  });

  if (temp.length === 0) return false;
  else return true;
};

const ClubCard = (props) => {
  const { club, id, profile } = props;
  if (profile.isLoaded) console.log(IsInClub(profile.clubs.approved, id));

  const [isHovering, setHover] = useState(false);
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

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
        {profile.isLoaded && IsInClub(profile.clubs.approved, id) ? (
          <OutlineButton
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            // onClick={leaveCommunity}
            data-cy="leave-club-button"
          >
            {isHovering ? 'Leave club' : 'Member'}
          </OutlineButton>
        ) : profile.isLoaded && IsInClub(profile.clubs.pending, id) ? (
          <OutlineButton
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            // onClick={leaveCommunity}
            data-cy="leave-club-button"
          >
            Pending application
          </OutlineButton>
        ) : (
          <PrimaryButton to={`/${club.id || id}`}>Join club</PrimaryButton>
        )}
      </ActionsRowContainer>
    </ProfileContainer>
  );
};

export default connect(({ firebase: { profile } }) => ({ profile }))(ClubCard);
