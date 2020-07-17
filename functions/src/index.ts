import * as admin from 'firebase-admin';

// init firebase admin
admin.initializeApp();

export {
  verifyCaptchaToken,
  userDeleted,
  indexClub,
  updateIndexClub,
  unindexClub,
  onUpdateClubs,
} from './serverFunctions';
export { createNewAccount, submitClub } from './user';
