import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

// styles
import styled from 'styled-components';
import { mixins, ClickableButton } from '@styles';
import { FormattedIcon } from '@components/icons';
import NProgress from 'nprogress';
import Modal from '@components/Modal';

import { FirebaseContext } from '@Firebase';

const SortTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;

  td,
  th {
    padding: 0.8rem;
  }
`;
const DefColText = styled.th`
  padding: 12px 0;
  text-align: left;
  background-color: var(--color-muted);
  color: var(--color-text);
`;
const Row = styled.tr`
  width: 100%;
  border-bottom: 3px solid var(--color-muted-background);
`;
const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    color: var(--color-text);
    width: 1.2rem;
    height: 1.2rem;
  }
`;
const IconButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding-right: 1rem;

  :hover {
    svg {
      opacity: 0.5;
      transition: opacity 0.2s ease;
    }
  }

  :focus {
    outline: none;
  }
`;
const BodyText = styled.p`
  ${mixins.normalText};
  margin-top: 1rem;
`;
const ModalButton = styled(ClickableButton)`
  ${mixins.primaryButton};
  ${mixins.bigButton};
  width: 100%;
  margin-bottom: 1rem;
`;
const ErrorMessage = styled.p`
  color: var(--color-error);
`;

export const Wrapper = ({ children }) => {
  return (
    <SortTable>
      <Row>
        <DefColText>Actions</DefColText>
        <DefColText>UID</DefColText>
        <DefColText>Email</DefColText>
        <DefColText>Joined</DefColText>
        <DefColText>Year</DefColText>
      </Row>
      {children}
    </SortTable>
  );
};
export const User = ({ uid, email, joined, year }) => {
  const { firebase } = useContext(FirebaseContext);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  return (
    <>
      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        header="Are you sure you want to delete this user?"
      >
        <BodyText>
          Deleting this user will also remove all their personal data like clubs
          they're in, polls voted on, etc. This action cannot be undone. Are you
          sure you want to proceed?
        </BodyText>
        {error ? (
          <>
            <ErrorMessage>{error}</ErrorMessage>
          </>
        ) : null}
        <ModalButton
          onClick={() => {
            NProgress.start();
            firebase
              .deleteAccount({ uid: uid })
              .then((suc) => {
                setDeleteModal(false);
                NProgress.done(true);
              })
              .catch((err) => {
                NProgress.done(true);
                setError(err.message || 'An unknown error has occurred.');
              });
          }}
        >
          Delete {email}
        </ModalButton>
      </Modal>
      <Modal
        open={passwordReset}
        onClose={() => setPasswordReset(false)}
        header="Send this user a password reset."
      >
        <BodyText>
          When you click the button below, the user <b>{email}</b> will be sent
          a password reset link sent to their inbox. They will have 2 hours to
          reset their password before the link expires.
        </BodyText>
        {error ? (
          <>
            <ErrorMessage>{error}</ErrorMessage>
          </>
        ) : null}
        <ModalButton
          onClick={() => {
            NProgress.start();
            firebase
              .doSendPasswordResetEmail({ email: email })
              .then((suc) => {
                setPasswordReset(false);
                NProgress.done(true);
              })
              .catch((err) => {
                NProgress.done(true);
                setError(err.message || 'An unknown error has occurred.');
              });
          }}
        >
          Send password reset
        </ModalButton>
      </Modal>
      <Row>
        <td>
          <IconsWrapper>
            <IconButton
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              <FormattedIcon name="delete" />
            </IconButton>
            <IconButton
              onClick={() => {
                setPasswordReset(true);
              }}
              s
            >
              <FormattedIcon name="mail" />
            </IconButton>
          </IconsWrapper>
        </td>
        <td>{uid}</td>
        <td>{email}</td>
        <td>{joined}</td>
        <td>{year}</td>
      </Row>
    </>
  );
};

User.propTypes = {
  uid: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};
