import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import auth from './auth';
import modals from './modals';
import notifications from './notifications';
import titlebar from './titlebar';
import toasts from './toasts';

const getReducers = () => {
  return combineReducers({
    auth,
    modals,
    notifications,
    titlebar,
    toasts,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  });
};

export default getReducers;
