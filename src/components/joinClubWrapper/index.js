import * as React from 'react';
import { connect } from 'react-redux';
import { addToastWithTimeout } from 'src/actions/toasts';
import { openModal } from 'src/actions/modals';
import { useFirebase, useFirestore } from 'react-redux-firebase';

const JoinClub = (props) => {
  const { club, id, dispatch, isLoaded, auth, render, profile } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const firebase = useFirebase();
  const firestore = useFirestore();

  const addMember = async () => {
    if (profile.isEmpty || !auth.uid) {
      return dispatch(openModal('LOGIN_MODAL'));
    }

    try {
      profile.clubs.pending
        ? await firebase.updateProfile({
            clubs: {
              pending: [
                ...profile.clubs.pending,
                firestore.doc(`clubs/${club.id || id}`),
              ],
            },
          })
        : await firebase.updateProfile({
            clubs: {
              pending: [firestore.doc(`clubs/${club.id || id}`)],
            },
          });

      dispatch(
        addToastWithTimeout(
          'success',
          `You have submitted an application for ${club.name}!`,
        ),
      );
    } catch (err) {
      dispatch(addToastWithTimeout('error', err.message));
      return setIsLoading(false);
    }
  };

  const cy = auth.uid ? 'join-club-button' : 'join-club-button-login';

  return (
    <span data-cy={cy} style={{ display: 'flex' }} onClick={addMember}>
      {render({ isLoading })}
    </span>
  );
};

export default connect(({ firebase: { auth, profile } }) => ({
  isLoaded: auth.isLoaded,
  auth: auth,
  profile: profile,
}))(JoinClub);
