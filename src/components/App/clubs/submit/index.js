import React, { useContext } from 'react';

// styles
import styled from 'styled-components';
import { Container } from '@styles';

import { FirebaseContext } from '@Firebase';
import Hero from '@components/hero';
import Editor from './editor';

const CustomContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 2rem 0 4rem 0;

  .codex-editor__redactor {
    padding-bottom: 40px !important;
  }
`;

const SubmitClub = () => {
  const { firebase } = useContext(FirebaseContext) || {};
  if (!firebase) return null;

  return (
    <>
      <Hero title="Submit a club" mb="0" />
      <CustomContainer>
        <Container normal>
          <Editor firebase={firebase} />
        </Container>
      </CustomContainer>
    </>
  );
};

export default SubmitClub;
