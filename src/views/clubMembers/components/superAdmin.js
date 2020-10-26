import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { firestoreConnect } from 'react-redux-firebase';
import { SectionCard, SectionTitle } from 'src/components/settingsViews/style';
import { openModal } from 'src/actions/modals';
import { PrimaryOutlineButton } from 'src/components/button';
import { ListContainer } from 'src/components/listItems/style';
import {
  Actions,
  TertiaryActionContainer,
} from 'src/components/editForm/style';

class SuperAdmin extends React.Component {
  render() {
    const { id, club, auth, dispatch } = this.props;

    return (
      <SectionCard>
        <SectionTitle>Change Superadmin</SectionTitle>

        <ListContainer>
          <p>
            If you see this, you are the current superadmin for {club.name}.
            This means you have the admin role + access to manage admins for
            your club. If you wish to transfer the superadmin role to another
            admin, you can do so here.
          </p>
        </ListContainer>

        <Actions>
          <TertiaryActionContainer style={{ justifyContent: 'flex-end' }}>
            <PrimaryOutlineButton
              icon={'plus'}
              onClick={() =>
                dispatch(
                  openModal('TRANSFER_SUPERADMIN', {
                    id: id,
                    club: club,
                    auth: auth,
                  }),
                )
              }
              data-cy="create-channel-button"
            >
              Transfer access
            </PrimaryOutlineButton>
          </TertiaryActionContainer>
        </Actions>
      </SectionCard>
    );
  }
}

export default compose(
  withRouter,
  firestoreConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)(SuperAdmin);
