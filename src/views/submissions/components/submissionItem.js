import React from 'react';
import { useFirestore } from 'react-redux-firebase';
import { openModal } from 'src/actions/modals';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {
  SubmissionItemStyle,
  Name,
  Description,
  RejectButton,
  AcceptButton,
  ControlButtons,
} from '../style';
import Icon from 'src/components/icon';

function handleReject(firestore, id, refresh) {
  firestore
    .collection('clubSubmissions')
    .doc(id)
    .get()
    .then((doc) => {
      doc.ref.delete();
    });
  alert('Rejected and deleted.');
  refresh();
}

function handleReject(firestore, id, refresh) {
  // firestore
  //   .collection('clubSubmissions')
  //   .doc(id)
  //   .get()
  //   .then((doc) => {
  //     doc.ref.delete();
  //   });
  alert('Function under construction.');
  refresh();
}

function SubmissionItem(props) {
  let firestore = useFirestore();

  return (
    <SubmissionItemStyle>
      <Name>{props.data.name || 'No name'}</Name> —{' '}
      <Description>
        {(props.data.description || 'No description').substring(0, 100) + '...'}
      </Description>
      <ControlButtons>
        <RejectButton
          onClick={() => handleReject(firestore, props.id, props.refresh)}
        >
          <Icon size={25} glyph="view-close" />
        </RejectButton>{' '}
        <AcceptButton
          onClick={() => {
            handleAccept(firestore, props.id, props.refresh);
          }}
        >
          <Icon size={25} glyph="checkmark" />
        </AcceptButton>{' '}
      </ControlButtons>
    </SubmissionItemStyle>
  );
}

export default compose(connect())(SubmissionItem);
