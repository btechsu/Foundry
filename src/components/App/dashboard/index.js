import React from 'react';
import PropTypes from 'prop-types';

// styles
import styled from 'styled-components';
import { Container, GridWrapper, media } from '@styles';

// components
import Hero from './hero';
import AnnouncementsCard from './announcements';
import PollCard from './poll';
import EmailCard from './email';
import ClubCard from './clubs';
import PasswordCard from './password';
import NewsSection from './news';
import SocialSection from './social';

const PageWrapper = styled.div`
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

const Dashboard = ({ data }) => {
  if (!data) return null;

  return (
    <PageWrapper>
      <Hero />
      <Container normal>
        <CardsContainer>
          <GridWrapper>
            <AnnouncementsCard />
            <ClubCard />
            <PollCard />
            <EmailCard />
            <PasswordCard />
            <NewsSection />
            <SocialSection data={data} />
          </GridWrapper>
        </CardsContainer>
      </Container>
    </PageWrapper>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  data: PropTypes.node.isRequired,
};
