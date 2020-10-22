import React, { useState, useEffect } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ErrorBoundary } from 'src/components/error';
import { useFirestore } from 'react-redux-firebase';
import { useInView } from 'react-intersection-observer';
import { Card } from 'src/components/card';
import { Loading } from 'src/components/loading';
import ViewError from 'src/components/viewError';
import { UserListItem } from 'src/components/entities';

const MembersList = (props) => {
  const { club, id, profile } = props;
  const [lastUser, setLastUser] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState([]);
  const [err, setErr] = useState(null);

  const firestore = useFirestore();

  const { ref, inView } = useInView({ threshold: 0.8 });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const queryUsers = await firestore
          .collection('users')
          .where(
            'approved',
            'array-contains',
            firestore.doc(`clubs/${club.id || id}`),
          )
          .orderBy('email')
          .startAfter(lastUser)
          .limit(10)
          .get();

        const query2 = await firestore
          .collection('users')
          .where(
            'pending',
            'array-contains',
            firestore.doc(`clubs/${club.id || id}`),
          )
          .limit(10)
          .get();

        setUsers((prev) => [...prev, ...queryUsers.docs]);
        setPending(query2.docs);
        setLastUser(queryUsers.docs[queryUsers.docs.length - 1]);
        setIsLoading(false);
      } catch (err) {
        setErr(err);
        setIsLoading(false);
      }
    }

    if (inView) fetchData();

    return;
  }, [inView]);

  if (profile.isEmpty) {
    return <Loading />;
  }

  if (club) {
    return (
      <React.Fragment>
        {pending.map((user) => {
          if (!user) return null;

          return (
            <ErrorBoundary key={user.id}>
              <UserListItem
                userObject={user.data()}
                id={user.id}
                name={user.data().name}
                pfp={user.data().pfp}
                avatarSize={40}
                club={club}
                clubId={club.id || id}
              />
            </ErrorBoundary>
          );
        })}
        {users.map((user) => {
          if (!user) return null;

          return (
            <ErrorBoundary key={user.id}>
              <UserListItem
                userObject={user.data()}
                id={user.id}
                name={user.data().name}
                pfp={user.data().pfp}
                studentId={user.data().studentId}
                avatarSize={40}
                club={club}
                clubId={club.id || id}
              />
            </ErrorBoundary>
          );
        })}
        <div ref={ref}>{isLoading && <Loading />}</div>
      </React.Fragment>
    );
  }

  if (err)
    return (
      <Card>
        <ViewError refresh heading={err.message ? err.message : err} />
      </Card>
    );

  return (
    <Card>
      <ViewError
        refresh
        heading={'We weren’t able to fetch the members of this club.'}
      />
    </Card>
  );
};

export default compose(
  withRouter,
  connect(({ firebase: { profile } }) => ({ profile })),
)(MembersList);
