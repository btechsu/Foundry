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

          userUnsubscribe = firebaseInstance.getUserProfile({
            userID: userResult.uid,
            onSnapshot: (r) => {
              firebaseInstance.auth.currentUser
                .getIdTokenResult(true)
                .then((token) => {
                  const clubs = [];
                  const clubData = !r.data() ? undefined : r.data().clubs;
                  if (clubData !== undefined && clubData.length !== 0) {
                    clubData.forEach((reference) => {
                      reference.club.get().then((clubDoc) => {
                        if (clubDoc.exists) {
                          const id = reference.club.id;
                          const name = clubDoc.data().name;
                          const room = clubDoc.data().room;
                          const time = clubDoc.data().time;
                          const days = clubDoc.data().days;
                          const status = reference.status;
                          clubs.push({
                            ID: id,
                            name: name,
                            room: room,
                            time: time,
                            days: days,
                            status: status,
                          });
                        }

                        setUser({
                          ...userResult,
                          isAdmin: !token.claims.admin
                            ? false
                            : token.claims.admin,
                          emailPrefs: !r.data() ? undefined : r.data().mail,
                          clubs: clubs,
                        });
                      });
                    });
                  } else {
                    setUser({
                      ...userResult,
                      isAdmin: !token.claims.admin ? false : token.claims.admin,
                      emailPrefs: !r.data() ? undefined : r.data().mail,
                      clubs: clubs,
                    });
                  }
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
