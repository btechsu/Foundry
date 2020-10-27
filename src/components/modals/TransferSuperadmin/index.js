import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import isEmail from 'validator/lib/isEmail';
import { isAdmin } from 'src/components/entities/profileCards/components/clubActions';
import { closeModal } from 'src/actions/modals';
import { addToastWithTimeout } from 'src/actions/toasts';
import { firestoreConnect } from 'react-redux-firebase';

import ModalContainer from '../modalContainer';
import { TextButton, PrimaryOutlineButton } from 'src/components/button';
import { modalStyles } from '../styles';
import { Input, Error } from '../../formElements';
import { Form, Actions } from './style';

class TransferSuperadmin extends React.Component {
  constructor() {
    super();

    this.state = { email: '', emailError: false, loading: false };
  }

  close = () => {
    this.props.dispatch(closeModal());
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value, emailError: false });
  };

  submit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { id, club, firestore, auth, dispatch } = this.props;

    const validEmail =
      isEmail(email, {
        domain_specific_validation: true,
        allow_ip_domain: false,
      }) && email.endsWith('@bths.edu');

    if (!validEmail) {
      this.setState({ isLoading: false });

      return dispatch(
        addToastWithTimeout('error', 'Invalid email - try again!'),
      );
    }

    // clientside checks have passed
    this.setState({ loading: true });

    firestore
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get()
      .then((userDoc) => {
        if (userDoc.docs[0].empty) {
          this.setState({ isLoading: false });
          throw new Error(`Could not find a user with the email ${email}`);
        }

        if (!isAdmin(club, userDoc.docs[0].id)) {
          this.setState({ isLoading: false });
          throw new Error(
            `The user with the email ${email} is not already an admin`,
          );
        }

        const currentUserIsAdmin = isAdmin(club, auth.uid);

        return currentUserIsAdmin
          ? firestore
              .collection('clubs')
              .doc(id)
              .update({
                superAdmin: firestore
                  .collection('clubs')
                  .doc(userDoc.docs[0].id),
              })
          : firestore
              .collection('clubs')
              .doc(id)
              .update({
                admins: firestore.FieldValue.arrayUnion(
                  firestore.collection('users').doc(auth.uid),
                ),
                superAdmin: firestore
                  .collection('clubs')
                  .doc(userDoc.docs[0].id),
              });
      })
      .then(() => {
        this.setState({ loading: false });
        this.close();
        this.props.dispatch(
          addToastWithTimeout('success', 'Transferred superadmin ownership'),
        );
        return;
      })
      .catch((err) => {
        this.setState({
          loading: false,
          emailError: err.message ? err.message : err,
        });
      });
  };

  render() {
    const { isOpen } = this.props;

    const { email, emailError, loading } = this.state;

    const styles = modalStyles(420);

    return (
      <Modal
        /* TODO(@mxstbr): Fix this */
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel={'Create a Channel'}
        onRequestClose={this.close}
        shouldCloseOnOverlayClick={true}
        style={styles}
        closeTimeoutMS={330}
      >
        {/*
          We pass the closeModal dispatch into the container to attach
          the action to the 'close' icon in the top right corner of all modals
        */}
        <ModalContainer title={'Change Superadmin'} closeModal={this.close}>
          <Form>
            <Input id="email" onChange={this.changeEmail} autoFocus={true}>
              Email of new superadmin
            </Input>

            {emailError && <Error>{emailError}</Error>}

            <Actions>
              <TextButton onClick={this.close}>Cancel</TextButton>
              <PrimaryOutlineButton
                disabled={!email || emailError}
                loading={loading}
                onClick={this.submit}
              >
                {loading ? 'Updating...' : 'Change Superadmin'}
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
)(TransferSuperadmin);
