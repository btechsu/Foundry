import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Loading } from 'src/components/loading';
import { ErrorView } from 'src/views/viewHelpers';
import { isFoundryAdmin } from 'src/views/admin';
import { SubmissionList } from './components/list';

const SubmissionsProto = (props) => {
  const { auth } = props;

  if (!auth.isLoaded) return <Loading />;
  if (!isFoundryAdmin(auth.email)) return <ErrorView />;

  return (
    <div style={{ padding: '64px' }}>
      <SubmissionList />
    </div>
  );
};

export default compose(connect(({ firebase: { auth } }) => ({ auth })))(
  SubmissionsProto,
);
