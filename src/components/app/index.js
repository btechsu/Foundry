import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'; // make sure you add this for firestore
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { Provider } from 'react-redux';
import {
  firebase as fbConfig,
  reduxFirebase as rfConfig,
} from '@helpers/firebase-config';

// Initialize Firebase instance
firebase.initializeApp(fbConfig);
firebase.firestore();

const AppWrapper = ({ store, children }) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        {children}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default AppWrapper;