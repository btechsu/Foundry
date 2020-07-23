import React, { Component } from 'react';

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
  display: grid;
  grid-area: search;
  grid-template-columns: 1fr auto;
  align-items: center;
`;
const RefreshIcon = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  :focus {
    outline: none;
  }

  svg {
    color: var(--color-text);
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 1rem;
  }
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

class Users extends Component {
  state = {
    refresh: false,
  };

  refresh = () => {
    this.setState({ refresh: true }, () => {
      this.setState({ refresh: false });
    });
  };

  render() {
    return (
      <InstantSearch
        indexName="users"
        searchClient={searchClient}
        stalledSearchDelay={100}
        refresh={this.state.refresh}
      >
        <Configure hitsPerPage={5} />
        <CardWrapper>
          <SearchWrapper>
            <CustomSearchBox />
            <RefreshIcon onClick={this.refresh}>
              <FormattedIcon name="sync" />
            </RefreshIcon>
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
  }
}

export default Users;
