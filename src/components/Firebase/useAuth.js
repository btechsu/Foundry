import { useEffect, useState } from 'react';
import getFirebaseInstance from './firebase';
import loadDependencies from './loadDependencies';

function useAuth() {
  const [user, setUser] = useState(null);
  const [firebase, setFirebase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    let userUnsubscribe;
    loadDependencies.then((app) => {
      const firebaseInstance = getFirebaseInstance(app);
      setFirebase(firebaseInstance);

      unsubscribe = firebaseInstance.auth.onAuthStateChanged((userResult) => {
        if (userResult) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('authUser', JSON.stringify(userResult));
          }

          //   firebaseInstance.getUsernameByUID(userResult.uid).then((doc) => {
          //     return firebaseInstance.checkValidConnection(doc.data().username);
          //   });

          userUnsubscribe = firebaseInstance.getUserProfile({
            userID: userResult.uid,
            onSnapshot: (r) => {
              firebaseInstance.auth.currentUser
                .getIdTokenResult(true)
                .then((token) => {
                  setUser({
                    ...userResult,
                    isAdmin: token.claims.admin,
                  });
                });
            },
          });
        } else {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authUser');
          }
          setUser(null);
        }

        setLoading(false);
      });
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }

      if (userUnsubscribe) {
        userUnsubscribe();
      }
    };
  }, []);

  return { user, firebase, loading };
}

export default useAuth;
