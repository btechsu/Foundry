// @flow
/* eslint-disable max-len */
// This component is shown as a full replacement for the entire app in production whenever an error happens that would otherwise crash the app
import React from 'react';
import ViewError from '../viewError';

const BlueScreen = () => {
  return (
    <ViewError
      heading="Something went wrong"
      subheading="Sorry about the technical issues. We are working as hard as we can to resolve it as soon as possible."
      refresh
    />
  );
};

export default BlueScreen;
