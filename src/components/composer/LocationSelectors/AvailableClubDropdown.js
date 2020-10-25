import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoadingSelect, ErrorSelect } from 'src/components/loading';
import { RequiredSelector } from '../style';

const AvailableClubsDropdown = (props) => {
  const { onChange, id, auth, clubs, isLoading, error } = props;

  if (isLoading || !auth.isLoaded) return <LoadingSelect />;

  if (error)
    return <ErrorSelect>Something went wrong, please refresh</ErrorSelect>;

  if (!auth.uid && auth.isLoaded)
    return <ErrorSelect>Please sign in to Foundry</ErrorSelect>;

  if (!isLoading && clubs.length === 0)
    return <ErrorSelect>You’re not an admin of any clubs</ErrorSelect>;

  if (!isLoading)
    return (
      <RequiredSelector
        data-cy="composer-club-selector"
        onChange={onChange}
        value={id || ''}
        emphasize={!id}
      >
        <React.Fragment>
          <option value={''}>Choose a club</option>

          {clubs.map((club) => {
            if (!club) return null;
            return (
              <option key={club.id} value={club.id}>
                {club.data().name}
              </option>
            );
          })}
        </React.Fragment>
      </RequiredSelector>
    );
};

export default compose(
  withRouter,
  connect(({ firebase: { auth } }) => ({ auth })),
)(AvailableClubsDropdown);
