import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import { closeModal } from 'src/actions/modals';
import ModalContainer from '../modalContainer';
import { modalStyles } from '../styles';
import { firebaseConnect } from 'react-redux-firebase';
import {
  Container,
  FieldInput,
  FieldLabel,
  Field,
  FieldArea,
  SubmitButton,
} from './style';
import Icon from '../../icon';

class EditClubModal extends React.Component {
  close = () => {
    this.props.dispatch(closeModal());
  };

  handleSubmit = () => {
    let firestore = this.props.modalProps.firestore;
    firestore
      .collection('clubs')
      .doc(this.props.modalProps.clubID)
      .set({
        name: this.state.name,
        description: this.state.description,
        credits: this.state.credits,
        days: this.state.days,
        room: this.state.room,
        president: this.state.president,
      })
      .then(() => {
        alert(`${this.state.name} has been changed!`);
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.modalProps.club.name,
      description: props.modalProps.club.description,
      credits: props.modalProps.club.credits,
      days: props.modalProps.club.days,
      room: props.modalProps.club.room,
      president: props.modalProps.club.president,
    };
  }

  render() {
    const {
      modalProps: { clubID, club, firestore },
      isOpen,
    } = this.props;

    const styles = modalStyles(480);

    return (
      <Modal
        /* TODO(@mxstbr): Fix this */
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel={'Edit club'}
        onRequestClose={this.close}
        shouldCloseOnOverlayClick={true}
        style={styles}
        closeTimeoutMS={330}
      >
        {/*
          We pass the closeModal dispatch into the container to attach
          the action to the 'close' icon in the top right corner of all modals
        */}
        <ModalContainer title={'Edit club'} closeModal={this.close}>
          <Container data-cy="login-modal">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <FieldInput
                type="text"
                placeholder="Name"
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name}
              />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <FieldArea
                placeholder="Description"
                onChange={(e) => this.setState({ description: e.target.value })}
                value={this.state.description}
              />
            </Field>

            <Field>
              <FieldLabel>Credits</FieldLabel>
              <FieldInput
                placeholder="Credits"
                onChange={(e) => this.setState({ credits: e.target.value })}
                value={this.state.credits}
              />
            </Field>

            <Field>
              <FieldLabel>President</FieldLabel>
              <FieldInput
                placeholder="Description"
                onChange={(e) => this.setState({ president: e.target.value })}
                value={this.state.president}
              />
            </Field>

            <Field>
              <FieldLabel>Days</FieldLabel>
              <FieldInput
                placeholder="Days"
                onChange={(e) => this.setState({ days: e.target.value })}
                value={this.state.days}
              />
            </Field>

            <Field>
              <FieldLabel>Room</FieldLabel>
              <FieldInput
                placeholder="Room"
                onChange={(e) => this.setState({ room: e.target.value })}
                value={this.state.room}
              />
            </Field>

            <SubmitButton onClick={this.handleSubmit}>
              <Icon size={30} glyph="checkmark" />
            </SubmitButton>
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
export default compose(firebaseConnect(), connect(map))(EditClubModal);
