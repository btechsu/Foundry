// @flow
import React from 'react';
import { connect } from 'react-redux';

import SubmitClubModal from './submitClub';
import LoginModal from './LoginModal';
import DeleteDoubleCheckModal from './DeleteDoubleCheckModal';

const MODAL_COMPONENTS = {
  SUBMIT_CLUB_MODAL: SubmitClubModal,
  LOGIN_MODAL: LoginModal,
  DELETE_DOUBLE_CHECK_MODAL: DeleteDoubleCheckModal,
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
