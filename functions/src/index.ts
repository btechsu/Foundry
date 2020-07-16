import * as admin from 'firebase-admin';

// init firebase admin
admin.initializeApp();

export {
  verifyCaptchaToken,
  userDeleted,
  indexClub,
  updateIndexClub,
  unindexClub,
} from './serverFunctions';
export { createNewAccount } from './user';
