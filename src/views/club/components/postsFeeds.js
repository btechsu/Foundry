import React from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ThreadFeed from 'src/components/threadFeed';
import { isAdmin } from 'src/components/entities/profileCards/components/clubActions';
import MiniComposer from 'src/components/composerMini';

const Posts = (props) => {
  const { club, channel, id, auth } = props;

  return (
    <React.Fragment>
      {auth.uid && channel && isAdmin(club, auth.uid) && (
        <MiniComposer club={club} id={club.id || id} channel={channel} />
      )}

      <ThreadFeed
        viewContext="clubProfile"
        id={club.id || id}
        channel={channel}
        setThreadsStatus={false}
        isNewAndOwned={false}
        club={club}
      />
    </React.Fragment>
  );
};

export const PostsFeeds = compose(
  withRouter,
  connect(({ firebase: { auth } }) => ({ auth })),
)(Posts);
