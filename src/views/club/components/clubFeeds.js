import React, { useEffect, useLayoutEffect } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import querystring from 'query-string';
import MembersList from './membersList';
import { MobileClubInfoActions } from './mobileClubInfoActions';
import { ChannelsList } from './channelsList';
import { ClubMeta } from 'src/components/entities/profileCards/components/clubMeta';
import { PostsFeeds } from './postsFeeds';
import { isAdmin } from 'src/components/entities/profileCards/components/clubActions';
import { SegmentedControl, Segment } from 'src/components/segmentedControl';
import { useAppScroller } from 'src/hooks/useAppScroller';
import usePrevious from 'src/hooks/usePrevious';
import { FeedsContainer, SidebarSection, InfoContainer } from '../style';

const Feeds = (props) => {
  const { club, id, location, history, auth } = props;
  const { search } = location;
  const { tab } = querystring.parse(search);

  const changeTab = (tab) => {
    return history.replace({
      ...location,
      search: querystring.stringify({ tab }),
    });
  };

  const handleTabRedirect = () => {
    const { search } = location;
    const { tab } = querystring.parse(search);

    if (!tab) {
      changeTab('posts');
    }
  };

  useEffect(() => {
    handleTabRedirect();
  }, [tab]);

  const renderFeed = () => {
    switch (tab) {
      case 'posts': {
        return <PostsFeeds club={club} id={club.id || id} />;
      }
      case 'members': {
        return (
          <MembersList
            club={club}
            id={club.id || id}
            filter={{ isMember: true, isBlocked: false }}
          />
        );
      }
      case 'info': {
        return (
          <InfoContainer>
            <SidebarSection style={{ paddingBottom: '16px' }}>
              <ClubMeta club={club} id={club.id || id} />
            </SidebarSection>

            <SidebarSection>
              <ChannelsList id={club.id || id} club={club} />
            </SidebarSection>

            <SidebarSection>
              <MobileClubInfoActions club={club} id={id} />
            </SidebarSection>
          </InfoContainer>
        );
      }
      default:
        return null;
    }
  };

  const { scrollToTop, scrollTo, ref } = useAppScroller();
  const lastTab = usePrevious(tab);
  const lastScroll = ref ? ref.scrollTop : null;
  useLayoutEffect(() => {
    if (lastTab && lastTab !== tab && lastScroll) {
      sessionStorage.setItem(`last-scroll-${lastTab}`, lastScroll.toString());
    }
    const stored =
      sessionStorage && sessionStorage.getItem(`last-scroll-${tab}`);
    if (stored && history.action === 'POP') {
      scrollTo(Number(stored));
    } else {
      scrollToTop();
    }
  }, [tab]);

  // Store the last scroll position on unmount
  useLayoutEffect(() => {
    return () => {
      const elem = document.getElementById('main');
      if (!elem) return;
      sessionStorage.setItem(`last-scroll-${tab}`, elem.scrollTop.toString());
    };
  }, []);

  const segments = isAdmin(club, auth.uid)
    ? ['posts', 'members', 'info']
    : ['posts', 'info'];

  return (
    <FeedsContainer data-cy="club-view-content">
      <SegmentedControl>
        {segments.map((segment) => {
          return (
            <Segment
              key={segment}
              hideOnDesktop
              isActive={segment === tab}
              onClick={() => changeTab(segment)}
            >
              {segment[0].toUpperCase() + segment.substr(1)}
            </Segment>
          );
        })}
      </SegmentedControl>
      {renderFeed()}
    </FeedsContainer>
  );
};

export const ClubFeeds = compose(
  withRouter,
  connect(({ firebase: { auth } }) => ({
    auth,
  })),
)(Feeds);
