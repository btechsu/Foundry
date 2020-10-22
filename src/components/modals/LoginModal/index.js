import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { closeModal } from 'src/actions/modals';
import ModalContainer from '../modalContainer';
import { modalStyles } from '../styles';
import { OutlineButton } from 'src/components/button';
import LoginButtonSet from 'src/components/loginButtonSet';
import { firebaseConnect } from 'react-redux-firebase';
import { Container, CodeOfConduct } from './style';

class LoginModal extends React.Component {
  close = () => {
    this.props.dispatch(closeModal());
  };

  render() {
    const { isOpen } = this.props;

    const styles = modalStyles(480);
    const redirectPath = `${window.location.href}`;
    const signinType = 'signin';

    return (
      <Modal
        /* TODO(@mxstbr): Fix this */
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel={'Sign up'}
        onRequestClose={this.close}
        shouldCloseOnOverlayClick={true}
        style={styles}
        closeTimeoutMS={330}
      >
        {/*
          We pass the closeModal dispatch into the container to attach
          the action to the 'close' icon in the top right corner of all modals
        */}
        <ModalContainer title={'Sign up'} closeModal={this.close}>
          <Container data-cy="login-modal">
            <LoginButtonSet
              redirectPath={redirectPath}
              signinType={signinType}
              newUser={true}
              onlyButton={true}
              onClick={() =>
                this.props.firebase.login({
                  provider: 'google',
                  type: 'redirect',
                })
              }
            />

            <OutlineButton
              css={{ width: '100%' }}
              onClick={this.close}
              to={`/login?r=${redirectPath}`}
            >
              Existing user? Click here to log in
            </OutlineButton>

            <div style={{ padding: '16px' }} />

            <CodeOfConduct>
              By using Foundry, you agree to our{' '}
              <Link target="_blank" rel="noopener noreferrer" to="/privacy">
                Privacy Policy
              </Link>
              .
            </CodeOfConduct>
          </Container>
        </ModalContainer>
      </Modal>
    );
  }
}

const map = (state) => ({
  isOpen: state.modals.isOpen,
  modalProps: state.modals.modalProps,
});

// $FlowIssue
export default compose(firebaseConnect(), connect(map))(LoginModal);
