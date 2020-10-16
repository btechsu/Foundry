import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { closeModal } from 'src/actions/modals';
import { addToastWithTimeout } from 'src/actions/toasts';
import { firebaseConnect } from 'react-redux-firebase';

import ModalContainer from '../modalContainer';
import { TextButton, WarnButton } from 'src/components/button';
import { modalStyles } from '../styles';
import { Actions, Message } from './style';

class DeleteDoubleCheckModal extends React.Component {
  state = {
    isLoading: false,
  };

  close = () => {
    this.props.dispatch(closeModal());
  };

  triggerDelete = () => {
    const {
      history,
      modalProps: { id, entity, redirect, extraProps },
      dispatch,
    } = this.props;

    this.setState({
      isLoading: true,
    });

    switch (entity) {
      case 'team-member-leaving-club': {
        const acceptedClubs = this.props.profile.clubs.approved;

        return this.props.firebase
          .updateProfile({
            clubs: {
              approved: acceptedClubs.filter(
                (club) => club.id !== this.props.id,
              ),
            },
          })
          .then(() => {
            dispatch(addToastWithTimeout('neutral', 'Left community'));
            this.setState({
              isLoading: false,
            });
            return this.close();
          })
          .catch((err) => {
            dispatch(addToastWithTimeout('error', err.message || err));
            this.setState({
              isLoading: false,
            });
          });
      }
      default: {
        this.setState({
          isLoading: false,
        });

        return dispatch(
          addToastWithTimeout(
            'error',
            'Unable to figure out what you wanted to delete. Whoops!',
          ),
        );
      }
    }
  };

  render() {
    const {
      isOpen,
      modalProps: { message, buttonLabel },
    } = this.props;
    const styles = modalStyles();

    return (
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel={'Are you sure?'}
        onRequestClose={this.close}
        shouldCloseOnOverlayClick={true}
        style={styles}
        closeTimeoutMS={330}
      >
        {/*
          We pass the closeModal dispatch into the container to attach
          the action to the 'close' icon in the top right corner of all modals
        */}
        <ModalContainer title={'Are you sure?'} closeModal={this.close}>
          <Message>{message ? message : 'Are you sure?'}</Message>

          <Actions>
            <TextButton onClick={this.close}>Cancel</TextButton>
            <WarnButton
              loading={this.state.isLoading}
              onClick={this.triggerDelete}
              data-cy={'delete-button'}
            >
              {buttonLabel || 'Delete'}
            </WarnButton>
          </Actions>
        </ModalContainer>
      </Modal>
    );
  }
}

const DeleteDoubleCheckModalWithMutations = compose(
  withRouter,
  firebaseConnect(),
  connect(({ firebase: { profile } }) => ({
    profile,
  })),
)(DeleteDoubleCheckModal);

const map = (state) => ({
  isOpen: state.modals.isOpen,
  modalProps: state.modals.modalProps,
});

export default connect(map)(DeleteDoubleCheckModalWithMutations);
