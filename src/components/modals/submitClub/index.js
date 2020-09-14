// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import { closeModal } from 'src/actions/modals';
import ModalContainer from '../modalContainer';
import { modalStyles } from '../styles';

class SubmitClubModal extends React.Component {
  state = {
    reason: '',
    reasonError: false,
    isLoading: false,
  };

  close = () => {
    this.props.dispatch(closeModal());
  };

  render() {
    const { isOpen } = this.props;
    const styles = modalStyles(420);

    return (
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel={`This is a test`}
        onRequestClose={this.close}
        shouldCloseOnOverlayClick={true}
        style={styles}
        closeTimeoutMS={330}
      >
        {/*
          We pass the closeModal dispatch into the container to attach
          the action to the 'close' icon in the top right corner of all modals
        */}
        <ModalContainer title={`This is a test`} closeModal={this.close}>
          <h1>Wow, look at this really cool test! This work really well!</h1>
          <p>I am a paragraph!!! WOW!</p>
        </ModalContainer>
      </Modal>
    );
  }
}

const map = (state) => ({
  isOpen: state.modals.isOpen,
  modalProps: state.modals.modalProps,
});

export default compose(connect(map))(SubmitClubModal);
