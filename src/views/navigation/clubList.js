import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Tooltip from 'src/components/tooltip';
import { MIN_WIDTH_TO_EXPAND_NAVIGATION } from 'src/components/layout';
import { ErrorBoundary } from 'src/components/error';
import { AvatarGrid, AvatarLink, Avatar, Label } from './style';

const ClubListItem = (props) => {
  const { isActive, club, sidenavIsOpen, onClick } = props;
  const [clubDoc, setClubDoc] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    club
      .get()
      .then((gotDoc) => {
        setClubDoc(gotDoc.data());
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const isWideViewport =
    window && window.innerWidth > MIN_WIDTH_TO_EXPAND_NAVIGATION;

  if (loading || !clubDoc) return null;

  return (
    <Tooltip
      content={clubDoc.name}
      placement={'left'}
      isEnabled={!isWideViewport}
    >
      <AvatarGrid isActive={isActive}>
        <AvatarLink to={`/${club.id}`} onClick={onClick}>
          <Avatar
            src={clubDoc.pfp || '/img/default_club.svg'}
            size={sidenavIsOpen ? 32 : 36}
          />

          <Label>{clubDoc.name}</Label>
        </AvatarLink>
      </AvatarGrid>
    </Tooltip>
  );
};

const ClubList = (props) => {
  const { profile, sidenavIsOpen, setNavigationIsOpen } = props;

  if (!profile.isLoaded) return null;

  const approved = profile.approved;
  const pending = profile.pending;
  const allClubs = approved.concat(pending);

  return allClubs.map((club, index) => {
    if (!club) return null;

    return (
      <ErrorBoundary key={club.id}>
        <Route path="/:clubSlug">
          {({ match }) => {
            const isActive =
              match && match.params && match.params.clubSlug === club.id;

            return (
              <ClubListItem
                isActive={isActive}
                club={club}
                index={index}
                sidenavIsOpen={sidenavIsOpen}
                onClick={() => setNavigationIsOpen(false)}
              />
            );
          }}
        </Route>
      </ErrorBoundary>
    );
  });
};
export default compose(connect(({ firebase: { profile } }) => ({ profile })))(
  ClubList,
);
