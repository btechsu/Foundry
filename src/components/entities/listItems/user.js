import React, { useState } from 'react';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { openModal } from 'src/actions/modals';
import { addToastWithTimeout } from 'src/actions/toasts';
import { UserAvatar } from 'src/components/avatar';
import { useFirestore } from 'react-redux-firebase';
import { isSuperAdmin } from 'src/views/clubSettings/components/editForm';
import {
  IsInClub,
  isAdmin,
} from 'src/components/entities/profileCards/components/clubActions';
import ConditionalWrap from 'src/components/conditionalWrap';
import { OutlineButton, PrimaryButton } from 'src/components/button';
import {
  RowWithAvatar,
  UserAvatarContainer,
  Content,
  Label,
  Sublabel,
  Actions,
  CardLink,
} from './style';

const User = (props) => {
  const {
    userObject,
    id,
    name,
    avatarSize = 40,
    children,
    dispatch,
    clubId,
    club,
    studentId,
    auth,
  } = props;

  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);
  if (!userObject) return null;

  const acceptUser = () => {
    setIsLoading(true);
    const batch = firestore.batch();

    const acceptClub = firestore.collection('clubs').doc(clubId);
    const currentUser = firestore.collection('users').doc(id);
    batch.update(currentUser, {
      pending: userObject.pending.filter((club) => club.id !== clubId),
    });
    batch.update(currentUser, {
      approved: firestore.FieldValue.arrayUnion(acceptClub),
    });

    batch
      .commit()
      .then(() => {
        dispatch(
          addToastWithTimeout(
            'success',
            `Accepted ${userObject.name || 'user'}.`,
          ),
        );
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(addToastWithTimeout('error', err.message || err));
        setIsLoading(false);
      });
  };
  const denyUser = () =>
    dispatch(
      openModal('DELETE_DOUBLE_CHECK_MODAL', {
        userId: id,
        userObject: userObject,
        id: club.id || clubId,
        entity: 'deny-club-application',
        message: 'Are you sure you want to deny an application to this user?',
        buttonLabel: 'Deny Application',
      }),
    );
  const kickUser = () =>
    dispatch(
      openModal('DELETE_DOUBLE_CHECK_MODAL', {
        userId: id,
        id: club.id || clubId,
        entity: 'kick-user',
        message: `Are you sure you want to kick ${
          userObject.name || 'this user'
        }?`,
        buttonLabel: 'Kick User',
      }),
    );
  const removeAdmin = () =>
    dispatch(
      openModal('DELETE_DOUBLE_CHECK_MODAL', {
        userId: id,
        id: club.id || clubId,
        entity: 'kick-admin',
        message: `Are you sure you want to remove ${
          userObject.name || 'this admin'
        }?`,
        buttonLabel: 'Remove Admin',
      }),
    );

  return (
    <ConditionalWrap
      condition={true}
      wrap={(children) => <CardLink>{children}</CardLink>}
    >
      <RowWithAvatar>
        <UserAvatarContainer>
          <UserAvatar
            user={userObject}
            size={avatarSize}
            showHoverProfile={false}
            isClickable={false}
          />
        </UserAvatarContainer>

        <Content>
          {name && <Label title={name}>{name}</Label>}{' '}
          {userObject.email && <Sublabel>{userObject.email}</Sublabel>}
          {studentId && <Sublabel>{studentId}</Sublabel>}
        </Content>

        <Actions>
          <ConditionalWrap
            condition={
              isAdmin(club, auth.uid) && IsInClub(userObject.pending, clubId)
            }
            wrap={() => (
              <React.Fragment>
                <PrimaryButton
                  data-cy="accept-user-button"
                  isLoading={isLoading}
                  icon={'door-enter'}
                  size={'small'}
                  onClick={acceptUser}
                >
                  {isLoading ? 'Loading...' : 'Accept'}
                </PrimaryButton>
                <OutlineButton
                  data-cy="deny-user-button"
                  isLoading={isLoading}
                  icon={'door-enter'}
                  size={'small'}
                  onClick={denyUser}
                  style={{ marginTop: '6px' }}
                >
                  {isLoading ? 'Loading...' : 'Deny'}
                </OutlineButton>
              </React.Fragment>
            )}
          />
          <ConditionalWrap
            condition={isSuperAdmin(club, auth.uid) && isAdmin(club, id)}
            wrap={() => (
              <OutlineButton
                data-cy="remove-admin-button"
                isLoading={isLoading}
                icon={'door-enter'}
                size={'small'}
                onClick={removeAdmin}
                style={{ marginTop: '6px' }}
              >
                {isLoading ? 'Loading...' : 'Remove'}
              </OutlineButton>
            )}
          />
          <ConditionalWrap
            condition={
              isAdmin(club, auth.uid) &&
              IsInClub(userObject.approved, clubId) &&
              !isAdmin(club, id)
            }
            wrap={() => (
              <React.Fragment>
                <OutlineButton
                  data-cy="deny-user-button"
                  isLoading={isLoading}
                  icon={'door-enter'}
                  size={'small'}
                  onClick={kickUser}
                >
                  {isLoading ? 'Loading...' : 'Kick'}
                </OutlineButton>
              </React.Fragment>
            )}
          />
          {children}
        </Actions>
      </RowWithAvatar>
    </ConditionalWrap>
  );
};

export const UserListItem = compose(
  withRouter,
  connect(({ firebase: { auth } }) => ({ auth })),
)(User);
