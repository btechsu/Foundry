import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import compose from 'recompose/compose';
import { firestoreConnect } from 'react-redux-firebase';
import { ErrorBoundary } from 'src/components/error';
import { isAdmin } from 'src/components/entities/profileCards/components/clubActions';
import Icon from 'src/components/icon';
import { Loading } from 'src/components/loading';
import Tooltip from 'src/components/tooltip';
import { ChannelListItem } from 'src/components/entities';
import { WhiteIconButton } from 'src/components/button';
import { SidebarSectionHeader, SidebarSectionHeading, List } from '../style';

// const ChatTab = ({ location, community, currentUser }) =>
//   !community.watercoolerId ? null : (
//     <Route exact path={`/${community.slug}`}>
//       {({ match }) => {
//         const isActive = !!match && location.search.indexOf('tab=chat') > -1;
//         return (
//           <Link to={`/${community.slug}?tab=chat`}>
//             <Row isActive={isActive}>
//               <Content>
//                 <Label>Chat</Label>
//               </Content>
//               <Actions>
//                 {!currentUser ? (
//                   <Icon glyph="view-forward" size={24} />
//                 ) : (
//                   <Query
//                     query={getThreadByIdQuery}
//                     variables={{ id: community.watercoolerId }}
//                   >
//                     {({ loading, error, data }) => {
//                       if (data && data.thread) {
//                         const showNotificationAction = !!data.thread.community
//                           .communityPermissions.isMember;

//                         if (!showNotificationAction)
//                           return <Icon glyph="view-forward" size={24} />;

//                         const tipText = data.thread.receiveNotifications
//                           ? 'Mute chat notifications'
//                           : 'Enable chat notifications';
//                         const glyph = data.thread.receiveNotifications
//                           ? 'notification'
//                           : 'mute';

//                         return (
//                           <Mutation
//                             mutation={toggleThreadNotificationsMutation}
//                           >
//                             {(toggleThreadNotifications, { loading }) => (
//                               <Tooltip content={tipText}>
//                                 <span
//                                   style={{ marginLeft: '8px', display: 'flex' }}
//                                 >
//                                   {/* {!newActivity && !isActive && <NewActivityDot />} */}
//                                   <OutlineButton
//                                     disabled={loading}
//                                     onClick={(e: any) => {
//                                       e &&
//                                         e.preventDefault() &&
//                                         e.stopPropogation();
//                                       toggleThreadNotifications({
//                                         variables: {
//                                           threadId: data.thread.id,
//                                         },
//                                       });
//                                     }}
//                                     style={{ padding: '4px' }}
//                                     size={'small'}
//                                   >
//                                     <Icon
//                                       style={{
//                                         marginTop: '-1px',
//                                       }}
//                                       glyph={glyph}
//                                       size={24}
//                                     />
//                                   </OutlineButton>
//                                 </span>
//                               </Tooltip>
//                             )}
//                           </Mutation>
//                         );
//                       }

//                       if (loading) return <Spinner color="text.alt" />;

//                       if (error) return <Icon glyph="view-forward" size={24} />;

//                       return null;
//                     }}
//                   </Query>
//                 )}
//               </Actions>
//             </Row>
//           </Link>
//         );
//       }}
//     </Route>
//   );

class Component extends React.Component {
  state = {
    isLoading: false,
    channels: null,
    error: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.firestore
      .collection('clubs')
      .doc(this.props.club.id || this.props.id)
      .collection('channels')
      .get()
      .then((channels) => {
        this.setState({ isLoading: false, channels: channels.docs });
      })
      .catch(() => {
        this.setState({ isLoading: false, error: true });
      });
  }

  render() {
    const { club, id, auth } = this.props;

    if (!auth.isLoaded || this.state.isLoading) {
      return (
        <React.Fragment>
          <SidebarSectionHeader>
            <SidebarSectionHeading>Channels</SidebarSectionHeading>
          </SidebarSectionHeader>
          <Loading style={{ padding: '32px' }} />
        </React.Fragment>
      );
    }

    if (club) {
      return (
        <React.Fragment>
          <SidebarSectionHeader>
            <SidebarSectionHeading>Channels</SidebarSectionHeading>
            {isAdmin(club, auth.uid) && (
              <Tooltip content={'Manage channels'}>
                <span>
                  <WhiteIconButton to={`/${club.id || id}/settings`}>
                    <Icon glyph={'settings'} size={24} />
                  </WhiteIconButton>
                </span>
              </Tooltip>
            )}
          </SidebarSectionHeader>

          <List data-cy="channel-list">
            {/* <ChatTab
              location={location}
              community={community}
              currentUser={currentUser}
            /> */}
            {!this.state.isLoading &&
              this.state.channels &&
              this.state.channels.map((channel) => {
                if (!channel) return null;
                return (
                  <ErrorBoundary key={channel.id}>
                    <Route path={`/${club.id || id}/${channel.id}`}>
                      {({ match }) => (
                        <ChannelListItem
                          club={club}
                          id={id}
                          channel={channel}
                          name={channel.data().name}
                          isActive={!!match}
                        />
                      )}
                    </Route>
                  </ErrorBoundary>
                );
              })}
            {this.state.error && <Icon glyph="view-forward" size={24} />}
          </List>
        </React.Fragment>
      );
    }

    return null;
  }
}

export const ChannelsList = compose(
  firestoreConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)(Component);
