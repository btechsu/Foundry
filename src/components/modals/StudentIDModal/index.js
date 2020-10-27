import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { closeModal } from 'src/actions/modals';
import { addToastWithTimeout } from 'src/actions/toasts';
import { firestoreConnect } from 'react-redux-firebase';

import ModalContainer from '../modalContainer';
import { TextButton, PrimaryOutlineButton } from 'src/components/button';
import { modalStyles } from '../styles';
import { Input, Error } from '../../formElements';
import { Form, Actions } from './style';

class StudentIDModal extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
      idError: false,
      loading: false,
    };
  }

  close = () => {
    this.props.dispatch(closeModal());
  };

  changeID = (e) => {
    const id = e.target.value;

    const regex = /[^a-z ]\ *([.0-9])*\d/g;

    if (id.length > 2) {
      if (!regex.test(id)) {
        this.setState({ idError: true });
        return;
      }
    }
    if (id.length > 9) {
      this.setState({ idError: true });
      return;
    }
    if (id.length === 0) {
      this.setState({ idError: false });
      return;
    }

    return this.setState({ id: Number(id), idError: false });
  };

  submit = (e) => {
    e.preventDefault();
    const { id } = this.state;
    const { firestore, auth } = this.props;

    // clientside checks have passed
    this.setState({ loading: true });

    firestore
      .collection('users')
      .doc(auth.uid)
      .update({ studentId: id })
      .then(() => {
        this.close();
        this.props.dispatch(
          addToastWithTimeout(
            'success',
            'Updated student ID! You may now apply for this club.',
          ),
        );
        return;
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });

        this.props.dispatch(
          addToastWithTimeout('error', err.message ? err.message : err),
        );
      });
  };

  render() {
    const { isOpen } = this.props;

    const { id, idError, loading } = this.state;

    const styles = modalStyles(420);

    return (
      <Modal
        /* TODO(@mxstbr): Fix this */
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel={'Set a student ID'}
        onRequestClose={this.close}
        shouldCloseOnOverlayClick={true}
        style={styles}
        closeTimeoutMS={330}
      >
        {/*
          We pass the closeModal dispatch into the container to attach
          the action to the 'close' icon in the top right corner of all modals
        */}
        <ModalContainer title={'Set a student ID'} closeModal={this.close}>
          <Form>
            <Input
              id="id"
              defaultValue={id}
              onChange={this.changeID}
              autoFocus={true}
            >
              Student ID
            </Input>

            {idError && (
              <Error>
                Invalid student ID. Student ID's must be 9 digits long
              </Error>
            )}

            <Actions>
              <TextButton onClick={this.close}>Cancel</TextButton>
              <PrimaryOutlineButton
                disabled={!id || idError}
                loading={loading}
                onClick={this.submit}
              >
                {loading ? 'Updating...' : 'Set student ID'}
              </PrimaryOutlineButton>
            </Actions>
          </Form>
        </ModalContainer>
      </Modal>
    );
  }
}

const map = (state) => ({
  isOpen: state.modals.isOpen,
});
export default compose(
  firestoreConnect(),
  connect(map),
  withRouter,
)(StudentIDModal);
