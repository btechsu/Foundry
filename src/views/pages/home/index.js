// @flow
import * as React from 'react';
import { openModal } from '@actions/modals';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { PrimaryButton } from '@components/button';

const Login = (props) => {
  const showModal = () => props.dispatch(openModal('SUBMIT_CLUB_MODAL'));

  return (
    <React.Fragment>
      <h1>this is the homepage</h1>
      <PrimaryButton onClick={showModal}>open modal</PrimaryButton>
      <PrimaryButton to="/privacy">go to privacy</PrimaryButton>
    </React.Fragment>
  );
};

export default compose(withRouter, connect())(Login);
