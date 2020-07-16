import React from 'react';
import { ROUTES } from '@utils';

// search
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  connectSearchBox,
} from 'react-instantsearch-dom';

// styles
import styled from 'styled-components';
import { media, theme, mixins, Container } from '@styles';

// components
import ClubCard from './ClubCard';
import Hero from './hero';

const { fontSizes } = theme;

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
  align-items: flex-start;

  @media only screen and (min-width: 64rem) {
    grid-column-gap: 2rem;
  }
`;

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH
);

const SearchInput = styled.input`
  width: 100%;
  padding: 1.5rem 1rem;
  border: 2px solid var(--color-muted);
  border-radius: 1rem;
  box-shadow: 0px 5px 9px var(--shadow);
  background-color: var(--color-muted);
  color: var(--color-text);

  ::placeholder {
    color: var(--color-gray-500);
  }

  :focus {
    outline: none;
  }
`;

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search">
    <SearchInput
      type="search"
      placeholder="Search for a club"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
    />
    {/* <button onClick={() => refine('')}>Reset query</button> */}
    {isSearchStalled ? 'My search is stalled' : ''}
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

const Dash = () => {
  // MAX ALLOWABLE CHARACTERS FOR CLUB CARD is 231 https://wordcounter.net/character-count

  return (
    <PageWrapper>
      <InstantSearch indexName="instant_search" searchClient={searchClient}>
        <Hero>
          <CustomSearchBox />
        </Hero>
        <Container normal>
          <Hits />
          <CardsContainer>
            <CardGrid>
              {/* {this.props.data.map((reference, i) => {
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
            })} */}
            </CardGrid>
          </CardsContainer>
        </Container>
      </InstantSearch>
    </PageWrapper>
  );
};

export default Dash;
