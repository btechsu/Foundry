import React, { Component } from 'react';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { media, Container } from '@styles';

import ClubCard from './ClubCard';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const CardsContainer = styled.div`
  z-index: 1;
  margin: 4rem 0;
`;
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 3rem;

  @media only screen and (min-width: 64rem) {
    grid-column-gap: 2rem;
  }
`;

class Dash extends Component {
  render() {
    // MAX ALLOWABLE CHARACTERS FOR CLUB CARD is 231 https://wordcounter.net/character-count

    return (
      <PageWrapper>
        <Container normal>
          <CardsContainer>
            <CardGrid>
              {this.props.data.map((reference, i) => {
                const card = reference.node;
                return (
                  <ClubCard
                    key={i}
                    to={`/club/${card.id}`}
                    title={card.name}
                    text={card.description}
                    room={card.room}
                    time={`${card.days} @ ${card.time}`}
                    type={card.type}
                  />
                );
              })}
            </CardGrid>
          </CardsContainer>
        </Container>
      </PageWrapper>
    );
  }
}

export default Dash;
