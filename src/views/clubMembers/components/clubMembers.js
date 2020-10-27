import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { firestoreConnect } from 'react-redux-firebase';
import { SectionCard, SectionTitle } from 'src/components/settingsViews/style';
import { Filters, Filter } from '../style';
import { ListContainer } from 'src/components/listItems/style';
import MembersList from 'src/views/club/components/membersList';
import { TeamMembersList } from 'src/views/club/components/teamMembersList';

class ClubMembers extends React.Component {
  initialState = {
    filter: { members: true, admins: false, pending: false },
    members: { list: [], last: null },
    isLoading: false,
  };

  state = this.initialState;

  viewMembers = () => {
    return this.setState({
      filter: { members: true, admins: false, pending: false },
    });
  };

  viewPending = () => {
    return this.setState({
      filter: { members: false, admins: false, pending: true },
    });
  };

  viewTeam = () => {
    return this.setState({
      filter: { admins: true, members: false, pending: false },
    });
  };

  render() {
    const { filter } = this.state;
    const { id, club } = this.props;

    return (
      <SectionCard>
        <SectionTitle>Club Admins · {club.admins.length}</SectionTitle>

        <Filters>
          <Filter
            onClick={this.viewMembers}
            active={filter && filter.members ? true : false}
          >
            Members
          </Filter>

          <Filter
            onClick={this.viewTeam}
            active={filter && filter.admins ? true : false}
          >
            Admins
          </Filter>

          <Filter
            onClick={this.viewPending}
            active={filter && filter.pending ? true : false}
          >
            Pending
          </Filter>
        </Filters>
        <ListContainer>
          {filter.members && <MembersList club={club} id={id} />}
          {filter.admins && (
            <TeamMembersList club={club} id={id} hideTop={true} />
          )}
          {filter.pending && (
            <MembersList club={club} id={id} getPending={true} />
          )}
        </ListContainer>
      </SectionCard>
    );
  }
}

export default compose(
  withRouter,
  firestoreConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)(ClubMembers);
