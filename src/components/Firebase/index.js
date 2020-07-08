import getFirebaseInstance from './firebase';
import useAuth from './useAuth';
import FirebaseContext, { withFirebase } from './context';

export { FirebaseContext, useAuth, withFirebase };
export default getFirebaseInstance;
