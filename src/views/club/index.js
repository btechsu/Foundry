import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import { ClubInfo } from './containers/clubInfo';
import { connect } from 'react-redux';
import {
  useFirestore,
  firestoreConnect,
  firebaseConnect,
} from 'react-redux-firebase';
import { ErrorView, LoadingView } from 'src/views/viewHelpers';

const ClubView = (props) => {
  const { match } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [club, setClub] = useState(null);
  const firestore = useFirestore();
  console.log(props);

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
  }, []);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView />;
  // logic for if this club has been joined by this user and getting the actual club info will be done here
  // then pass down the info through props
  // while data is being fetched return <LoadingView />
  // if club doesn't exist or some other error (specify) return <ErrorView />
  if (club) return <ClubInfo club={club} />;
  return null;
};

export default compose(connect(({ firebase: { profile } }) => ({ profile })))(
  ClubView,
); //perform logic here as an HOC with recompose
// https://react-redux-firebase.com
