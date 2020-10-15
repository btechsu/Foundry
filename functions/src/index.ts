import * as admin from 'firebase-admin';

// init firebase admin
admin.initializeApp();

export {
  verifyCaptchaToken,
  userDeleted,
  onUpdateClubs,
  onUpdateUsers,
  onUpdateClubSubmissions,
} from './serverFunctions';
export { createNewAccount, submitClub, deleteUser, addClub } from './user';
