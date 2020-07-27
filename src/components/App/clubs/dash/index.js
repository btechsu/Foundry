import React from 'react';

// search
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Pagination,
  connectSearchBox,
  connectHits,
  Configure,
  connectRefinementList,
} from 'react-instantsearch-dom';

// styles
import styled from 'styled-components';
import {
  Container,
  GridWrapper,
  GridCol,
  CheckBoxWrapper,
  CheckBox,
  SearchForm,
  SearchInput,
  PaginationWrapper,
  CancelButton,
  RefinmentWrapper,
} from '@styles';
import { FormattedIcon } from '@components/icons';

// components
import ClubCard from './ClubCard';
import Hero from './hero';
import Sort from './sort';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const CardsContainer = styled.div`
  z-index: 1;
  margin: 3rem 0;
`;

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH
);

const SearchBox = ({ currentRefinement, refine }) => (
  <SearchForm
    noValidate
    action=""
    role="search"
    onSubmit={(e) => {
      e.preventDefault();
    }}
  >
    <FormattedIcon name="search" />
    <SearchInput
      type="search"
      placeholder="Search here…"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      required=""
      maxlength="512"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
    />
    <CancelButton
      type="reset"
      onClick={() => refine('')}
      hide={currentRefinement === '' ? true : false}
    >
      <FormattedIcon name="cancel" />
    </CancelButton>
  </SearchForm>
);
const Hits = ({ hits }) => {
  return (
    <>
      {hits.map((hit, i) => (
        <ClubCard
          key={i}
          to={`/app/club/${hit.objectID}`}
          title={hit.name}
          text={hit.description}
          room={hit.room}
          time={`${hit.days} @ ${hit.time}`}
          type={hit.type}
        />
      ))}
    </>
  );
};
const RefinementList = ({ items, refine, createURL }) => (
  <RefinmentWrapper>
    <ul>
      {items.map((item) => (
        <li>
          <CheckBoxWrapper
            key={item.label}
            onClick={(event) => {
              event.preventDefault();
              refine(item.value);
            }}
          >
            <input type="checkbox" checked={item.isRefined} />
            <CheckBox />
            {item.label} ({item.count})
          </CheckBoxWrapper>
        </li>
      ))}
    </ul>
  </RefinmentWrapper>
);

const CustomSearchBox = connectSearchBox(SearchBox);
const CustomHits = connectHits(Hits);
const CustomRefinements = connectRefinementList(RefinementList);

const Dash = () => {
  return (
    <PageWrapper>
      <Container normal>
        <InstantSearch
          indexName="clubs"
          searchClient={searchClient}
          stalledSearchDelay={100}
        >
          <Configure hitsPerPage={8} />
          <Hero>
            <CustomSearchBox />
          </Hero>
          <CardsContainer>
            <GridWrapper col={11} align="flex-start">
              <Sort>
                <CustomRefinements attribute="type" />
              </Sort>
              <GridCol spans={8}>
                <GridWrapper col={8} colGap="0.5rem" rowGap="2rem">
                  <CustomHits />
                </GridWrapper>
              </GridCol>
            </GridWrapper>
            <PaginationWrapper>
              <Pagination />
            </PaginationWrapper>
          </CardsContainer>
        </InstantSearch>
      </Container>
    </PageWrapper>
  );
};

export default Dash;
