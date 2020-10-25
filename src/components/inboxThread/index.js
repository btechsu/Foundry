import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from './header';
import {
  InboxThreadItem,
  InboxLinkWrapper,
  InboxThreadContent,
  ThreadTitle,
  ThreadSnippet,
  Column,
  AvatarLink,
  CommunityAvatarLink,
} from './style';
import { UserAvatar } from 'src/components/avatar';
import { ErrorBoundary } from 'src/components/error';

const InboxThread = (props) => {
  const { thread, club, id, channel } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function queryUser() {
      if (thread && thread.data().authored) {
        const query = await thread.data().authored.get();

        setUser(query.data());
      }
    }

    queryUser();
  }, [thread]);

  return (
    <InboxThreadItem new={false} data-cy="thread-card">
      <InboxThreadContent>
        <AvatarLink>
          <UserAvatar user={user || thread.data()} size={40} />
        </AvatarLink>

        <Column>
          <ErrorBoundary>
            <Header
              thread={thread.data()}
              threadId={thread.id}
              club={club}
              id={id}
              user={user}
              channel={channel}
            />
          </ErrorBoundary>

          <ThreadTitle>{thread.data().title}</ThreadTitle>

          <ThreadSnippet source={thread.data().body} />
        </Column>
      </InboxThreadContent>
    </InboxThreadItem>
  );
};

export default compose(withRouter, connect())(InboxThread);