import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ErrorBoundary } from 'src/components/error';
import { Loading } from 'src/components/loading';
import { UserListItem } from 'src/components/entities';
import Icon from 'src/components/icon';
import { isAdmin } from 'src/components/entities/profileCards/components/clubActions';
import Tooltip from 'src/components/tooltip';
import { WhiteIconButton } from 'src/components/button';
import { List, SidebarSectionHeader, SidebarSectionHeading } from '../style';

class Component extends React.Component {
  state = { users: [], isLoading: null, hasError: null };

  componentDidMount() {
    if (this.props.club.admins) {
      this.setState({ isLoading: true });
      this.props.club.admins.forEach((user) => {
        user
          .get()
          .then((adminDoc) => {
            this.setState((prevState) => ({
              users: [...prevState.users, adminDoc],
              isLoading: false,
            }));
          })
          .catch((err) => {
            this.setState({ hasError: true, isLoading: false });
          });
      });
    }
  }

  render() {
    const { club, id, auth } = this.props;
    const { users, isLoading, hasError } = this.state;

    if (isLoading || !auth.isLoaded)
      return (
        <React.Fragment>
          <SidebarSectionHeader>
            <SidebarSectionHeading>Team</SidebarSectionHeading>
          </SidebarSectionHeader>
          <Loading style={{ padding: '32px' }} />
        </React.Fragment>
      );

    if (hasError) return null;

    return (
      <React.Fragment>
        <SidebarSectionHeader>
          <SidebarSectionHeading>Team</SidebarSectionHeading>
          {auth.uid && isAdmin(club, auth.uid) && (
            <React.Fragment>
              <Tooltip content={'Manage team'}>
                <span>
                  <WhiteIconButton to={`/${id}/settings`}>
                    <Icon glyph={'settings'} size={24} />
                  </WhiteIconButton>
                </span>
              </Tooltip>
              <Tooltip content={'View all'}>
                <span>
                  <WhiteIconButton to={`/${id}?tab=members`}>
                    <Icon glyph={'view'} size={24} />
                  </WhiteIconButton>
                </span>
              </Tooltip>
            </React.Fragment>
          )}
        </SidebarSectionHeader>

        <List>
          {users.map((user) => (
            <ErrorBoundary key={user.id}>
              <UserListItem
                userObject={user.data()}
                id={user.id}
                name={user.data() && user.data().name}
                pfp={user.data() && user.data().pfp}
                avatarSize={40}
                club={club}
                clubId={club.id || id}
              />
            </ErrorBoundary>
          ))}
        </List>
      </React.Fragment>
    );
  }
}

export const TeamMembersList = compose(
  withRouter,
  connect(({ firebase: { auth } }) => ({ auth })),
)(Component);
