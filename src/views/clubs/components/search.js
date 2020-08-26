// @flow
import React from 'react';
import { Spinner } from '@components/globals';
import {
  SearchWrapper,
  SearchInput,
  SearchInputWrapper,
  SearchSpinnerContainer,
  SearchResultsDropdown,
  SearchResult,
  SearchResultTextContainer,
  SearchResultNull,
  SearchResultMetaWrapper,
  SearchResultName,
  SearchResultMetadata,
  SearchLink,
  SearchIcon,
} from '../style';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  connectStateResults,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH,
);

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <React.Fragment>
    {isSearchStalled && (
      <SearchSpinnerContainer>
        <Spinner size={16} color={'brand.default'} />
      </SearchSpinnerContainer>
    )}
    <SearchInputWrapper>
      <SearchIcon glyph="search" />
      <SearchInput
        type="text"
        value={currentRefinement}
        placeholder="Search for clubs or topics..."
        onChange={(event) => refine(event.currentTarget.value)}
      />
    </SearchInputWrapper>
    {isSearchStalled && (
      <SearchResult>
        <SearchResultTextContainer>
          <SearchResultNull>
            <p>Searching...</p>
          </SearchResultNull>
        </SearchResultTextContainer>
      </SearchResult>
    )}
  </React.Fragment>
);

const Hits = ({ hits }) => (
  <SearchResultsDropdown>
    {hits.map((hit, i) => (
      <SearchResult key={i}>
        <SearchLink to={`/clubs/${hit.objectID}`}>
          <SearchResultTextContainer>
            <SearchResultMetaWrapper>
              <SearchResultName>{hit.name}</SearchResultName>
              {hit.room && (
                <React.Fragment>
                  <SearchResultMetadata>{`${hit.room} • ${hit.days} @ ${hit.time}`}</SearchResultMetadata>
                </React.Fragment>
              )}
            </SearchResultMetaWrapper>
          </SearchResultTextContainer>
        </SearchLink>
      </SearchResult>
    ))}
  </SearchResultsDropdown>
);

const Results = connectStateResults(
  ({ searchState, searchResults, children }) => {
    if (!searchState.query) return null;
    if (searchResults && searchResults.nbHits !== 0) return children;
    else {
      return (
        <SearchResultsDropdown>
          <SearchResult>
            <SearchResultTextContainer>
              <SearchResultNull>
                <p>No clubs found matching “{searchState.query}”</p>
              </SearchResultNull>
            </SearchResultTextContainer>
          </SearchResult>
        </SearchResultsDropdown>
      );
    }
  },
);

const CustomSearchBox = connectSearchBox(SearchBox);
const CustomHits = connectHits(Hits);
const Search = () => {
  return (
    <SearchWrapper>
      <InstantSearch
        indexName="clubs"
        searchClient={searchClient}
        stalledSearchDelay={100}
      >
        <CustomSearchBox />
        <Results>
          <CustomHits />
        </Results>
      </InstantSearch>
    </SearchWrapper>
  );
};

export default Search;
