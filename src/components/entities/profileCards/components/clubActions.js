import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PrimaryButton, OutlineButton } from 'src/components/button';
import { openModal } from 'src/actions/modals';
import JoinClub from 'src/components/joinClubWrapper';
import { ActionsRowContainer } from '../style';

const IsInClub = (clubsArray, clubID) => {
  const check = clubsArray.filter((club) => club.id === clubID);

  if (check.length === 0) return false;
  else return true;
};

export const UnconnectedClubActions = (props) => {
  const { club, id, profile, dispatch } = props;

  const [isHovering, setHover] = useState(false);
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  const leaveClub = () =>
    dispatch(
      openModal('DELETE_DOUBLE_CHECK_MODAL', {
        id: club.id || id,
        entity: 'team-member-leaving-club',
        message:
          'Are you sure you want to leave this club? This action cannot be undone and you will have to apply again.',
        buttonLabel: 'Leave Club',
      }),
    );

  const retractApplication = () =>
    dispatch(
      openModal('DELETE_DOUBLE_CHECK_MODAL', {
        id: club.id || id,
        entity: 'retract-club-application',
        message:
          'Are you sure you want to retract your application? This action cannot be undone and you will have to apply again.',
        buttonLabel: 'Retract Application',
      }),
    );

  if (
    profile.isLoaded &&
    !profile.isEmpty &&
    profile.clubs.approved &&
    IsInClub(profile.clubs.approved, club.id || id)
  ) {
    return (
      <ActionsRowContainer>
        <OutlineButton
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={leaveClub}
          data-cy="leave-club-button"
        >
          {isHovering ? 'Leave club' : 'Member'}
        </OutlineButton>
      </ActionsRowContainer>
    );
  }

  if (
    profile.isLoaded &&
    !profile.isEmpty &&
    profile.clubs.pending &&
    IsInClub(profile.clubs.pending, club.id || id)
  ) {
    return (
      <ActionsRowContainer>
        <OutlineButton
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={retractApplication}
          data-cy="pending-club-button"
        >
          {isHovering ? 'Retract application' : 'Pending application'}
        </OutlineButton>
      </ActionsRowContainer>
    );
  }

  return (
    <ActionsRowContainer>
      <JoinClub
        club={club}
        id={id}
        render={({ isLoading }) => (
          <PrimaryButton
            data-cy="profile-join-button"
            isLoading={isLoading}
            icon={'door-enter'}
          >
            {isLoading ? 'Submitting...' : 'Join club'}
          </PrimaryButton>
        )}
      />
    </ActionsRowContainer>
  );
};

export const ClubActions = connect(({ firebase: { profile } }) => ({
  profile,
}))(UnconnectedClubActions);
