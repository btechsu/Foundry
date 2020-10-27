import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ClubAvatar } from 'src/components/avatar';
import { ClubMeta } from './components/clubMeta';
import { ClubActions } from './components/clubActions';
import { ProfileContainer, ProfileAvatarContainer, CoverPhoto } from './style';

const ClubCard = (props) => {
  const { club, id, adminFeatures } = props;

  return (
    <React.Fragment>
      <ProfileContainer data-cy="club-profile-card">
        {adminFeatures ? (
          <CoverPhoto src={club.cover} />
        ) : (
          <Link to={`/${club.id || id}`}>
            <CoverPhoto src={club.cover} />
          </Link>
        )}

        <ProfileAvatarContainer>
          <ClubAvatar
            showHoverProfile={false}
            size={60}
            club={club}
            id={id}
            adminFeatures={adminFeatures}
          />
        </ProfileAvatarContainer>

        <ClubMeta club={club} id={id} adminFeatures={adminFeatures} />
      </ProfileContainer>
      {/* We move this outside the container so that the buttons are on the same level on /clubs */}
      <ClubActions club={club} id={id} adminFeatures={adminFeatures} />
    </React.Fragment>
  );
};

export default connect(({ firebase: { profile } }) => ({ profile }))(ClubCard);
