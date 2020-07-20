import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { dataValidator, checkAuthentication } from './config';
import { array, func } from 'prop-types';
import { user } from 'firebase-functions/lib/providers/auth';

export const createNewAccount = functions.https.onCall((data, context) => {
  dataValidator(data, {
    email: 'string',
    password: 'string',
    year: 'string',
  });

  const docData = {
    year: data.year,
    email: data.email,
    joined: admin.firestore.FieldValue.serverTimestamp(),
    mail: ['clubs', 'grade', 'news', 'updates'],
    clubs: [
      {
        club: undefined,
        status: undefined,
      },
    ],
  };

  return admin
    .auth()
    .createUser({ email: data.email, password: data.password })
    .then((newUser) => {
      return admin
        .firestore()
        .collection('users')
        .doc(newUser.uid)
        .set(docData);
    })
    .then(() => {
      return {
        success: true,
        message: 'Created a new user account',
      };
    })
    .catch((err) => {
      throw new functions.https.HttpsError('unknown', err);
    });
});
export const submitClub = functions.https.onCall((data, context) => {
  dataValidator(data, {
    email: 'string',
    description: 'string',
    room: 'string',
    days: 'string',
    time: 'string',
    type: 'string',
    credits: 'string',
    text: 'object',
  });
  checkAuthentication(context);

  return admin
    .firestore()
    .collection('clubSubmissions')
    .add({
      email: data.email,
      description: data.description,
      room: data.room,
      days: data.days,
      time: data.time,
      type: data.type,
      credits: data.credits,
      text: JSON.stringify(data.text),
    });
});
export const getDashboard = functions.https.onCall(async (data, context) => {
  checkAuthentication(context);
  const uid = context.auth?.uid || '';

  const retrievedClubData: { club: any; clubID: any; status: any }[] = [];
  const userDoc = await admin.firestore().collection('users').doc(uid).get();
  const clubData: Array<any> = userDoc.data()?.clubs;
  if (!userDoc.exists) {
    throw new functions.https.HttpsError(
      'not-found',
      "The user that made this request doesn't exist. Try relogging or contact an admin."
    );
  }

  if (clubData.length !== 0) {
    clubData.forEach(async (reference) => {
      try {
        const clubDoc = await reference.club.get();
        const clubID = reference.club.id;
        const clubName = clubDoc.data().name;
        const clubStatus = reference.status;
        retrievedClubData.push({
          club: clubName,
          clubID: clubID,
          status: clubStatus,
        });
      } catch (err) {
        throw new functions.https.HttpsError(
          'unknown',
          err.message || 'Unkown error. Try refreshing the page.'
        );
      }
    });
  }

  return {
    clubs: retrievedClubData,
  };
});
