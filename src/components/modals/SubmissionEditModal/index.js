import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import { closeModal } from 'src/actions/modals';
import ModalContainer from '../modalContainer';
import slugg from 'slugg';
import { CLUB_SLUG_DENY_LIST } from 'shared/slug-deny-lists';
import { modalStyles } from '../styles';
import { addToastWithTimeout } from 'src/actions/toasts';
import { firestoreConnect } from 'react-redux-firebase';
import {
  Input,
  UnderlineInput,
  TextArea,
  Error,
} from 'src/components/formElements';
import {
  whiteSpaceRegex,
  oddHyphenRegex,
} from 'src/views/viewHelpers/textValidationHelper';
import { StyledLabel } from 'src/components/formElements/style';
import { RequiredSelector } from 'src/views/newClub/components/submitClubForm/style';
import { WarnButton, PrimaryOutlineButton } from 'src/components/button';
import { Form, Actions } from './style';

class SubmissionEditModal extends React.Component {
  constructor(props) {
    super(props);

    const { club, id } = this.props;
    this.state = {
      name: club.name,
      slug: id,
      description: club.description,
      room: club.room,
      credits: club.credits,
      days: club.days,
      time: club.time,
      type: club.type,
      pfp: club.pfp,
      cover: club.cover,
      slugTaken: false,
      slugError: false,
      pfpError: false,
      coverError: false,
      descriptionError: false,
      creditsError: false,
      timeError: false,
      nameError: false,
      createError: false,
      isLoading: false,
    };
  }

  close = () => {
    this.props.dispatch(closeModal());
  };

  changeName = (e) => {
    const name = e.target.value;
    // replace any non alpha-num characters to prevent bad club slugs
    // (/[\W_]/g, "-") => replace non-alphanum with hyphens
    // (/-{2,}/g, '-') => replace multiple hyphens in a row with one hyphen
    let lowercaseName = name
      .toLowerCase()
      .trim()
      .replace(/[\W_]/g, '-')
      .replace(/-{2,}/g, '-');
    let slug = slugg(lowercaseName);

    let hasInvalidChars = name.search(whiteSpaceRegex) >= 0;
    let hasOddHyphens = name.search(oddHyphenRegex) >= 0;
    if (hasInvalidChars || hasOddHyphens || name.length > 20) {
      this.setState({
        nameError: true,
      });

      return;
    }

    if (CLUB_SLUG_DENY_LIST.indexOf(slug) > -1) {
      this.setState({
        name,
        slug,
        slugTaken: true,
      });
    } else {
      this.setState({
        name,
        slug,
        nameError: false,
        slugTaken: false,
      });

      this.checkSlug(slug);
    }
  };

  changeSlug = (e) => {
    let slug = e.target.value;
    // replace any non alpha-num characters to prevent bad community slugs
    // (/[\W_]/g, "-") => replace non-alphanum with hyphens
    // (/-{2,}/g, '-') => replace multiple hyphens in a row with one hyphen
    let lowercaseSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[\W_]/g, '-')
      .replace(/-{2,}/g, '-');
    slug = slugg(lowercaseSlug);

    if (slug.length >= 24) {
      this.setState({
        slug,
        slugError: true,
      });

      return;
    }

    if (CLUB_SLUG_DENY_LIST.indexOf(slug) > -1) {
      this.setState({
        slug,
        slugTaken: true,
      });
    } else {
      this.setState({
        slug,
        slugError: false,
        slugTaken: false,
      });

      this.checkSlug(slug);
    }
  };

  checkSlug = async (slug) => {
    // check the db to see if this channel slug exists
    if (slug === '') return null;
    try {
      const doc = await this.props.firestore.get({
        collection: 'clubs',
        doc: slug,
      });
      const secondDoc = await this.props.firestore.get({
        collection: 'clubSubmissions',
        doc: slug,
      });

      if (CLUB_SLUG_DENY_LIST.indexOf(this.state.slug) > -1) {
        return this.setState({ slugTaken: true });
      }

      if (doc.exists || secondDoc.exists) {
        return this.setState({ slugTaken: true });
      } else {
        return this.setState({ slugTaken: false });
      }
    } catch (err) {
      return this.props.dispatch(addToastWithTimeout('success', err.message));
    }
  };

  changeDescription = (e) => {
    const description = e.target.value;

    let hasInvalidChars = description.search(whiteSpaceRegex) >= 0;
    let hasOddHyphens = description.search(oddHyphenRegex) >= 0;
    if (hasInvalidChars || hasOddHyphens || description.length >= 140) {
      this.setState({
        descriptionError: true,
      });
      return;
    }

    this.setState({
      description,
      descriptionError: false,
    });
  };

  changePfp = (e) => {
    const url = e.target.value;

    const urlRegex = /(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg))/g;
    const isValid = urlRegex.test(url);

    if (isValid) return this.setState({ pfpError: false, pfp: url });
    else return this.setState({ pfpError: true });
  };

  changeCover = (e) => {
    const url = e.target.value;

    const urlRegex = /(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg))/g;
    const isValid = urlRegex.test(url);

    if (isValid) return this.setState({ coverError: false, cover: url });
    else return this.setState({ coverError: true });
  };

  changeTime = (e) => {
    const time = e.target.value;

    if (time.length >= 8) {
      this.setState({ timeError: true });
      return;
    }
    if (time.length === 0) {
      this.setState({ timeError: false });
      return;
    }

    const timeRegex = /(0?[1-9]|1[0-2]):?([0-5][0-9]|[AP]M)?:?([0-5][0-9]|[AP]M)?\s?([AP]M)/gi;
    const isValid = timeRegex.test(time);

    if (isValid) return this.setState({ timeError: false, time: time });
    else return this.setState({ timeError: true });
  };

  changeCredits = (e) => {
    const credits = e.target.value;

    if (credits.length === 0) {
      this.setState({ creditsError: false });
      return;
    }

    //eslint-disable-next-line
    const creditsRegex = /^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/gm;
    const isValid = creditsRegex.test(credits);

    if (isValid) this.setState({ creditsError: false, credits: credits });
    else return this.setState({ creditsError: true });
  };

  publish = (e) => {
    const { firestore, id, club } = this.props;

    firestore
      .collection('clubs')
      .doc(this.state.slug)
      .set({
        name: this.state.name || '',
        pfp: this.state.pfp || '',
        cover: this.state.cover || '',
        description: this.state.description || '',
        credits: this.state.credits || '',
        days: this.state.days || '',
        time: this.state.time || '',
        room: this.state.room || '',
        president: club.president || '',
        admins: firestore.FieldValue.arrayUnion(
          firestore.collection('users').doc(club.superAdmin.id),
        ),
        superAdmin: club.superAdmin,
        text: club.text || '',
        type: club.type || '',
      })
      .then(() => {
        return firestore
          .collection('users')
          .doc(club.superAdmin.id)
          .update({
            approved: firestore.FieldValue.arrayUnion(
              firestore.collection('clubs').doc(this.state.slug),
            ),
          });
      })
      .then(() => {
        return firestore.collection('clubSubmissions').doc(id).delete();
      })
      .then(() => {
        this.close();
        this.props.dispatch(addToastWithTimeout('success', 'Added club!'));
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

  denyClub = () => {
    const { firestore, id } = this.props;

    firestore
      .collection('clubSubmissions')
      .doc(id)
      .delete()
      .then(() => {
        this.close();
        this.props.dispatch(addToastWithTimeout('success', 'Club removed!'));
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
    const {
      name,
      slug,
      slugError,
      slugTaken,
      description,
      room,
      time,
      days,
      credits,
      pfp,
      cover,
      type,
      pfpError,
      coverError,
      timeError,
      creditsError,
      nameError,
      descriptionError,
      isLoading,
    } = this.state;

    const { club, id, isOpen } = this.props;

    const styles = modalStyles(420);

    return (
      <Modal
        /* TODO(@mxstbr): Fix this */
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel={'Approve club'}
        onRequestClose={this.close}
        shouldCloseOnOverlayClick={true}
        style={styles}
        closeTimeoutMS={330}
      >
        {/*
          We pass the closeModal dispatch into the container to attach
          the action to the 'close' icon in the top right corner of all modals
        */}
        <ModalContainer title={'Approve club'} closeModal={this.close}>
          <Form>
            <Input
              dataCy="club-settings-pfp-input"
              defaultValue={pfp}
              onChange={this.changePfp}
            >
              Club picture
            </Input>

            {pfpError && <Error>Invalid club picture URL</Error>}

            <Input
              dataCy="club-settings-cover-input"
              defaultValue={cover}
              onChange={this.changeCover}
            >
              Cover picture
            </Input>

            {coverError && <Error>Invalid cover picture URL</Error>}

            <Input
              dataCy="club-settings-name-input"
              defaultValue={name}
              onChange={this.changeName}
            >
              Name
            </Input>

            {nameError && (
              <Error>Club names can be up to 20 characters long.</Error>
            )}

            <UnderlineInput
              defaultValue={slug}
              onChange={this.changeSlug}
              dataCy="club-slug-input"
            >
              bths.live/
            </UnderlineInput>

            {slugTaken && (
              <Error>
                This url is already taken - feel free to change it if you’re set
                on the name {name}!
              </Error>
            )}

            {slugError && <Error>Slugs can be up to 24 characters long.</Error>}

            <TextArea
              defaultValue={description}
              onChange={this.changeDescription}
              dataCy="community-settings-description-input"
            >
              Description
            </TextArea>

            {descriptionError && (
              <Error>
                Oops, there may be some invalid characters or the text is too
                big (max: 140 characters) - try trimming that up.
              </Error>
            )}

            <Input
              dataCy="club-settings-days-input"
              defaultValue={days}
              onChange={(e) => this.setState({ days: e.target.value })}
            >
              Days
            </Input>

            <Input
              dataCy="club-settings-room-input"
              defaultValue={room}
              onChange={(e) => this.setState({ room: e.target.value })}
            >
              Room
            </Input>

            <Input
              dataCy="club-settings-time-input"
              defaultValue={time}
              onChange={this.changeTime}
            >
              Time
            </Input>

            {timeError && <Error>Invalid time</Error>}

            <Input
              dataCy="club-settings-credits-input"
              defaultValue={credits}
              onChange={this.changeCredits}
            >
              Credits
            </Input>

            {creditsError && <Error>Invalid credits</Error>}

            <StyledLabel>
              Club Type
              <RequiredSelector
                defaultValue={type}
                onChange={(e) => this.setState({ type: e.currentTarget.value })}
              >
                <option value={''}>Choose club type</option>
                <option value={'social'}>Social</option>
                <option value={'volunteering'}>Volunteering</option>
                <option value={'stem'}>STEM</option>
                <option value={'academic'}>Academic</option>
                <option value={'publications'}>Publications</option>
                <option value={'sports'}>Sports</option>
              </RequiredSelector>
            </StyledLabel>

            <Actions>
              <WarnButton
                loading={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  this.denyClub();
                }}
                disabled={
                  nameError ||
                  descriptionError ||
                  timeError ||
                  creditsError ||
                  slugError ||
                  isLoading
                }
              >
                {isLoading ? 'Loading...' : 'Deny'}
              </WarnButton>
              <PrimaryOutlineButton
                loading={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  this.publish();
                }}
                disabled={
                  nameError ||
                  descriptionError ||
                  timeError ||
                  creditsError ||
                  slugError ||
                  isLoading
                }
              >
                {isLoading ? 'Loading...' : 'Approve'}
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
  modalProps: state.modals.modalProps,
});

export default compose(firestoreConnect(), connect(map))(SubmissionEditModal);
