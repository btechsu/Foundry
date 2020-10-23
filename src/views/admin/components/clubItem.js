import React from 'react';
import { useFirestore } from 'react-redux-firebase';
import { openModal } from 'src/actions/modals';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {
  ClubItemStyle,
  Name,
  Description,
  DeleteButton,
  EditButton,
  ControlButtons,
  DeleteIcon,
  EditIcon,
} from '../style';
import Icon from 'src/components/icon';

function handleDelete(firestore, id, refresh) {
  firestore
    .collection('clubs')
    .doc(id)
    .get()
    .then((doc) => {
      doc.ref.delete();
    });
  alert('Deleted.');
  refresh();
}

function ClubItem(props) {
  let firestore = useFirestore();

  return (
    <ClubItemStyle>
      <Name>{props.data.name || 'No name'}</Name> —{' '}
      <Description>
        {(props.data.description || 'No description').substring(0, 100) + '...'}
      </Description>
      <ControlButtons>
        <DeleteButton
          onClick={() => handleDelete(firestore, props.id, props.refresh)}
        >
          <Icon size={25} glyph="delete" />
        </DeleteButton>{' '}
        <EditButton
          onClick={() =>
            props.dispatch(
              openModal('EDIT_CLUB_MODAL', {
                clubID: props.id,
                club: props.data,
                firestore: firestore,
              }),
            )
          }
        >
          <Icon size={25} glyph="edit" />
        </EditButton>{' '}
      </ControlButtons>
    </ClubItemStyle>
  );
}

export default compose(connect())(ClubItem);
