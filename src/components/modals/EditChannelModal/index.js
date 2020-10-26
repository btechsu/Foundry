import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import slugg from 'slugg';
import { closeModal } from 'src/actions/modals';
import { addToastWithTimeout } from 'src/actions/toasts';
import { firestoreConnect } from 'react-redux-firebase';

import ModalContainer from '../modalContainer';
import { TextButton, PrimaryOutlineButton } from 'src/components/button';
import { modalStyles } from '../styles';
import {
  whiteSpaceRegex,
  oddHyphenRegex,
} from 'src/views/viewHelpers/textValidationHelper';
import { Input, UnderlineInput, Error } from '../../formElements';
import { Form, Actions } from './style';

class EditChannelModal extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      slug: '',
      descriptionError: false,
      nameError: false,
      createError: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { channel, name } = this.props;

    this.setState({ name: name, slug: channel });
  }

  close = () => {
    this.props.dispatch(closeModal());
  };

  changeName = (e) => {
    const name = e.target.value;

    let hasInvalidChars = name.search(whiteSpaceRegex) >= 0;
    let hasOddHyphens = name.search(oddHyphenRegex) >= 0;
    if (hasInvalidChars || hasOddHyphens || name.length > 20) {
      this.setState({
        nameError: true,
      });

      return;
    }

    this.setState({
      name,
      nameError: false,
    });
  };

  publish = (e) => {
    e.preventDefault();
    const { name, nameError } = this.state;
    const { id, firestore, channel } = this.props;

    // if an error is present, ensure the client cant submit the form
    if (nameError) {
      this.setState({
        createError: true,
      });

      return;
    }

    // clientside checks have passed
    this.setState({
      createError: false,
      loading: true,
    });

    firestore
      .collection('clubs')
      .doc(id)
      .collection('channels')
      .doc(channel)
      .update({ name: name })
      .then(() => {
        this.close();
        this.props.dispatch(
          addToastWithTimeout('success', 'Channel successfully created!'),
        );
        return;
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });

        this.props.dispatch(addToastWithTimeout('error', err.toString()));
      });
  };

  render() {
    const { isOpen, id } = this.props;

    const { name, slug, nameError, createError, loading } = this.state;

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
        <ModalContainer title={'Create a Channel'} closeModal={this.close}>
          <Form>
            <Input
              id="name"
              defaultValue={name}
              onChange={this.changeName}
              autoFocus={true}
            >
              Channel Name
            </Input>

            {nameError && (
              <Error>
                Channel name has to be between 1 and 20 characters long and
                can't have invalid characters.
              </Error>
            )}

            <UnderlineInput defaultValue={slug} disabled>
              {`/${id}/`}
            </UnderlineInput>

            <Actions>
              <TextButton onClick={this.close}>Cancel</TextButton>
              <PrimaryOutlineButton
                disabled={!name || nameError}
                loading={loading}
                onClick={this.publish}
              >
                {loading ? 'Updating...' : 'Update Channel'}
              </PrimaryOutlineButton>
            </Actions>

            {createError && (
              <Error>
                Please fix any errors above before creating this channel.
              </Error>
            )}
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
)(EditChannelModal);
