import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { openModal } from 'src/actions/modals';
import Icon from 'src/components/icon';
import {
  isAdmin,
  IsInClub,
} from 'src/components/entities/profileCards/components/clubActions';
import {
  SidebarSectionHeader,
  SidebarSectionHeading,
  List,
  ListItem,
  ListItemLink,
  ListItemLabel,
  ListItemContent,
  NameWarn,
} from '../style';

const Component = (props) => {
  const { club, id, dispatch, auth, profile } = props;

  const leaveClub = () =>
    dispatch(
      openModal('DELETE_DOUBLE_CHECK_MODAL', {
        id: club.id || id,
        entity: 'team-member-leaving-club',
        message: 'Are you sure you want to leave this club?',
        buttonLabel: 'Leave Club',
      }),
    );

  if (
    !IsInClub(profile.approved, club.id || id) &&
    !isAdmin(club, auth.uid)
  )
    return null;

  return (
    <React.Fragment>
      <SidebarSectionHeader>
        <SidebarSectionHeading>More</SidebarSectionHeading>
      </SidebarSectionHeader>

      <List>
        {isAdmin(club, auth.uid) ? (
          <ListItemLink to={`/${club.id || id}/settings`}>
            <ListItemContent>
              <ListItemLabel>Club settings</ListItemLabel>
            </ListItemContent>
            <Icon glyph="view-forward" size={24} />
          </ListItemLink>
        ) : (
          <ListItem onClick={leaveClub}>
            <ListItemContent>
              <NameWarn>Leave club</NameWarn>
            </ListItemContent>
            <Icon glyph="door-leave" size={24} />
          </ListItem>
        )}
      </List>
    </React.Fragment>
  );
};

export const MobileClubInfoActions = compose(
  connect(({ firebase: { profile, auth } }) => ({
    profile,
    auth,
  })),
)(Component);
