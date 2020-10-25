import * as React from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Icon from 'src/components/icon';
import { openModal, closeModal } from 'src/actions/modals';
import getThreadLink from 'src/helpers/get-thread-link';
import { addToastWithTimeout } from 'src/actions/toasts';
import { setTitlebarProps } from 'src/actions/titlebar';
import Head from 'src/components/head';
import { firestoreConnect } from 'react-redux-firebase';
import { TextButton } from 'src/components/button';
import { PrimaryButton } from 'src/components/button';
import Tooltip from 'src/components/tooltip';
import {
  Overlay,
  Container,
  Actions,
  DisabledWarning,
  InputHints,
  DesktopLink,
  ButtonRow,
  Wrapper,
} from './style';
import { ESC, ENTER } from 'src/helpers/keycodes';
import Inputs from './inputs';
import ComposerLocationSelectors from './LocationSelectors';

export const DISCARD_DRAFT_MESSAGE =
  'Are you sure you want to discard this draft?';

// We persist the body and title to localStorage
// so in case the app crashes users don't loose content
class ComposerWithData extends React.Component {
  bodyEditor;

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      isLoading: false,
      postWasPublished: false,
      preview: false,
      selectedChannelId: '',
      selectedClubId: '',
    };
  }

  componentWillMount() {
    this.setState({
      title: this.state.title || '',
      body: this.state.body || '',
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(
      setTitlebarProps({
        title: 'New post',
      }),
    );

    // $FlowIssue
    document.addEventListener('keydown', this.handleGlobalKeyPress, false);
  }

  componentWillUnmount() {
    // $FlowIssue
    document.removeEventListener('keydown', this.handleGlobalKeyPress, false);
    const { postWasPublished } = this.state;

    // if a post was published, in this session, clear redux so that the next
    // composer open will start fresh
    if (postWasPublished) return;

    // otherwise, clear the composer normally and save the state
    return;
  }

  handleGlobalKeyPress = (e) => {
    const esc = e && e.keyCode === ESC;
    const enter = e.keyCode === ENTER;
    const cmdEnter = e.keyCode === ENTER && e.metaKey;

    // we need to verify the source of the keypress event
    // so that if it comes from the discard draft modal, it should not
    // listen to the events for composer
    const innerText = e.target.innerText;
    const modalIsOpen = innerText.indexOf(DISCARD_DRAFT_MESSAGE) >= 0;

    if (esc && modalIsOpen) {
      e.stopPropagation();
      this.props.dispatch(closeModal());
      return;
    }

    if (enter && modalIsOpen) {
      e.stopPropagation();
      this.discardDraft();
      return;
    }

    const composerHasContent = this.composerHasContent();

    if (esc && composerHasContent) {
      this.discardDraft();
      return;
    }

    if (esc && !composerHasContent) {
      return this.closeComposer();
    }

    if (cmdEnter && !modalIsOpen) return this.publishThread();
  };

  composerHasContent = () => {
    const { title, body } = this.state;
    return title !== '' || body !== '';
  };

  changeTitle = (e) => {
    const title = e.target.value;
    if (/\n$/g.test(title)) {
      this.bodyEditor.focus && this.bodyEditor.focus();
      return;
    }
    this.setState({
      title,
    });
  };

  changeBody = (evt) => {
    const body = evt.target.value;
    this.setState({
      body,
    });
  };

  closeComposer = (clear) => {
    // we will clear the composer if it unmounts as a result of a post
    // being published or draft discarded, that way the next composer open will start fresh
    if (clear) {
      this.setState({
        title: '',
        body: '',
        preview: false,
      });
    }

    if (this.props.previousLocation)
      return this.props.history.push({
        ...this.props.previousLocation,
        state: { modal: false },
      });

    return this.props.history.goBack({ state: { modal: false } });
  };

  discardDraft = () => {
    const composerHasContent = this.composerHasContent();

    if (!composerHasContent) {
      return this.closeComposer();
    }

    this.props.dispatch(
      openModal('CLOSE_COMPOSER_CONFIRMATION_MODAL', {
        message: DISCARD_DRAFT_MESSAGE,
        closeComposer: () => this.closeComposer('clear'),
      }),
    );
  };

  onCancelClick = () => {
    this.discardDraft();
  };

  publishThread = () => {
    // if no title and no channel is set, don't allow a thread to be published
    if (
      !this.state.title ||
      !this.state.selectedClubId ||
      !this.state.selectedChannelId
    ) {
      return;
    }

    // isLoading will change the publish button to a loading spinner
    this.setState({
      isLoading: true,
    });

    // define new constants in order to construct the proper shape of the
    // input for the publishThread mutation
    const { selectedChannelId, selectedClubId, title, body } = this.state;
    const channelId = selectedChannelId;
    const clubId = selectedClubId;

    const thread = {
      title: title,
      body: body,
      posted: this.props.firestore.Timestamp.fromDate(new Date()),
      authored: this.props.firestore
        .collection('users')
        .doc(this.props.auth.uid),
    };

    this.props.firestore
      .collection('clubs')
      .doc(clubId)
      .collection('channels')
      .doc(channelId)
      .collection('posts')
      .add(thread)
      .then(() => {
        // stop the loading spinner on the publish button
        this.setState({
          isLoading: false,
          postWasPublished: true,
          title: '',
          body: '',
        });

        this.props.dispatch(
          addToastWithTimeout('success', 'Thread published!'),
        );
        if (this.props.location.pathname === '/new/thread') {
          this.props.history.replace(`/${clubId}/${channelId}?tab=posts`);
        } else {
          this.props.history.push(`/${clubId}/${channelId}?tab=posts`);
        }
        return;
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
        });
        this.props.dispatch(addToastWithTimeout('error', err.message));
      });
  };

  setSelectedClub = (id) => {
    return this.setState({ selectedClubId: id });
  };

  setSelectedChannel = (id) => {
    return this.setState({ selectedChannelId: id });
  };

  render() {
    const { title, isLoading, selectedChannelId, selectedClubId } = this.state;

    const { isEditing, isModal } = this.props;

    return (
      <Wrapper data-cy="thread-composer-wrapper">
        <Head title={'New post'} description={'Write a new post'} />
        <Overlay
          isModal={isModal}
          onClick={this.discardDraft}
          data-cy="overlay"
        />

        <Container data-cy="modal-container" isModal={isModal}>
          <ComposerLocationSelectors
            selectedChannelId={selectedChannelId}
            selectedClubId={selectedClubId}
            onClubSelectionChanged={this.setSelectedClub}
            onChannelSelectionChanged={this.setSelectedChannel}
          />

          <Inputs
            title={this.state.title}
            body={this.state.body}
            changeBody={this.changeBody}
            changeTitle={this.changeTitle}
            autoFocus={true}
            bodyRef={(ref) => (this.bodyEditor = ref)}
            onKeyDown={this.handleGlobalKeyPress}
            isEditing={isEditing}
          />
          <Actions>
            <InputHints>
              <Tooltip content={'Style with Markdown'}>
                <DesktopLink
                  target="_blank"
                  href="https://guides.github.com/features/mastering-markdown/"
                >
                  <Icon glyph="markdown" />
                </DesktopLink>
              </Tooltip>
            </InputHints>
            <ButtonRow>
              <TextButton
                data-cy="composer-cancel-button"
                hoverColor="warn.alt"
                onClick={this.discardDraft}
              >
                Cancel
              </TextButton>
              <PrimaryButton
                data-cy="composer-publish-button"
                onClick={this.publishThread}
                loading={isLoading}
                disabled={
                  !title ||
                  title.trim().length === 0 ||
                  isLoading ||
                  !selectedChannelId ||
                  !selectedClubId
                }
              >
                {isLoading ? 'Publishing...' : 'Publish'}
              </PrimaryButton>
            </ButtonRow>
          </Actions>
        </Container>
      </Wrapper>
    );
  }
}

export default compose(
  withRouter,
  firestoreConnect(),
  connect(({ firebase: { profile, auth } }) => ({ profile, auth })),
)(ComposerWithData);
