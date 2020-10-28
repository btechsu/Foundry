import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { ErrorBoundary } from 'src/components/error';
import { isAdmin } from 'src/helpers/permissions';
import Icon from 'src/components/icon';
import { Loading } from 'src/components/loading';
import Tooltip from 'src/components/tooltip';
import { ChannelListItem } from 'src/components/entities';
import { WhiteIconButton } from 'src/components/button';
import { SidebarSectionHeader, SidebarSectionHeading, List } from '../style';

import {
  ChannelRow,
  ChannelContent,
  Label,
} from 'src/components/entities/listItems/style';

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
            {auth.uid && isAdmin(club, auth.uid) && (
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
            <ChannelRow>
              <Link to={`/${club.id || id}?tab=posts`}>
                <ChannelContent>
                  <Label title={id}># Club description</Label>
                </ChannelContent>
              </Link>
            </ChannelRow>
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
