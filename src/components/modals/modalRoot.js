import React from 'react';
import { connect } from 'react-redux';

import SubmitClubModal from './submitClub';
import LoginModal from './LoginModal';
import DeleteDoubleCheckModal from './DeleteDoubleCheckModal';
import EditClubModal from './EditClubModal';
import CloseComposerConfirmationModal from './CloseComposerConfirmationModal';
import CreateChannelModal from './CreateChannelModal';
import EditChannelModal from './EditChannelModal';
import TransferSuperadmin from './TransferSuperadmin';
import StudentIDModal from './StudentIDModal';
import SubmissionEditModal from './SubmissionEditModal';

const MODAL_COMPONENTS = {
  SUBMIT_CLUB_MODAL: SubmitClubModal,
  LOGIN_MODAL: LoginModal,
  DELETE_DOUBLE_CHECK_MODAL: DeleteDoubleCheckModal,
  EDIT_CLUB_MODAL: EditClubModal,
  CLOSE_COMPOSER_CONFIRMATION_MODAL: CloseComposerConfirmationModal,
  CREATE_CHANNEL_MODAL: CreateChannelModal,
  EDIT_CHANNEL_MODAL: EditChannelModal,
  TRANSFER_SUPERADMIN: TransferSuperadmin,
  STUDENT_ID_MODAL: StudentIDModal,
  SUBMISSION_EDIT_MODAL: SubmissionEditModal,
};

/*
  Takes a modalType and modalProps to dynamically return the
  modal component we imported above
*/
const modalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
};

const mapStateToProps = (state) => ({
  modalProps: state.modals.modalProps,
  modalType: state.modals.modalType,
});

// $FlowIssue
export default connect(mapStateToProps)(modalRoot);
