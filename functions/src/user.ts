import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { dataValidator, checkAuthentication } from './config';

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
    text: 'object',
  });
  checkAuthentication(context);

  return admin.firestore().collection('clubSubmissions').add({
    email: data.email,
    description: data.description,
    room: data.room,
    days: data.days,
    time: data.time,
    type: data.type,
    text: data.text,
  });
});
