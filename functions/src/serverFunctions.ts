import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { dataValidator } from './config';

export const verifyCaptchaToken = functions.https.onCall(async (data, context) => {
	dataValidator(data, {
		token: 'string'
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
			secret: functions.config().apis.captcha,
			response: data.token,
			remoteip: context.rawRequest.ip
		}
	});
	const bodyResponsee = result.data || {};
	if (!bodyResponsee.success) {
		throw new functions.https.HttpsError('permission-denied', "Couldn't verify the recaptcha value. Please try again.");
	}

	return {
		success: true,
		message: 'Successfully verified captcha on the server.'
	};
});

export const userDeleted = functions.auth.user().onDelete((user) => {
	return admin.firestore().collection('users').doc(user.uid).delete();
});
