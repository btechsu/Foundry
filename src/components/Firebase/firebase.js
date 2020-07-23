const config = {
  apiKey: process.env.GATSBY_FIREBASE_KEY,
  authDomain: process.env.GATSBY_FIREBASE_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MES_ID,
};

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      const App = app.firebase;

      App.initializeApp(config);
      App.analytics();

      this.auth = App.auth();
      this.db = App.firestore();
      this.firestore = App.firestore;
      this.functions = App.functions();
      this.storage = App.storage();
      this.analytics = App.analytics();
      this.perf = App.performance();

      this.cred = (email, password) =>
        App.auth.EmailAuthProvider.credential(email, password);
    }
  }

  doSignOut = () => this.auth.signOut();
  doSignInWithEmailAndPassword = ({ email, password }) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSendVerificationEmail = () => this.auth.currentUser.sendEmailVerification();
  doSendPasswordResetEmail = ({ email }) =>
    this.auth.sendPasswordResetEmail(email);
  // gets user profile in real time
  getUserProfile = ({ userID, onSnapshot }) =>
    this.db.collection('users').doc(userID).onSnapshot(onSnapshot);
  getCurrentCredential = ({ email, password }) => this.cred(email, password);
  doSendVerificationEmail = () => this.auth.currentUser.sendEmailVerification();

  verifyCaptchaToken = ({ token }) =>
    this.functions.httpsCallable('verifyCaptchaToken')({
      token: token,
    });
  createNewAccount = ({ email, password, year }) =>
    this.functions.httpsCallable('createNewAccount')({
      email: email,
      password: password,
      year: year,
    });
  deleteAccount = ({ uid }) =>
    this.functions.httpsCallable('deleteUser')({ uid: uid });
  updateEmail = ({ selected, userID }) => {
    var batch = this.db.batch();
    var userRef = this.db.collection('users').doc(userID);
    batch.update(userRef, { mail: this.firestore.FieldValue.delete() });
    batch.update(userRef, { mail: selected });
    return batch.commit();
  };
  submitClub = ({
    email,
    description,
    room,
    days,
    time,
    type,
    text,
    credits,
  }) =>
    this.functions.httpsCallable('submitClub')({
      email: email,
      description: description,
      room: room,
      days: days,
      time: time,
      type: type,
      credits: credits,
      text: text,
    });
  /*
   * The following function 'joinClub' is a function called when the user want to join a club
   * First, we get the userDoc
   * We see if there is an array called 'clubs' in the userDoc
   * If there is, we loop though all the array values
   * While looping, we check if the current club we are looking at is equal to the one the user is applying...
   * ...for and if their application has alreeady be 'denied'. If it has, we don't push it to the new array...
   * ...All the other values but the clubs that have been rejected are pushed to a new array.
   * The old 'clubs' array is deleted and the new one is pushed to the userDoc
   */
  joinClub = ({ clubID, userID }) => {
    const userDocRef = this.db.collection('users').doc(userID);
    const clubDoc = this.db.doc(`/clubs/${clubID}`);

    return this.db.runTransaction((transaction) => {
      return transaction.get(userDocRef).then((userDoc) => {
        const clubs = [
          {
            club: clubDoc,
            status: 'pending',
          },
        ];
        const clubData = !userDoc.data() ? undefined : userDoc.data().clubs;

        if (clubData !== undefined && clubData.length !== 0) {
          clubData.forEach((reference) => {
            console.log(reference);
            if (reference.club !== clubDoc) {
              if (reference.status !== 'denied') {
                clubs.push(reference);
              }
            }
          });
        }

        transaction.update(userDocRef, {
          clubs: this.firestore.FieldValue.delete(),
        });
        transaction.update(userDocRef, { clubs: clubs });
      });
    });
  };
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  } else if (firebaseInstance) {
    return firebaseInstance;
  } else {
    return null;
  }
}

export default getFirebaseInstance;
