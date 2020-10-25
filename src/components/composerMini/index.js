import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import compose from 'recompose/compose';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserAvatar } from 'src/components/avatar';
import theme from 'shared/theme';
import Textarea from 'react-textarea-autosize';
import { firestoreConnect } from 'react-redux-firebase';
import { PrimaryButton, TextButton } from 'src/components/button';
import ChannelSelector from 'src/components/composer/LocationSelectors/ChannelSelector';
import Icon from 'src/components/icon';
import getComposerLink from 'src/helpers/get-composer-link';
import { addToastWithTimeout } from 'src/actions/toasts';
import Tooltip from 'src/components/tooltip';
import { Container, BodyContainer } from './style';

const MiniComposer = ({
  club,
  id,
  profile,
  firestore,
  dispatch,
  fixedChannelId,
  channel,
  auth,
}) => {
  const titleEditor = useRef();
  const bodyEditor = useRef();
  const [selectedChannelId, setSelectedChannelId] = useState(channel.id);
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const bodyRef = useRef(body);
  const [titleWarning, setTitleWarning] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const titleWarningText =
    'Tip: good titles are shorter than 80 characters. Add more details below.';
  useEffect(() => {
    if (title.length >= 80 && !titleWarning) {
      setTitleWarning(titleWarningText);
    } else if (title.length < 80 && titleWarning) {
      setTitleWarning(null);
    }
  }, []);

  useEffect(() => {
    bodyRef.current = body;
  }, [body]);

  useLayoutEffect(() => {
    if (expanded && titleEditor.current) titleEditor.current.focus();
  }, [expanded]);

  const changeTitle = (evt) => {
    const title = evt.target.value;
    if (title.length >= 80 && !titleWarning) {
      setTitleWarning(titleWarningText);
    } else if (title.length < 80 && titleWarning) {
      setTitleWarning(null);
    }
    setTitle(title);
  };

  const changeBody = (evt) => {
    const body = evt.target.value;
    setBody(body);
  };

  const handleCancel = () => {
    const composerHasContent = body || title;

    if (!composerHasContent) {
      return setExpanded(false);
    }
  };

  const publish = () => {
    if (!selectedChannelId || !channel.id || !auth.isLoaded) {
      return;
    }

    setIsLoading(true);

    const thread = {
      title: title,
      body: body,
      posted: firestore.Timestamp.fromDate(new Date()),
      authored: firestore.collection('users').doc(auth.uid),
    };

    firestore
      .collection('clubs')
      .doc(club.id || id)
      .collection('channels')
      .doc(channel.id || selectedChannelId)
      .collection('posts')
      .add(thread)
      .then(async (data) => {
        setIsLoading(false);
        dispatch(addToastWithTimeout('success', 'Post published!'));
        await setBody('');
        await setTitle('');
        await setExpanded(false);
        return;
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(addToastWithTimeout('error', err.message));
      });
  };

  const { pathname, search } = getComposerLink({
    clubId: club.id || id,
    channelId: channel.id || selectedChannelId,
  });

  return (
    <Container
      data-cy={expanded ? 'mini-composer-expanded' : 'mini-composer-collapsed'}
    >
      {!expanded && (
        <div
          tabIndex={-1}
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'transparent',
            zIndex: 9999,
            cursor: 'pointer',
          }}
          onClick={() => setExpanded(true)}
        />
      )}
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <UserAvatar
          isClickable={false}
          showHoverProfile={false}
          showOnlineStatus={false}
          user={profile}
          size={40}
        />
        <div css={{ width: '100%', margin: '0 8px' }}>
          {titleWarning && (
            <p
              data-cy="mini-composer-warning"
              css={{
                color: theme.warn.default,
                fontSize: '12px',
                marginBottom: '4px',
                fontWeight: '500',
              }}
            >
              {titleWarning}
            </p>
          )}
          <input
            data-cy="mini-composer-title"
            tabIndex={1}
            css={{
              background: theme.bg.default,
              border: `1px solid ${
                titleWarning ? theme.warn.default : theme.bg.border
              }`,
              borderRadius: '8px',
              width: '100%',
              padding: '12px',
              fontSize: '16px',
            }}
            ref={titleEditor}
            value={title}
            onChange={changeTitle}
            placeholder="What's on your mind?"
          />
        </div>
        {!expanded && <PrimaryButton tabIndex={-1}>Post</PrimaryButton>}
      </div>
      {expanded && (
        <BodyContainer>
          <div
            css={{
              width: '100%',
              position: 'relative',
              marginBottom: '8px',
            }}
          >
            <Textarea
              data-cy="mini-composer-body"
              tabIndex={2}
              style={{
                background: theme.bg.default,
                border: `1px solid ${theme.bg.border}`,
                borderRadius: '8px',
                width: '100%',
                lineHeight: '1.4',
                fontSize: '16px',
                padding: '12px',
                fontFamily: 'inherit',
              }}
              inputRef={bodyEditor}
              value={body}
              onChange={changeBody}
              placeholder="(Optional) Add more details..."
            />
          </div>
          <div
            css={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div css={{ display: 'flex', alignItems: 'center' }}>
              {!channel.id && (
                <ChannelSelector
                  club={club}
                  id={club.id || id}
                  onChannelChange={(id) => {
                    setSelectedChannelId(id);
                  }}
                  selectedClubId={club.id || id}
                  selectedChannelId={selectedChannelId}
                  css={{ marginLeft: 0 }}
                  tabIndex={3}
                />
              )}
              {channel.id && (
                <ChannelSelector
                  club={club}
                  id={club.id || id}
                  selectedClubId={club.id || id}
                  selectedChannelId={channel.id}
                  disabled
                  css={{ marginLeft: 0 }}
                  tabIndex={3}
                />
              )}
              <Tooltip content="Open in fullscreen">
                <span style={{ marginLeft: '8px' }}>
                  <Link
                    data-cy="mini-composer-fullscreen"
                    to={{
                      pathname,
                      search,
                      state: { modal: true },
                    }}
                    css={{
                      color: theme.text.alt,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Icon size={24} glyph="expand" />
                  </Link>
                </span>
              </Tooltip>
            </div>
            <div style={{ display: 'flex' }}>
              <TextButton
                tabIndex={0}
                style={{ marginRight: '8px' }}
                onClick={handleCancel}
                data-cy="mini-composer-cancel"
              >
                Cancel
              </TextButton>
              <PrimaryButton
                tabIndex={4}
                data-cy="mini-composer-post"
                disabled={
                  isLoading ||
                  title.trim().length === 0 ||
                  (!fixedChannelId && !selectedChannelId)
                }
                onClick={publish}
              >
                {isLoading ? 'Posting...' : 'Post'}
              </PrimaryButton>
            </div>
          </div>
        </BodyContainer>
      )}
    </Container>
  );
};

export default compose(
  firestoreConnect(),
  withRouter,
  connect(({ firebase: { profile, auth } }) => ({ profile, auth })),
)(MiniComposer);
