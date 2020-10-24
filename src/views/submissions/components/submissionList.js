import React, { useState, useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { SubmissionListStyle } from '../style';
import SubmissionItem from './submissionItem';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

function SubmissionList({ dispatch }) {
  const firestore = useFirestore();
  const [submissions, setSubmissions] = useState([]);

  const refresh = () => {
    firestore
      .collection('clubSubmissions')
      .limit(10)
      .get()
      .then((snapshot) => {
        setSubmissions(snapshot.docs);
      });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SubmissionListStyle>
      {submissions.map((club) => (
        <SubmissionItem
          data={club.data()}
          key={club.id}
          id={club.id}
          refresh={refresh}
        />
      ))}
    </SubmissionListStyle>
  );
}

export default compose(connect())(SubmissionList);
