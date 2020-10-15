import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { dataValidator, checkAuthentication } from './config';

export const createNewAccount = functions.https.onCall(async (data) => {
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
    clubs: [],
  };
  const customClaims = {
    admin: true,
  };

  try {
    const newUserAccount = await admin
      .auth()
      .createUser({ email: data.email, password: data.password });
    await admin
      .firestore()
      .collection('users')
      .doc(newUserAccount.uid)
      .set(docData);

    if (
      newUserAccount.email === 'korlov9026@bths.edu' ||
      newUserAccount.email === 'mbilik0726@bths.edu'
    ) {
      await admin.auth().setCustomUserClaims(newUserAccount.uid, customClaims);
    }

    return {
      success: true,
      message: 'Created a new user account',
    };
  } catch (err) {
    throw new functions.https.HttpsError('unknown', err);
  }
});
export const submitClub = functions.https.onCall((data, context) => {
  checkAuthentication(context);
  dataValidator(data, {
    name: 'string',
    email: 'string',
    description: 'string',
    room: 'string',
    days: 'string',
    time: 'string',
    type: 'string',
    credits: 'string',
    text: 'object',
  });

  return admin
    .firestore()
    .collection('clubSubmissions')
    .add({
      name: data.name,
      president: data.email,
      description: data.description,
      room: data.room,
      days: data.days,
      time: data.time,
      type: data.type,
      credits: data.credits,
      text: JSON.stringify(data.text),
    });
});
export const deleteUser = functions.https.onCall((data, context) => {
  checkAuthentication(context, true);
  dataValidator(data, {
    uid: 'string',
  });

  return admin.auth().deleteUser(data.uid);
});
export const addClub = functions.https.onCall((data, context) => {
  checkAuthentication(context, true);
  dataValidator(data, {
    accept: 'boolean',
    id: 'string',
    name: 'string',
    email: 'string',
    description: 'string',
    room: 'string',
    days: 'string',
    time: 'string',
    type: 'string',
    credits: 'string',
    text: 'object',
  });

  if (data.accept === true) {
    const batch = admin.firestore().batch();
    const oldRef = admin.firestore().collection('clubSubmissions').doc(data.id);
    const newRef = admin.firestore().collection('clubs').doc(data.id);

    batch.delete(oldRef);
    batch.set(newRef, {
      name: data.name,
      president: data.email,
      description: data.description,
      room: data.room,
      days: data.days,
      time: data.time,
      type: data.type,
      credits: data.credits,
      text: JSON.stringify(data.text),
    });

    return batch.commit();
  } else {
    return admin
      .firestore()
      .collection('clubSubmissions')
      .doc(data.id)
      .delete();
  }
});
