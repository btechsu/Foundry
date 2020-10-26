import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import slugg from 'slugg';
import { CHANNEL_SLUG_DENY_LIST } from 'shared/slug-deny-lists';
import { closeModal } from 'src/actions/modals';
import { addToastWithTimeout } from 'src/actions/toasts';
import { throttle } from 'src/helpers/utils';
import { firestoreConnect } from 'react-redux-firebase';

import ModalContainer from '../modalContainer';
import { TextButton, PrimaryOutlineButton } from 'src/components/button';
import { modalStyles, UpsellDescription } from '../styles';
import {
  whiteSpaceRegex,
  oddHyphenRegex,
} from 'src/views/viewHelpers/textValidationHelper';
import { Input, UnderlineInput, Error } from '../../formElements';
import { Form, Actions } from './style';

class CreateChannelModal extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      slug: '',
      slugTaken: false,
      slugError: false,
      descriptionError: false,
      nameError: false,
      createError: false,
      loading: false,
    };

    this.checkSlug = throttle(this.checkSlug, 500);
  }

  close = () => {
    this.props.dispatch(closeModal());
  };

  changeName = (e) => {
    const name = e.target.value;
    let lowercaseName = name.toLowerCase().trim();
    let slug = slugg(lowercaseName);

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
      slug,
      nameError: false,
    });

    this.checkSlug(slug);
  };

  changeSlug = (e) => {
    let slug = e.target.value;
    let lowercaseSlug = slug.toLowerCase().trim();
    slug = slugg(lowercaseSlug);

    if (slug.length >= 24) {
      return this.setState({
        slugError: true,
      });
    }

    if (CHANNEL_SLUG_DENY_LIST.indexOf(slug) > -1) {
      return this.setState({
        slug,
        slugTaken: true,
      });
    }

    this.setState({
      slug,
      slugError: false,
    });

    this.checkSlug(slug);
  };

  checkSlug = (slug) => {
    const clubSlug = this.props.id;

    if (CHANNEL_SLUG_DENY_LIST.indexOf(slug) > -1) {
      return this.setState({
        slug,
        slugTaken: true,
      });
    } else {
      // check the db to see if this channel slug exists
      if (clubSlug.length > 0) {
        this.props.firestore
          .collection('clubs')
          .doc(clubSlug)
          .collection('channels')
          .doc(slug)
          .get()
          .then((query) => {
            if (query.exists) {
              return this.setState({
                slugTaken: true,
              });
            } else {
              return this.setState({
                slugTaken: false,
              });
            }
          })
          .catch(() => {
            // do nothing
          });
      }
    }
  };

  create = (e) => {
    e.preventDefault();
    const { name, slug, slugTaken, slugError, nameError } = this.state;
    const { id, firestore } = this.props;

    // if an error is present, ensure the client cant submit the form
    if (slugTaken || nameError || slugError) {
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
      .doc(slug)
      .set({ name: name })
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

    const {
      name,
      slug,
      slugTaken,
      slugError,
      nameError,
      createError,
      loading,
    } = this.state;

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

            <UnderlineInput defaultValue={slug} onChange={this.changeSlug}>
              {`/${id}/`}
            </UnderlineInput>

            {!loading && slugTaken && (
              <Error>
                This url is already taken - feel free to change it if you’re set
                on the name {name}!
              </Error>
            )}

            {slugError && <Error>Slugs can be up to 24 characters long.</Error>}

            <UpsellDescription>
              Channels are useful for notifying your club members on upcoming
              events or what's happening in your club.
            </UpsellDescription>

            <Actions>
              <TextButton onClick={this.close}>Cancel</TextButton>
              <PrimaryOutlineButton
                disabled={!name || !slug || slugTaken}
                loading={loading}
                onClick={this.create}
              >
                {loading ? 'Creating...' : 'Create Channel'}
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
)(CreateChannelModal);
