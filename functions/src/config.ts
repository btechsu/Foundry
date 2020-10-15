import * as functions from 'firebase-functions';

export function dataValidator(data?: any, validKeys?: any) {
  if (Object.keys(data).length !== Object.keys(validKeys).length) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Error on the server: wrong validation keys length. Please contact and administrator or refresh the page.'
    );
  } else {
    for (const key in data) {
      if (typeof data[key] !== validKeys[key]) {
        console.log('error');
      }
      if (!validKeys[key] || typeof data[key] !== validKeys[key]) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'Error on the server: wrong validation keys. Please contact and administrator or refresh the page.'
        );
      }
    }
  }
}

export function checkAuthentication(context?: any, Admin?: boolean) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User is not signed in. Cannot complete this action.'
    );
  } else if (!context.auth.token.admin && Admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'You must be an admin to use this feature.'
    );
  }
}
