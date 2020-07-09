import * as functions from 'firebase-functions';
import * as rp from 'request-promise';

export function dataValidator(data?: any, validKeys?: any) {
  if (Object.keys(data).length !== Object.keys(validKeys).length) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Error in the server. Data object contains invalid number of properties. Please contact and administrator.'
    );
  } else {
    for (const key in data) {
      if (!validKeys[key] || typeof data[key] !== validKeys[key]) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'Error in the server. Data object contains invalid properties. Please contact and administrator.'
        );
      }
    }
  }
}

export function checkAuthentication(context?: any, Admin?: any) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User is not signed in. Cannot complete this action.'
    );
  } else if (!context.auth.token.Admin && Admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'You must be an admin to use this feature.'
    );
  }
}

export async function verifyCaptchaToken(token?: string, ip?: string) {
  const url = `https://google.com/recaptcha/api/siteverify?secret=${
    functions.config().apis.captcha.invis
  }&response=${token}&remoteip=${ip}`;

  const body = await rp.post(url);
  const JSONBody = JSON.parse(body);
  if (JSONBody.success !== undefined && !JSONBody.success) {
    throw new Error(
      "Couldn't verify the recaptcha value. Try refreshing the page."
    );
  }

  return {
    success: true,
    message: 'Successfully verified captcha on the server.',
  };
}
