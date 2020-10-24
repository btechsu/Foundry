import React, { useState, useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { ClubListStyle } from '../style';
import ClubItem from './clubItem';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

function ClubList({ dispatch }) {
  const firestore = useFirestore();
  const [clubs, setClubs] = useState([]);

  const refresh = () => {
    firestore
      .collection('clubs')
      .limit(10)
      .get()
      .then((snapshot) => {
        setClubs(snapshot.docs);
      });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ClubListStyle>
      {clubs.map((club) => (
        <ClubItem
          data={club.data()}
          key={club.id}
          id={club.id}
          refresh={refresh}
          dispatch={dispatch}
        />
      ))}
    </ClubListStyle>
  );
}

export default compose(connect())(ClubList);
