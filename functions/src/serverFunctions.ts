import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import algoliasearch from 'algoliasearch';
import { dataValidator } from './config';

const env = functions.config();

// init algoliasearch
const client = algoliasearch(env.apis.algolia.appid, env.apis.algolia.api);
const clubIndex = client.initIndex('clubs');
const userIndex = client.initIndex('users');
const clubSubmissionsIndex = client.initIndex('clubSubmissions');

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
export const onUpdateClubs = functions.firestore
  .document('clubs/{clubID}')
  .onWrite((change, context) => {
    if (change.after.data() === undefined) {
      const objectID = change.before.id;
      // Delete an ID from the index
      return clubIndex.deleteObject(objectID);
    } else {
      const objectID = change.after.id;
      const data = change.after.data();
      // Index new data to algolia
      return clubIndex.saveObject({
        objectID,
        ...data,
      });
    }
  });
export const onUpdateUsers = functions.firestore
  .document('/users/{userID}')
  .onWrite((change, context) => {
    if (change.after.data() === undefined) {
      const objectID = change.before.id;
      // Delete an ID from the index
      return userIndex.deleteObject(objectID);
    } else {
      const objectID = change.after.id;
      const data = change.after.data();
      // Index new data to algolia
      return userIndex.saveObject({
        objectID,
        email: data?.email || undefined,
        joined: data?.joined.toDate() || undefined,
        year: data?.year || undefined,
      });
    }
  });
export const onUpdateClubSubmissions = functions.firestore
  .document('/clubSubmissions/{clubID}')
  .onWrite((change, context) => {
    if (change.after.data() === undefined) {
      const objectID = change.before.id;
      // Delete an ID from the index
      return clubSubmissionsIndex.deleteObject(objectID);
    } else {
      const objectID = change.after.id;
      const data = change.after.data();
      // Index new data to algolia
      return clubSubmissionsIndex.saveObject({
        objectID,
        ...data,
      });
    }
  });
