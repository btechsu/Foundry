import * as actions from './actionTypes';

// Clean up messages
export const clean = () => ({
  type: actions.CLEAN_UP,
});

// Sign up action creator
export const signUp = (data) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: actions.AUTH_START });
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, code: err.code, payload: err.message });
  }
  dispatch({ type: actions.AUTH_END });
};

// Logout action creator
export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.error(err.message);
  }
};

// Login action creator
export const signIn = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: actions.AUTH_START });
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, code: err.code, payload: err.message });
  }
  dispatch({ type: actions.AUTH_END });
};

// Edit profile
export const editProfile = (data) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const { uid: userId, email: userEmail } = getState().firebase.auth;
  dispatch({ type: actions.PROFILE_EDIT_START });
  try {
    //edit the user profile
    if (data.email !== userEmail) {
      await user.updateEmail(data.email);
    }

    await firestore.collection('users').doc(userId).set({
      firstName: data.firstName,
      lastName: data.lastName,
    });

    if (data.password.length > 0) {
      await user.updatePassword(data.password);
    }
    dispatch({ type: actions.PROFILE_EDIT_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: err.message });
  }
};
