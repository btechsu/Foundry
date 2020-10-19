import React from 'react';
import { useFirestore } from 'react-redux-firebase';
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

function handleEdit(firestore) {
  alert('Function coming soon.');
}

export default function ClubItem(props) {
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
          <DeleteIcon src="/img/trash.svg" />
        </DeleteButton>{' '}
        <EditButton onClick={() => handleDelete(firestore)}>
          <EditIcon src="/img/edit.svg" />
        </EditButton>{' '}
      </ControlButtons>
    </ClubItemStyle>
  );
}
