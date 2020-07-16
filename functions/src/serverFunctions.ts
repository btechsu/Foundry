import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import algoliasearch from 'algoliasearch';
import { dataValidator } from './config';

const env = functions.config();

// init algoliasearch
const client = algoliasearch(env.apis.algolia.appid, env.apis.algolia.api);
const index = client.initIndex('clubs');

export const verifyCaptchaToken = functions.https.onCall(
  async (data, context) => {
    dataValidator(data, {
      token: 'string',
    });

    if (data.token === undefined || data.token === null || data.token === '') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Incorrect token or type passed. Please contact an administrator or try again.'
      );
    }

    const result = await axios({
      method: 'post',
      url: 'https://google.com/recaptcha/api/siteverify',
      params: {
        secret: env.apis.captcha,
        response: data.token,
        remoteip: context.rawRequest.ip,
      },
    });
    const bodyResponsee = result.data || {};
    if (!bodyResponsee.success) {
      throw new functions.https.HttpsError(
        'permission-denied',
        "Couldn't verify the recaptcha value. Please try again."
      );
    }

    return {
      success: true,
      message: 'Successfully verified captcha on the server.',
    };
  }
);
export const userDeleted = functions.auth.user().onDelete((user) => {
  return admin.firestore().collection('users').doc(user.uid).delete();
});
export const indexClub = functions.firestore
  .document('clubs/{clubID}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;

    // Add the data to the algolia index
    return index.saveObject({
      objectID,
      ...data,
    });
  });
export const updateIndexClub = functions.firestore
  .document('clubs/{clubID}')
  .onUpdate((snap, context) => {
    const data = snap.after.data();
    const objectID = snap.after.id;

    // Add the data to the algolia index
    return index.saveObject({
      objectID,
      ...data,
    });
  });
export const unindexClub = functions.firestore
  .document('clubs/{clubID}')
  .onDelete((snap, context) => {
    const objectID = snap.id;

    // Delete an ID from the index
    return index.deleteObject(objectID);
  });
