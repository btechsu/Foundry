import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { isAdmin } from 'src/components/entities/profileCards/components/clubActions';
import AvailableClubsDropdown from './AvailableClubDropdown';

const CommunitySelector = (props) => {
  const { onClubChange, id, profile, auth } = props;

  const onChange = (evt) => onClubChange(evt.target.value);

  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (profile.isLoaded && profile.approved) {
      profile.approved.forEach((club) => {
        club
          .get()
          .then((clubDoc) => {
            if (clubDoc.data() && isAdmin(clubDoc.data(), auth.uid)) {
              setClubs((prev) => [...prev, clubDoc]);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            setError(true);
          });
      });
    }
  }, [profile]);

  return (
    <AvailableClubsDropdown
      id={id}
      onChange={onChange}
      isLoading={isLoading}
      error={error}
      clubs={clubs}
    />
  );
};

export default compose(
  connect(({ firebase: { auth, profile } }) => ({ auth, profile })),
)(CommunitySelector);
