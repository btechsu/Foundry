import React, { useEffect } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { isLoaded, firestoreConnect } from 'react-redux-firebase';
import { Route } from 'react-router-dom';
import Tooltip from 'src/components/tooltip';
import { MIN_WIDTH_TO_EXPAND_NAVIGATION } from 'src/components/layout';
import { ErrorBoundary } from 'src/components/error';
import {
  AvatarGrid,
  AvatarLink,
  Avatar,
  Shortcut,
  Label,
  BlackDot,
} from './style';

const ClubListItem = (props) => {
  const { isActive, club, sidenavIsOpen, index, onClick } = props;

  const appControlSymbol = '⌘';

  const isWideViewport =
    window && window.innerWidth > MIN_WIDTH_TO_EXPAND_NAVIGATION;

  return (
    <Tooltip content={club.name} placement={'left'} isEnabled={!isWideViewport}>
      <AvatarGrid isActive={isActive}>
        <AvatarLink to={`/${club.slug}`} onClick={onClick}>
          <Avatar src={club.profilePhoto} size={sidenavIsOpen ? 32 : 36} />
          {isActive === false && <BlackDot />}

          <Label>{club.name}</Label>

          {index < 9 && (
            <Shortcut>
              {appControlSymbol}
              {index + 1}
            </Shortcut>
          )}
        </AvatarLink>
      </AvatarGrid>
    </Tooltip>
  );
};

const ClubList = (props) => {
  const { data, history, sidenavIsOpen, setNavigationIsOpen } = props;

  return null;
};

export default compose(
  firestoreConnect((props) => [
    { collection: 'users', doc: props.uid, storeAs: 'user' },
  ]),
  connect((state, props) => ({
    user: state.firestore.data.user ? state.firestore.data.user.clubs : null,
  })),
)(ClubList);
