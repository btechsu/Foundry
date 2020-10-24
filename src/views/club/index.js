import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import { ClubInfo } from './containers/clubInfo';
import { connect } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { ErrorView, LoadingView } from 'src/views/viewHelpers';

const ClubView = (props) => {
  const { match, history } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [club, setClub] = useState(null);
  const firestore = useFirestore();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const query = await firestore
          .collection('clubs')
          .doc(match.params.clubSlug)
          .get();

        if (!query.exists) {
          setError(true);
          setLoading(false);
        } else {
          setClub(query);
          setLoading(false);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }

    fetchData();
    return;
  }, [match.params.clubSlug]);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView />;
  if (club) return <ClubInfo club={club} />;
  return null;
};

export default compose(connect(({ firebase: { profile } }) => ({ profile })))(
  ClubView,
);
