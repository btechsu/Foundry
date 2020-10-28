import React, { useState, useEffect } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ErrorBoundary } from 'src/components/error';
import { useFirestore } from 'react-redux-firebase';
import { useInView } from 'react-intersection-observer';
import { isAdmin } from 'src/helpers/permissions';
import { Card } from 'src/components/card';
import { Loading } from 'src/components/loading';
import ViewError from 'src/components/viewError';
import { UserListItem } from 'src/components/entities';

const MembersList = (props) => {
  const { club, id, profile, auth, getPending } = props;
  const [lastUser, setLastUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(null);

  const firestore = useFirestore();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (club && !inView) {
      setIsLoading(true);
      var unsubscribe = firestore
        .collection('users')
        .where(
          getPending ? 'pending' : 'approved',
          'array-contains',
          firestore.doc(`clubs/${club.id || id}`),
        )
        .orderBy('email')
        .limit(20)
        .onSnapshot(
          (queryUsers) => {
            setUsers((prev) => [...prev, ...queryUsers.docs]);
            setLastUser(queryUsers.docs[queryUsers.docs.length - 1]);
            setIsLoading(false);
          },
          function (error) {
            setErr(error);
            setIsLoading(false);
          },
        );

      return () => unsubscribe();
    }
  }, [club, getPending]);

  useEffect(() => {
    if (inView && lastUser && isLoading) {
      firestore
        .collection('users')
        .where(
          getPending ? 'pending' : 'approved',
          'array-contains',
          firestore.doc(`clubs/${club.id || id}`),
        )
        .orderBy('email')
        .startAfter(lastUser)
        .limit(20)
        .get()
        .then((queryUsers) => {
          setUsers((prev) => [...prev, ...queryUsers.docs]);
          setLastUser(queryUsers.docs[queryUsers.docs.length - 1]);
          setIsLoading(false);
        })
        .catch((err) => {
          setErr(err);
          setIsLoading(false);
        });
    }
  }, [inView]);

  if (profile.isEmpty) {
    return <Loading />;
  }

  if (club) {
    return (
      <React.Fragment>
        {users.map((user) => {
          if (!user) return null;
          if (user.id === auth.uid) return null;
          if (isAdmin(club, user.id)) return null;

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
  connect(({ firebase: { profile, auth } }) => ({ profile, auth })),
)(MembersList);
