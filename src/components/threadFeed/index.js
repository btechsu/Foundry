import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import InboxThread from 'src/components/inboxThread';
import { LoadingInboxThread } from 'src/components/loading';
import ViewError from 'src/components/viewError';
import { ErrorBoundary } from 'src/components/error';
import { useInView } from 'react-intersection-observer';
import { firestoreConnect } from 'react-redux-firebase';
import ReactMarkdown from 'react-markdown';
import { Container } from './style';
import NullState from './nullState';

const ThreadFeedPure = (props) => {
  // TODO: ADD INFINITE SCROLL
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState(0);
  const [prevChannel, setPrevChannel] = useState(channel);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { firestore, club, channel, id, viewContext } = props;
  const { ref, inView } = useInView({ threshold: 0.8 });

  useEffect(() => {
    if (channel) {
      setLoading(true);
      firestore
        .collection(`clubs/${id}/channels/${channel.id}/posts`)
        .orderBy('posted', 'desc')
        .limit(18)
        .get()
        .then((queryPosts) => {
          if (channel === prevChannel) {
            setPosts((prev) => [...prev, ...queryPosts.docs]);
            setLastPost(queryPosts.docs[queryPosts.docs.length - 1]);
          } else {
            setPrevChannel(channel);
            setPosts(queryPosts.docs);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }
  }, [inView, channel]);

  if (loading) {
    return (
      <Container>
        <LoadingInboxThread />
        <LoadingInboxThread />
        <LoadingInboxThread />
        <LoadingInboxThread />
        <LoadingInboxThread />
        <LoadingInboxThread />
        <LoadingInboxThread />
        <LoadingInboxThread />
        <LoadingInboxThread />
        <LoadingInboxThread />
      </Container>
    );
  }

  if (posts.length === 0 && !loading && !error && club) {
    return (
      <Container data-cy="thread-feed">
        <ReactMarkdown source={club.text} />;
      </Container>
    );
  }

  if (posts.length > 0) {
    return (
      <Container data-cy="thread-feed">
        {posts.map((post) => (
          <ErrorBoundary key={post.id}>
            <InboxThread thread={post} club={club} id={id} channel={channel} />
          </ErrorBoundary>
        ))}
      </Container>
    );
  }

  if (error) {
    return (
      <ViewError
        heading={'We ran into an issue loading the feed'}
        subheading={
          'Try refreshing the page below. If you’re still seeing this error, please contact us.'
        }
        refresh
      />
    );
  }

  return (
    <NullState
      clubId={id}
      channelId={channel && channel.id}
      viewContext={viewContext}
    />
  );
};

const ThreadFeed = compose(firestoreConnect(), connect())(ThreadFeedPure);

export default ThreadFeed;
