import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { dataValidator } from './config';

export const createNewAccount = functions.https.onCall((data, context) => {
  dataValidator(data, {
    email: 'string',
    password: 'string',
    year: 'string',
  });

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var dateCreated = mm + '/' + dd + '/' + yyyy;

  const docData = {
    year: data.year,
    email: data.email,
    joined: dateCreated,
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
