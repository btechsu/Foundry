import React, { useContext } from 'react';
import { FirebaseContext } from '@Firebase';
import { navigate } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { mixins, Container } from '@styles';
import { Circles, PageWrapper } from '@components/loader';

// components
import Hero from '@components/hero';
import Submit from './submit';

const CustomContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 2rem 0 4rem 0;

  .codex-editor__redactor {
    padding-bottom: 40px !important;

    a {
      ${mixins.inlineLink};
    }
  }
`;

const Club = (props) => {
  const { firebase, user } = useContext(FirebaseContext);

  if (!firebase || !user) {
    return (
      <PageWrapper>
        <Circles />
      </PageWrapper>
    );
  }

  if (firebase && user && !user.isAdmin) {
    navigate(ROUTES.DASHBOARD);
    return null;
  }

  return (
    <>
      <Hero title="Approve this club" mb="0"></Hero>
      <CustomContainer>
        <Container normal>
          <Submit firebase={firebase} user={user} clubID={props.clubID} />
        </Container>
      </CustomContainer>
    </>
  );
};

export default Club;
