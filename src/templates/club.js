import React from 'react';
import { graphql } from 'gatsby';
import Title from '@components/Title';

// styles
import styled from 'styled-components';
import { Container } from '@styles';

import { Side, Main } from '@app/clubs/info';

const PageContainer = styled.main`
  width: 100%;
  height: 100%;
`;
const CardsContainer = styled.div`
  z-index: 1;
  margin: 4rem 0;
`;
const CardGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 3rem;
  align-items: start;

  @media only screen and (min-width: 64rem) {
    grid-column-gap: 2rem;
  }
`;

const ClubTemplate = (props) => {
  return (
    <>
      <Title>{props.data.clubs.name}</Title>
      <PageContainer>
        <CardsContainer>
          <Container normal>
            <CardGridWrapper>
              <Side data={props.data.clubs} />
              <Main />
            </CardGridWrapper>
          </Container>
        </CardsContainer>
      </PageContainer>
    </>
  );
};

export default ClubTemplate;

export const query = graphql`
  query clubQuery($clubID: String!) {
    clubs(id: { eq: $clubID }) {
      name
      description
      room
      time
      days
      type
      president
    }
  }
`;
