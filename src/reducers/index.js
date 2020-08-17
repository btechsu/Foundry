// @flow
import { combineReducers } from 'redux';
import { reducer as firebase } from 'react-redux-firebase';
import { reducer as firestore } from 'react-redux-firebase';

import auth from './auth';
import modals from './modals';

const getReducers = () => {
  return combineReducers({
    auth,
    modals,
    firebase,
    firestore,
  });
};

export default getReducers;
