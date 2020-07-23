import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { Container, GridWrapper, media } from '@styles';

import { FirebaseContext } from '@Firebase';
import { Circles, PageWrapper } from '@components/loader';

// components
import Hero from '../../dashboard/hero';
import Users from './users';

const DashWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const CardsContainer = styled.div`
  position: relative;
  width: 100%;
  top: -5rem;
  z-index: 1;
  ${media.phablet`top: -7rem;`};
  ${media.phone`top: -9rem;`};
`;

const AdminDashboard = () => {
  const { user } = useContext(FirebaseContext);

  if (!user) {
    return (
      <PageWrapper>
        <Circles />
      </PageWrapper>
    );
  }

  if (user && !user.isAdmin) {
    navigate(ROUTES.DASHBOARD);
    return null;
  }
  return (
    <DashWrapper>
      <Hero subtitle="Welcome to your admin dashboard." />
      <Container normal>
        <CardsContainer>
          <GridWrapper rowGap="3rem">
            <Users />
          </GridWrapper>
        </CardsContainer>
      </Container>
    </DashWrapper>
  );
};

export default AdminDashboard;
