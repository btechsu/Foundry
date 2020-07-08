const app = import('firebase/app');
const auth = import('firebase/auth');
const database = import('firebase/firestore');
const functions = import('firebase/functions');
const storage = import('firebase/storage');
const performance = import('firebase/performance');
const analytics = import('firebase/analytics');

const loadDependencies = Promise.all([
  app,
  auth,
  database,
  functions,
  storage,
  performance,
  analytics,
]).then((values) => {
  return values[0];
});

export default loadDependencies;
