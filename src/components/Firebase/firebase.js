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
      this.functions = App.functions();
      this.storage = App.storage();
      this.analytics = App.analytics();
      this.perf = App.performance();
    }
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSendVerificationEmail = () => this.auth.currentUser.sendEmailVerification();
  doSendPasswordResetEmail = (email) => this.auth.sendPasswordResetEmail(email);
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
