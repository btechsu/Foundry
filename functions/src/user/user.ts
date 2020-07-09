import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { dataValidator, verifyCaptchaToken } from '../config';

export const createNewAccount = functions.https.onCall((data, context) => {
  dataValidator(data, {
    email: 'string',
    password: 'string',
    token: 'string',
  });

  return verifyCaptchaToken(data.token, context.rawRequest.ip)
    .then(() => {
      return admin
        .auth()
        .createUser({ email: data.email, password: data.password });
    })
    .catch((err) => {
      throw new functions.https.HttpsError('permission-denied', err);
    });
});
