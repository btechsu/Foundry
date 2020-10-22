import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
// import ThreadFeed from 'src/components/threadFeed';
import { isAdmin } from 'src/components/entities/profileCards/components/clubActions';
import MiniComposer from 'src/components/composerMini';

// const CommunityThreadFeed = compose(getCommunityThreads)(ThreadFeed);

const Posts = (props) => {
  const { club, id, auth } = props;

  return (
    <React.Fragment>
      {isAdmin(club, auth.uid) && (
        <MiniComposer club={club} id={club.id || id} />
      )}

      {/* {!debouncedServerSearchQuery && (
        <CommunityThreadFeed
          viewContext="communityProfile"
          slug={community.slug}
          id={community.id}
          setThreadsStatus={false}
          isNewAndOwned={false}
          community={community}
          pinnedThreadId={community.pinnedThreadId}
          sort={activeFeed}
        />
      )} */}
    </React.Fragment>
  );
};

export const PostsFeeds = compose(
  connect(({ firebase: { auth } }) => ({ auth })),
)(Posts);
