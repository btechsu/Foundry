// @flow
import * as React from 'react';
import { openModal } from '@actions/modals';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { PrimaryButton } from '@components/button';

class Login extends React.Component {
  showModal = () => {
    this.props.dispatch(openModal('SUBMIT_CLUB_MODAL'));
  };

  render() {
    return (
      <React.Fragment>
        <h1>this is the login page</h1>
        <PrimaryButton onClick={this.showModal}>open modal</PrimaryButton>
      </React.Fragment>
    );
  }
}

export default compose(withRouter, connect())(Login);
