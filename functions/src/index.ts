import * as admin from 'firebase-admin';

admin.initializeApp();

export { verifyCaptchaToken, userDeleted } from './serverFunctions';
export { createNewAccount } from './user';
