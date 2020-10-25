import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import querystring from 'query-string';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { isAdmin } from 'src/components/entities/profileCards/components/clubActions';
import { MobileClubInfoActions } from 'src/views/club/components/mobileClubInfoActions';
import { ChannelsList } from 'src/views/club/components/channelsList';
import { ClubMeta } from 'src/components/entities/profileCards/components/clubMeta';
import generateMetaInfo from 'shared/generate-meta-info';
import Head from 'src/components/head';
import { SegmentedControl, Segment } from 'src/components/segmentedControl';
import { ErrorView, LoadingView } from 'src/views/viewHelpers';
import MembersList from 'src/views/club/components/membersList.js';
import { setTitlebarProps } from 'src/actions/titlebar';
import { MobileChannelAction } from 'src/components/titlebar/actions';
import { ClubAvatar } from 'src/components/avatar';
import { PostsFeeds } from 'src/views/club/components/postsFeeds';
import {
  ViewGrid,
  SecondaryPrimaryColumnGrid,
  PrimaryColumn,
  SecondaryColumn,
} from 'src/components/layout';
import { SidebarSection } from 'src/views/club/style';
import ClubSidebar from 'src/components/clubSidebar';
import { FeedsContainer } from './style';
import { InfoContainer } from '../club/style';

class ChannelView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      club: null,
      channel: null,
      loading: false,
      error: false,
    };
    const { location, history } = props;
    const { search } = location;
    const { tab } = querystring.parse(search);
    if (!tab)
      history.replace({
        ...location,
        search: querystring.stringify({ tab: 'posts' }),
      });
  }

  async queryDatabase() {
    const { firestore, match } = this.props;
    try {
      const clubDoc = await firestore
        .collection('clubs')
        .doc(match.params.clubSlug)
        .get();
      const channelDoc = await firestore
        .collection('clubs')
        .doc(match.params.clubSlug)
        .collection('channels')
        .doc(match.params.channelSlug)
        .get();

      if (channelDoc.exists) this.setState({ channel: channelDoc });
      if (clubDoc.exists) this.setState({ club: clubDoc });
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ error: true, loading: false });
    }
  }

  componentDidMount() {
    this.queryDatabase();

    if (!this.state.loading && this.state.channel && this.state.club) {
      this.props.dispatch(
        setTitlebarProps({
          title: `# ${this.state.channel.data().name}`,
          titleIcon: (
            <ClubAvatar
              isClickable={false}
              club={this.state.club.data()}
              id={this.state.club.id}
              size={24}
            />
          ),
          rightAction: (
            <MobileChannelAction
              club={this.state.club.data()}
              id={this.state.club.id}
              channel={this.state.channel}
            />
          ),
        }),
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props;

    if (
      this.state.channel &&
      this.state.channel.id !== this.props.match.params.channelSlug
    ) {
      this.queryDatabase();
    }

    if (!this.state.loading && this.state.channel && this.state.club) {
      const elem = document.getElementById('main');
      if (elem) elem.scrollTop = 0;

      dispatch(
        setTitlebarProps({
          title: `# ${this.state.channel.data().name}`,
          titleIcon: (
            <ClubAvatar
              isClickable={false}
              club={this.state.club.data()}
              id={this.state.club.id}
              size={24}
            />
          ),
          rightAction: (
            <MobileChannelAction
              club={this.state.club.data()}
              id={this.state.club.id}
              channel={this.state.channel}
            />
          ),
        }),
      );
      const { location, history } = this.props;
      const { search } = location;
      const { tab } = querystring.parse(search);
      if (!tab)
        history.replace({
          ...location,
          search: querystring.stringify({ tab: 'posts' }),
        });
    }
  }

  handleSegmentClick = (tab) => {
    const { history, location } = this.props;
    return history.replace({
      ...location,
      search: querystring.stringify({ tab }),
    });
  };

  render() {
    const { channel, club, loading, error } = this.state;
    const { auth, location } = this.props;
    const { search } = location;
    const { tab } = querystring.parse(search);
    const selectedView = tab;

    if (error) return <ErrorView data-cy="channel-view-error" />;

    if (loading || !auth.isLoaded || !club || !channel) {
      return <LoadingView />;
    }

    if (club && channel && channel.id) {
      // at this point the view is no longer loading, has not encountered an error, and has returned a channel record

      // at this point the user has full permission to view the channel
      const { title, description } = generateMetaInfo({
        type: 'channel',
        data: {
          name: channel.data().name,
          clubName: club.data().name,
          description: club.data().description,
        },
      });

      return (
        <React.Fragment>
          <Head
            title={title}
            description={description}
            image={club.data().pfp}
          />

          <ViewGrid>
            <SecondaryPrimaryColumnGrid data-cy="channel-view">
              <SecondaryColumn>
                <ClubSidebar club={club.data()} id={club.id} />
              </SecondaryColumn>

              <PrimaryColumn>
                <FeedsContainer>
                  <SegmentedControl>
                    <Segment
                      onClick={() => this.handleSegmentClick('posts')}
                      isActive={selectedView === 'posts'}
                      data-cy="channel-posts-tab"
                      hideOnDesktop
                    >
                      Posts
                    </Segment>

                    {auth.uid && isAdmin(club.data(), auth.uid) && (
                      <Segment
                        onClick={() => this.handleSegmentClick('members')}
                        isActive={selectedView === 'members'}
                        hideOnDesktop
                        data-cy="channel-members-tab"
                      >
                        Members
                      </Segment>
                    )}

                    <Segment
                      onClick={() => this.handleSegmentClick('info')}
                      isActive={selectedView === 'info'}
                      data-cy="channel-info-tab"
                      hideOnDesktop
                    >
                      Info
                    </Segment>
                  </SegmentedControl>

                  {selectedView === 'posts' && (
                    <PostsFeeds
                      channel={channel}
                      club={club.data()}
                      id={club.id}
                    />
                  )}

                  {auth.uid &&
                    isAdmin(club.data(), auth.uid) &&
                    selectedView === 'members' && (
                      <MembersList club={club.data()} id={club.id} />
                    )}

                  {selectedView === 'info' && (
                    <InfoContainer>
                      <SidebarSection style={{ paddingBottom: '16px' }}>
                        <ClubMeta club={club.data()} id={club.id} />
                      </SidebarSection>

                      <SidebarSection>
                        <ChannelsList id={club.id} club={club.data()} />
                      </SidebarSection>

                      <SidebarSection>
                        <MobileClubInfoActions
                          club={club.data()}
                          id={club.id}
                        />
                      </SidebarSection>
                    </InfoContainer>
                  )}
                </FeedsContainer>
              </PrimaryColumn>
            </SecondaryPrimaryColumnGrid>
          </ViewGrid>
        </React.Fragment>
      );
    }

    return <ErrorView data-cy="channel-view-error" />;
  }
}

export default compose(
  withRouter,
  firestoreConnect(),
  connect(({ firebase: { auth } }) => ({
    auth,
  })),
)(ChannelView);
