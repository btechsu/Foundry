import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import { closeModal } from 'src/actions/modals';
import ModalContainer from '../modalContainer';
import { modalStyles } from '../styles';
import { firebaseConnect } from 'react-redux-firebase';
import { Container } from './style';

class EditClubModal extends React.Component {
  close = () => {
    this.props.dispatch(closeModal());
  };

  render() {
    const { isOpen } = this.props;

    const styles = modalStyles(480);

    return (
      <Modal
        /* TODO(@mxstbr): Fix this */
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel={'Edit club'}
        onRequestClose={this.close}
        shouldCloseOnOverlayClick={true}
        style={styles}
        closeTimeoutMS={330}
      >
        {/*
          We pass the closeModal dispatch into the container to attach
          the action to the 'close' icon in the top right corner of all modals
        */}
        <ModalContainer title={'Edit club'} closeModal={this.close}>
          <Container data-cy="login-modal"></Container>
        </ModalContainer>
      </Modal>
    );
  }
}

const map = (state) => ({
  isOpen: state.modals.isOpen,
  modalProps: state.modals.modalProps,
});

// $FlowIssue
export default compose(firebaseConnect(), connect(map))(EditClubModal);
