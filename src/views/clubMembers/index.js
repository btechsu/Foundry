import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { ClubInvitationForm } from 'src/components/emailInvitationForm';
import ClubMembers from './components/clubMembers';
import SuperAdmin from './components/superAdmin';
import {
  SectionsContainer,
  SectionCard,
  SectionTitle,
  Column,
} from 'src/components/settingsViews/style';
import { isSuperAdmin } from 'src/views/clubSettings/components/editForm';
import { ErrorBoundary, SettingsFallback } from 'src/components/error';
import { ErrorView } from 'src/views/viewHelpers';

class CommunityMembersSettings extends React.Component {
  render() {
    const { club, id, auth, history } = this.props;

    if (club && id) {
      return (
        <SectionsContainer>
          <Column>
            <ErrorBoundary fallbackComponent={SettingsFallback}>
              <ClubMembers history={history} id={id} club={club} />
            </ErrorBoundary>

            {isSuperAdmin(club, auth.uid) && <SuperAdmin id={id} club={club} />}
          </Column>
          {isSuperAdmin(club, auth.uid) && (
            <Column>
              <ErrorBoundary fallbackComponent={SettingsFallback}>
                <SectionCard>
                  <SectionTitle>Add admin my email</SectionTitle>
                  <ClubInvitationForm id={id} club={club} />
                </SectionCard>
              </ErrorBoundary>
            </Column>
          )}
        </SectionsContainer>
      );
    }

    return <ErrorView />;
  }
}

export default compose(connect(({ firebase: { auth } }) => ({ auth })))(
  CommunityMembersSettings,
);
