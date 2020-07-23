import React from 'react';

// search
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Pagination,
  connectSearchBox,
  connectHits,
  Configure,
} from 'react-instantsearch-dom';

// styles
import styled from 'styled-components';
import {
  SearchForm,
  SearchInput,
  PaginationWrapper,
  CancelButton,
} from '@styles';
import { FormattedIcon } from '@components/icons';

import { User, Wrapper } from './user';
import CardWrapper from './card';

const SearchWrapper = styled.div`
  grid-area: search;
`;
const BodyWrapper = styled.div`
  grid-area: body;
  overflow-x: auto;
`;

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH
);

const SearchBox = ({ currentRefinement, refine }) => (
  <SearchForm
    small
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
      {hits.map((hit, i) => {
        const dateJoined = new Date(hit.joined);
        return (
          <User
            key={i}
            uid={hit.objectID}
            email={hit.email}
            joined={dateJoined.toLocaleString()}
            year={hit.year}
          />
        );
      })}
    </>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);
const CustomHits = connectHits(Hits);

const Users = () => {
  return (
    <InstantSearch
      indexName="users"
      searchClient={searchClient}
      stalledSearchDelay={100}
    >
      <Configure hitsPerPage={5} />
      <CardWrapper>
        <SearchWrapper>
          <CustomSearchBox />
        </SearchWrapper>
        <BodyWrapper>
          <Wrapper>
            <CustomHits />
          </Wrapper>
          <PaginationWrapper mt="0">
            <Pagination />
          </PaginationWrapper>
        </BodyWrapper>
      </CardWrapper>
    </InstantSearch>
  );
};

export default Users;
